import { SharedContext } from '../sharedContext';

abstract class Agent {
  name: string;
  role: string;
  aiClient: any;
  sharedContext: SharedContext;

  constructor(name: string, role: string, aiClient: any, sharedContext: SharedContext) {
    this.name = name;
    this.role = role;
    this.aiClient = aiClient;
    this.sharedContext = new SharedContext();
  }

  abstract executeTask(inputData: any): Promise<any>;
}

class EditorAgent extends Agent {
  async executeTask(inputData: any): Promise<any> {
    const generatedContent = inputData.generatedContent || "";
    const editedContent = await this.editContent(generatedContent);
    const factCheckedContent = await this.factCheck(editedContent);
    return { finalContent: factCheckedContent };
  }

  async editContent(content: string): Promise<any> {
    // Use this.aiClient to edit content
    return content;
  }

  async factCheck(content: string): Promise<any> {
    // Use this.aiClient to fact check content
    return content;
  }
}

export { EditorAgent, Agent };