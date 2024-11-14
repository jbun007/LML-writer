import { Agent } from '../agents/agents';
import OpenAI from 'openai';
import ContentPlannerAgent from '../agents/plannerAgent';
import ContentCreatorAgent from '../agents/contentcreatorAgent';
import { SharedContext } from '../sharedContext';
import { searchDatabase } from '../embeddings/vectorSearch'; // Import the searchDatabase function

// Import the pipeline function from transformers.js
import { pipeline, cos_sim } from '@xenova/transformers';

// Extend the NodeJS Global interface to include our embedding pipeline promise
declare global {
  // eslint-disable-next-line no-var
  var embeddingPipelinePromise: Promise<any> | undefined;
}

interface GoogleSearchCredentials {
  apiKey: string;
  cseId: string;
}

interface AIClient extends OpenAI {}

// Function to get the embedding pipeline, initializing it if necessary
const getEmbeddingPipeline = (): Promise<any> => {
  if (!global.embeddingPipelinePromise) {
    // Initialize the pipeline and store the promise globally
    global.embeddingPipelinePromise = pipeline(
      'feature-extraction',
      'mixedbread-ai/mxbai-embed-large-v1'
    )
      .then((pipe) => {
        console.log('Embedding pipeline initialized.');
        return pipe;
      })
      .catch((error) => {
        console.error('Error initializing embedding pipeline:', error);
        throw error;
      });
  }
  return global.embeddingPipelinePromise;
};

export default class ArticleCreator {
  aiClient: AIClient;
  googleSearchCredentials: GoogleSearchCredentials;
  agents: Agent[];
  private sharedContext: SharedContext;
  private embeddingPipeline: any; // Add a property to hold the pipeline

  constructor() {
    this.aiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.googleSearchCredentials = {
      apiKey: process.env.GOOGLE_API_KEY || '',
      cseId: process.env.GOOGLE_CSE_ID || '',
    };
    this.sharedContext = new SharedContext();
    this.agents = [
      new ContentPlannerAgent(
        'Planner',
        'content_planning',
        this.aiClient,
        this.sharedContext
      ),
      new ContentCreatorAgent(
        'Generator',
        'content_generation',
        this.aiClient,
        this.sharedContext
      ),
    ];

    // Initialize the embedding pipeline by getting the singleton instance
    this.embeddingPipeline = getEmbeddingPipeline();
  }

  async execute(intent: string, mainIdea: string, keywords: string, length: string): Promise<any> {
    try {
      // Wait for the embedding pipeline to be ready
      const embeddingPipeline = await this.embeddingPipeline;

      // Vectorize the user input
      const userInput = `${intent} ${mainIdea} ${keywords}`;
      console.log('User Input:', userInput);

      const vectorResult = await embeddingPipeline(userInput, { pooling: 'cls', normalize: true});

      // const vectorResult2 = await embeddingPipeline("ashwaghanda for pain reduction", { pooling: 'cls', normalize: true})

      // console.log("Vector 1: ", vectorResult )
      // console.log("Vector 2: ", vectorResult2)

      // const similarity = cos_sim(vectorResult.data, vectorResult2.data)
      // console.log("Similarity score: ", similarity)

      // The pipeline may return embeddings in different formats; adjust accordingly
      console.log('Vectorized User Input:', vectorResult.data);
      console.log('Length: ', vectorResult.data.length)

      

      // Use the searchDatabase function to retrieve relevant text chunks
      const retrievedData = await searchDatabase(vectorResult.data, .5, 8);
      console.log('Retrieved Data:', retrievedData);

      let data: { [key: string]: any } = {
        intent,
        mainIdea,
        length,
        keywords,
        retrievedData, 
      };

      // console.log('Intent:', intent);
      // console.log('Main Idea:', mainIdea);

      for (const agent of this.agents) {
        try {
          const result = await agent.executeTask(data);
          data = { ...data, ...result };
        } catch (e: any) {
          console.error(`Error in ${agent.name}: ${e.message}`);
          // Handle error appropriately
        }
      }

      return {
        contentPlan: data.contentPlan,
        articleTitle: data.articleTitle,
        articleContent: data.articleContent,
        articleDescription: data.articleDescription,
        sharedContext: data.sharedContext,
      };
    } catch (error) {
      console.error('Error during execute:', error);
      return;
    }
  }
}
