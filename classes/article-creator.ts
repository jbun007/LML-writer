import { ResearchAgent, ContentPlannerAgent, SEOOptimizerAgent, ContentGeneratorAgent, EditorAgent, Agent } from './agents';
import OpenAI from 'openai';

interface GoogleSearchCredentials {
  apiKey: string;
  cseId: string;
}

interface AIClient extends OpenAI {}

class ArticleCreator {
  aiClient: AIClient;
  googleSearchCredentials: GoogleSearchCredentials;
  agents: Agent[];

  constructor() {
    this.aiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.googleSearchCredentials = {
      apiKey: process.env.GOOGLE_API_KEY || '',
      cseId: process.env.GOOGLE_CSE_ID || '',
    };
    this.agents = [
      new ResearchAgent("Researcher", "research", this.aiClient, this.googleSearchCredentials),
      // new ContentPlannerAgent("Planner", "content_planning", this.aiClient),
      // new SEOOptimizerAgent("SEO", "seo_optimization", this.aiClient),
      // new ContentGeneratorAgent("Generator", "content_generation", this.aiClient),
      // new EditorAgent("Editor", "editing", this.aiClient)
    ];
  }

  async execute(contentType: string, searchQuery: string): Promise<string | undefined> {
    let data: { [key: string]: any } = { contentType, searchQuery };

    for (const agent of this.agents) {
      try {
        const result = await agent.executeTask(data);
        data = { ...data, ...result };
      } catch (e: any) {
        console.error(`Error in ${agent.name}: ${e.message}`);
        // Handle error appropriately
      }
    }

    return data.researchResults;
  }
}

export default ArticleCreator;