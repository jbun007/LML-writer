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
        4. Avoid unnecessarily complex words or technical jargon.
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

        Please generate the full article based on these guidelines.
        
        Output Requirements:
        1. Article Title:
        - Create a compelling, SEO-friendly title.
        - Use plain text, no markdown.
        - Aim for under 60 characters.

        2. Article Description:
        - Write a concise summary for SEO meta description.
        - Use plain text, no markdown.
        - Aim for 150-160 characters.
        - Include primary keywords and capture the essence of the article.

       3. Article Content:
        - Use markdown format.
        - Maintain a clear structure with headings, subheadings, and paragraphs.
        - Include relevant examples, data, or quotes to support key points.
        - Aim for comprehensive coverage of the topic.
        - Ensure readability and engagement throughout.

      Response Format:
      {
        "articleTitle": "Your generated title here",
        "articleDescription": "Your generated description here",
        "articleContent": "Your full article content in markdown here"
      }

      Note: Provide only the JSON response as specified in the response format, without any additional explanation or commentary.`;

      const response = await this.aiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
          { role: "user", content: prompt }
        ],
        response_format: zodResponseFormat(responseFormat, "generatedContent")
      }); 

      try {
        const parsedResponse = JSON.parse(response.choices[0].message.content);
        
        //Update the sharedContext to pass to regeneratorAgent
        this.sharedContext.addMessage('user', prompt);
        this.sharedContext.addMessage('assistant', response.choices[0].message.content);
  
  
        return {
          articleDescription: parsedResponse.articleDescription, 
          articleTitle: parsedResponse.articleTitle, 
          articleContent: parsedResponse.articleContent,
          sharedContext: this.sharedContext 
      };
      } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("Failed to parse the AI response");
      }
      } 
  }


  const responseFormat = z.object({
    articleTitle: z.string(),
    articleDescription: z.string(),
    articleContent: z.string()
});