import { Agent } from '../agents/agents';
import OpenAI from 'openai';
import keywordAgent from '../agents/keywordAgent';
import { SharedContext } from '../sharedContext';
interface GoogleSearchCredentials {
  apiKey: string;
  cseId: string;
}

interface AIClient extends OpenAI {}

export default class KeywordGenerator {
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
       new keywordAgent("keyword", "keyword_generation", this.aiClient, this.googleSearchCredentials, this.sharedContext),
    ];
  }

  async execute(intent: string, mainIdea: string): Promise<any | undefined> {
    let data: { [key: string]: any } = { intent, mainIdea };

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
      keywordResults: data.keywordResults
    };
  }
}

