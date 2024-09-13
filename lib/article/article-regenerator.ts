import { EditorAgent, Agent } from '../agents/agents';
import RegenerateAgent from '../agents/regenerateAgent';
import OpenAI from 'openai';
import { SharedContext } from '../sharedContext';
export default class ArticleRegenerator {
  aiClient: OpenAI;
  agents: Agent[];
  sharedContext: SharedContext;

  constructor(sharedContext: SharedContext) {
    this.aiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.sharedContext = sharedContext;
    this.agents = [
      new RegenerateAgent("Regenerator", "content_regeneration", this.aiClient, this.sharedContext),
    ];
  }

  async execute(previousOutput: any, additionalCommentary: string): Promise<any> {
    console.log("shared context in article regenerator: ", this.sharedContext);
    let data: { [key: string]: any }  = { previousOutput, additionalCommentary };

    for (const agent of this.agents) {
      try {
        const result = await agent.executeTask(data);
        data = { ...data, ...result };
        //console.log("data --- article-regenerator ", data);
      } catch (e: any) {
        console.error(`Error in ${agent.name}: ${e.message}`);
      }
    }

    return {
       articleContent: data.articleContent,
       articleTitle: data.articleTitle,
       articleDescription: data.articleDescription,
       sharedContext: data.sharedContext
    };
  }
}