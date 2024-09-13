import { Agent } from "./agents";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { SharedContext } from "../sharedContext";

export default class ContentCreatorAgent extends Agent {
    constructor(name: string, role: string, aiClient: any, sharedContext: SharedContext) {
      super(name, role, aiClient, sharedContext);
    }

    async executeTask(inputData: any): Promise<any> {
      const contentPlan = inputData.contentPlan || {};
      const articleTitle = inputData.articleTitle || {};
      const keywords = inputData.keywords || {};

      //seo optimized output
      const generatedContent = await this.generateContent(contentPlan, articleTitle, keywords);
      return { articleContent: generatedContent.articleContent, sharedContext: generatedContent.sharedContext };
    }
  
    async generateContent(contentPlan: any, articleTitle: any, keywords: any): Promise<any> {
      // Use this.aiClient to generate content
      const prompt = `Create a detailed and engaging article based on the following content plan:
      
        ${contentPlan}

        Title: "${articleTitle}"

        Instructions:
        1. Follow the structure and key points outlined in the content plan.
        2. Use a conversational yet professional tone throughout the article. Assume the reader is well educated; however, do not use unneccesarily complex words or technical jargon. Avoid a robotic tone. 
        3. Include relevant examples, statistics, or case studies to support main points.
        4. Ensure smooth transitions between sections for a cohesive reading experience.
        5. Use varied sentence structures and paragraph lengths for better readability.
        6. Do not use hackneyed statements like "In conclusion" or "In summary" or "This article will..." or "Did you know..."
        7. Do not include statements suggesting to consult with a healthcare provider. 
        8. Do not explicitly ask the readers to share the article.
        9. Do not make up fake stories or testimonials. 
        10. Prioritize accuracy and specificity. General statements like "many studies have shown that..." are not allowed. Cite your sources.
        11. Incorporate the following keywords: ${keywords} into the article.

        Please generate the full article based on these guidelines.`;

      this.sharedContext.addMessage('user', prompt);

      const response = await this.aiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
          { role: "user", content: prompt }
        ],
      }); 

      this.sharedContext.addMessage('assistant', response.choices[0].message.content);

      //console.log(response.choices[0].message.content);
      return {articleContent: response.choices[0].message.content, sharedContext: this.sharedContext};
    }
  }
