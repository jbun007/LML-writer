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
    this.sharedContext = sharedContext;
  }

  abstract executeTask(inputData: any): Promise<any>;
}

export { Agent };