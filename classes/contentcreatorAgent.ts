import { Agent } from "./agents";

class ContentCreatorAgent extends Agent {
    async executeTask(inputData: any): Promise<any> {
      const contentPlan = inputData.contentPlan || {};
      const articleTitle = inputData.articleTitle || {};

    //seo optimized output

      const generatedContent = await this.generateContent(contentPlan, articleTitle);
      return { articleContent: generatedContent };
    }
  
    async generateContent(contentPlan: any, articleTitle: any): Promise<any> {
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
        6. Do not use statements like "In conclusion" or "In summary" or "This article will..." or "Did you know..."
        7. Do not include statements suggesting to consult with a healthcare provider. 
        8. Do not explicitly ask the readers to share the article.

        Please generate the full article based on these guidelines.`;

      const response = await this.aiClient.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
          { role: "user", content: prompt }
        ],
      }); 

      console.log(response.choices[0].message.content);
      return response.choices[0].message.content;
    }
}
  export default ContentCreatorAgent;
