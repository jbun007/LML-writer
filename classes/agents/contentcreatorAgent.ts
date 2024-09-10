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

      // Previous Content Plan:
      // ${previousOutput.contentPlan}

      const prompt = `Regenerate the following article based on the additional commentary:
    
    Previous Article Title:
    ${previousOutput.articleTitle}
    
    Previous Article Content:
    ${previousOutput.articleContent}
    
    Additional Commentary:
    ${additionalCommentary}
    
    Please regenerate the article, incorporating the feedback and additional instructions provided. Return the updated content plan, article title, and article content according to the response format. The values should be in markdown.`;
    
      const response = await this.aiClient.chat.completions.create({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: "You are a helpful assistant that regenerates content based on feedback." },
          { role: "user", content: prompt }
        ],
        response_format: zodResponseFormat(responseFormat, "regeneratedContent")
      });
    
      // // Assuming the AI returns a structured response with contentPlan, articleTitle, and articleContent
      // const regeneratedContent = JSON.parse(response.choices[0].message.content);
      // return {
      //   contentPlan: regeneratedContent.contentPlan,
      //   articleTitle: regeneratedContent.articleTitle,
      //   articleContent: regeneratedContent.articleContent
      // };
      
      try {
        const parsedResponse = JSON.parse(response.choices[0].message.content);

        //console.log("CHECKING RESPONSE FORMAT - parsedResponse ", parsedResponse);


        return {contentPlan: parsedResponse.contentPlan, articleTitle: parsedResponse.articleTitle, articleContent: parsedResponse.articleContent};
      } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("Failed to parse the AI response");
      }
    }
}

const responseFormat = z.object({
  //contentPlan: z.string(),
  articleTitle: z.string(),
  articleContent: z.string()
});

export default ContentCreatorAgent;
