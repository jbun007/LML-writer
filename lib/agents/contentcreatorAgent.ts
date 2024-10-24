import { Agent } from "./agents";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { SharedContext } from "../sharedContext";

export default class ContentCreatorAgent extends Agent {
    constructor(name: string, role: string, aiClient: any, sharedContext: SharedContext) {
      super(name, role, aiClient, sharedContext);
    }

    async executeTask(inputData: any): Promise<any> {
      const { contentPlan, articleTitle, keywords, retrievedData } = inputData;

      const generatedContent = await this.generateContent(contentPlan, articleTitle, keywords, retrievedData);
      return {
        articleContent: generatedContent.articleContent,
        sharedContext: generatedContent.sharedContext,
      };
    }

    async generateContent(
      contentPlan: any,
      articleTitle: any,
      keywords: any,
      retrievedData: string[]
    ): Promise<any> {
      const combinedRetrievedData = retrievedData.join('\n\n');

      const prompt = `Create a detailed and engaging article based on the following content plan:
      
        ${contentPlan}

        Title: "${articleTitle}"

        Additional Context:
        ${combinedRetrievedData}

        Instructions:
        1. Incorporate the additional context provided to enrich the article with research-backed data.
        2. Follow the structure and key points outlined in the content plan.
        3. Use a conversational yet professional tone throughout the article.
        4. Assume the reader is well-educated; however, avoid unnecessarily complex words or technical jargon.
        5. Avoid a robotic tone.
        6. Include relevant examples, statistics, or case studies to support main points.
        7. Ensure smooth transitions between sections for a cohesive reading experience.
        8. Use varied sentence structures and paragraph lengths for better readability.
        9. Do not use hackneyed statements like "In conclusion" or "This article will...".
        10. Do not include statements suggesting to consult with a healthcare provider.
        11. Do not explicitly ask the readers to share the article.
        12. Do not make up fake stories or testimonials.
        13. Prioritize accuracy and specificity.
        14. General statements like "many studies have shown that..." are not allowed.
        15. Cite your sources.
        16. Incorporate the following keywords: ${keywords} into the article.

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

        return {
          articleContent: response.choices[0].message.content,
          sharedContext: this.sharedContext,
        };
      } catch (error: any) {
        console.error('Error in ContentCreatorAgent:', error);
        throw error;
      }
  }
