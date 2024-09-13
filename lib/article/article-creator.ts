import { EditorAgent, Agent } from '../agents/agents';
import OpenAI from 'openai';
//import ResearchAgent from './researchAgent';
import ContentPlannerAgent from '../agents/plannerAgent';
import ContentCreatorAgent from '../agents/contentcreatorAgent';
import { SharedContext } from '../sharedContext';

interface GoogleSearchCredentials {
  apiKey: string;
  cseId: string;
}

interface AIClient extends OpenAI {}

export default class ArticleCreator {
  aiClient: AIClient;
  googleSearchCredentials: GoogleSearchCredentials;
  agents: Agent[];
  private sharedContext: SharedContext;

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
      //new ResearchAgent("Researcher", "research", this.aiClient, this.googleSearchCredentials),
      new ContentPlannerAgent("Planner", "content_planning", this.aiClient, this.sharedContext),
      new ContentCreatorAgent("Generator", "content_generation", this.aiClient, this.sharedContext),
      // new EditorAgent("Editor", "editing", this.aiClient)
    ];
  }

  async execute(intent: string, mainIdea: string, keywords: string): Promise<any | undefined> {
    let data: { [key: string]: any } = { intent, mainIdea, keywords};
    console.log("Intent: \n", intent)
    console.log("Main Idea: \n", mainIdea)

    for (const agent of this.agents) {
      try {
        const result = await agent.executeTask(data);
        data = { ...data, ...result };
      } catch (e: any) {
        console.error(`Error in ${agent.name}: ${e.message}`);
        // Handle error appropriately
      }
    }

    //return just "content instead?

    return {
      contentPlan: data.contentPlan,
      articleTitle: data.articleTitle,
      articleContent: data.articleContent,
      articleDescription: data.articleDescription,
      sharedContext: data.sharedContext
    };
  }
}
