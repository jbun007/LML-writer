import { Agent } from "./agents";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { SharedContext } from "../sharedContext";



export default class RegenerateAgent extends Agent {
    constructor(name: string, role: string, aiClient: any, sharedContext: SharedContext) {
        super(name, role, aiClient, sharedContext);
      }

    async executeTask(inputData: any): Promise<any> {
        return(await this.regenerateContent(inputData.previousOutput, inputData.additionalCommentary));
    }
  
async regenerateContent(previousOutput: any, additionalCommentary: string): Promise<any> {

    const prompt = `Task: Regenerate an article based on previous content and new feedback.

      Input:
      1. Previous Article Title: "${previousOutput.articleTitle}"
      2. Additional Commentary: "${additionalCommentary}"

      Instructions:
      1. Carefully review the previous article content and the additional commentary.
      2. Incorporate the feedback and new instructions into the regenerated article.
      3. Maintain the original topic and core message while improving based on the feedback.
      4. Ensure the content is engaging, well-structured, and flows logically.

      Output Requirements:
      1. Article Title:
        - Create a compelling, SEO-friendly title.
        - Use plain text, no markdown.
        - Aim for 50-60 characters.

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

      Note: Provide only the JSON response as specified above, without any additional explanation or commentary.`;

      console.log("AAAAAshared context: \n", this.sharedContext);

    const messages = [
    { role: "system", content: "You are a helpful assistant that regenerates content based on feedback." },
    { role: "user", content: prompt },
    ];

    // Check if sharedContext.messages exists and is an array before spreading
    if (Array.isArray(this.sharedContext.messages)) {
        messages.push(...this.sharedContext.messages);
    }
  
    let sharedContext: SharedContext = new SharedContext();
    const response = await this.aiClient.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: messages,
      response_format: zodResponseFormat(responseFormat, "regeneratedContent")
    });
    
    try {
      const parsedResponse = JSON.parse(response.choices[0].message.content);
      
      sharedContext.addMessage('assistant', response.choices[0].message.content);

      //console.log("CHECKING RESPONSE FORMAT - parsedResponse ", parsedResponse);

      return {
        articleDescription: parsedResponse.articleDescription, 
        articleTitle: parsedResponse.articleTitle, 
        articleContent: parsedResponse.articleContent,
        sharedContext: sharedContext
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