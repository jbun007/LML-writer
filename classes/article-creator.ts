import { ResearchAgent, ContentPlannerAgent, SEOOptimizerAgent, ContentGeneratorAgent, EditorAgent, Agent } from './agents';

interface GoogleSearchCredentials {
  apiKey: string;
  cseId: string;
}

interface AIClient {
  chat: {
    completions: {
      create: (params: any) => Promise<any>;
    };
  };
}

class ArticleCreator {
  aiClient: AIClient;
  googleSearchClient: GoogleSearchCredentials;
  agents: Agent[];

  constructor(aiClient: AIClient, googleSearchCredentials: GoogleSearchCredentials) {
    this.aiClient = aiClient;
    this.googleSearchClient = googleSearchCredentials;
    this.agents = [
      new ResearchAgent("Researcher", "research", aiClient, googleSearchCredentials),
      new ContentPlannerAgent("Planner", "content_planning", aiClient),
      new SEOOptimizerAgent("SEO", "seo_optimization", aiClient),
      new ContentGeneratorAgent("Generator", "content_generation", aiClient),
      new EditorAgent("Editor", "editing", aiClient)
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

    return data.finalContent;
  }
}

export default ArticleCreator;