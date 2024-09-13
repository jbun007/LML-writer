type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export class SharedContext {
  messages: Message[] = [];

  addMessage(role: 'system' | 'user' | 'assistant', content: string) {
    this.messages.push({ role, content });
  }

  getMessages(): Message[] {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}