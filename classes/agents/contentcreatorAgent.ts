import { Agent } from "./agents";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

class ContentCreatorAgent extends Agent {
    async executeTask(inputData: any): Promise<any> {
      if (inputData.previousOutput && inputData.additionalCommentary) {
        return(await this.regenerateContent(inputData.previousOutput, inputData.additionalCommentary));
        //return {regeneratedContent};
      } else {
        // Existing logic for initial content generation
        const contentPlan = inputData.contentPlan || {};
        const articleTitle = inputData.articleTitle || {};
        const keywords = inputData.keywords || {};
        //seo optimized output
        const generatedContent = await this.generateContent(contentPlan, articleTitle, keywords);
        return { articleContent: generatedContent };
      }
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

      const response = await this.aiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
          { role: "user", content: prompt }
        ],
      }); 

      //console.log(response.choices[0].message.content);
      return response.choices[0].message.content;
    }

    async regenerateContent(previousOutput: any, additionalCommentary: string): Promise<any> {

      const prompt = `Task: Regenerate an article based on previous content and new feedback.

        Input:
        1. Previous Article Title: "${previousOutput.articleTitle}"
        3. Previous Article Content: "${previousOutput.articleContent}"
        4. Additional Commentary: "${additionalCommentary}"

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
    
      const response = await this.aiClient.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: "You are a helpful assistant that regenerates content based on feedback." },
          { role: "user", content: prompt }
        ],
        response_format: zodResponseFormat(responseFormat, "regeneratedContent")
      });
      
      try {
        const parsedResponse = JSON.parse(response.choices[0].message.content);

        //console.log("CHECKING RESPONSE FORMAT - parsedResponse ", parsedResponse);

        return {articleDescription: parsedResponse.articleDescription, articleTitle: parsedResponse.articleTitle, articleContent: parsedResponse.articleContent};
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

export default ContentCreatorAgent;
