import { Agent } from "./agents";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { SharedContext } from "../sharedContext";

export default class ContentCreatorAgent extends Agent {
    constructor(name: string, role: string, aiClient: any, sharedContext: SharedContext) {
      super(name, role, aiClient, sharedContext);
    }

    async executeTask(inputData: any): Promise<any> {
      const { contentPlan, articleTitle, keywords, retrievedData, length } = inputData;

      const generatedContent = await this.generateContent(contentPlan, articleTitle, keywords, length, retrievedData);
      const metadata = await this.generateMetadata(contentPlan)


      console.log("article metadata: ", metadata)
      return {
        articleContent: generatedContent.articleContent,
        sharedContext: generatedContent.sharedContext,
        articleTitle: metadata.articleTitle,
        articleDescription: metadata.articleDescription
      };
    }

    async generateContent(
      contentPlan: any,
      articleTitle: any,
      keywords: any,
      articleLength: any,
      retrievedData: string[]
    ): Promise<any> {

      let length: string;
      if (articleLength === "short") {
        length = "150-250";
      } else if (articleLength === "medium") {
        length = "300-600";
      } else if (articleLength === "long") {
        length = "700-1200";
      } else {
        // Default to medium if articleLength is not recognized
        length = "300-600";
      }

      let output_format: string;
      if (articleLength === "short") {
        output_format = 
        `  
        #Article Title   
          [Introduction]
        ###[Main Section 1]
          ####[Subsection Title]
          [Subsection]
        ###[Conclusion Title]
          [Subsection]

          
        #####[Sources]
          [1]
          [2]
          [3]
          ...
        `;
      } else if (articleLength === "long") {
        output_format = 
        `     
        #Article Title
          [Introduction]
        ###[Main Section 1]
          ####[Subsection Title]
          [Subsection]
          ####[Subsection Title]
          [Subsection]
        ###[Main Section 2]
          ####[Subsection Title]
          [Subsection]
          ####[Subsection Title]
          [Subsection]
        ###[Main Section 3]
          ####[Subsection Title]
          [Subsection]
          ####[Subsection Title]
          [Subsection]
        ###[Conclusion Title]
          [Subsection]

          
        ####[Sources]
          [1]
          [2]
          [3]
          ...
        `;
      } else {
        // Default to medium if articleLength is not recognized
        output_format = 
        `     
        #Article Title
          [Introduction]
        ###[Main Section 1]
          ####[Subsection Title]
          [Subsection]
          ####[Subsection Title]
          [Subsection]
        ###[Main Section 2]
          ####[Subsection Title]
          [Subsection]
          ####[Subsection Title]
          [Subsection]
        ###[Main Section 3]
          ####[Subsection Title]
          [Subsection]
          ####[Subsection Title]
          [Subsection]
        ###[Conclusion Title]
          [Subsection]

          
        #####[Sources]
          [1]
          [2]
          [3]
          ...
        `;
      }

      const combinedRetrievedData = retrievedData.join('\n\n');

      const prompt = `Create a detailed and engaging article based on the following content plan and additional context:
      
        ${contentPlan}

        Title: "${articleTitle}"

        Additional Context from database:
        ${combinedRetrievedData}

        Instructions:
        1. Incorporate the additional context provided to enrich the article with research-backed data.
        2. Use the the structure and key points outlined in the content plan as a guide
        3. Use a conversational yet professional tone throughout the article.
        4. Prioritize the truth and accuracy. If you are making statements that are not proven or backed by weak research then include a disclaimer.
        5. Avoid unnecessarily complex words or technical jargon.
        6. Avoid a robotic tone.
        7. Include relevant examples, statistics, or case studies to support main points.
        8. Ensure smooth transitions between sections for a cohesive reading experience.
        9. Use varied sentence structures and paragraph lengths for better readability.
        10. Do not use hackneyed statements like "In conclusion" or "This article will...".
        11. Do not include statements suggesting to consult with a healthcare provider.
        12. Do not explicitly ask the readers to share the article.
        13. Do not make up fake stories or testimonials.
        14. General statements like "many studies have shown that..." are not allowed.
        15. Ensure the content is relevant to the following keywords / keyword phrases: ${keywords}
        16. Always include a section at the bottom that inclues a numbered list of the references used for the article content. 
        17. The article should be ${length} words in length.

        Please generate the full article based on these guidelines.
        
        Output Requirements:
        1. Article Title:
        - Create a compelling, SEO-friendly title.
        - Avoid clichés and sensationalism.
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
        - Ensure readability and engagement throughout.

        4. References:
        - A list of the references and research cited for the article content in AMA format.

      Article Conent Format:
        ${output_format}

        Response Format:
      {
        "articleContent": "The full article content in markdown here",
        "references": "List of references used in the article in AMA format"
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
          articleContent: parsedResponse.articleContent,
          sharedContext: this.sharedContext,
          references: parsedResponse.references
      };
      } catch (error) {
        console.error("Error parsing response:", error);
        throw new Error("Failed to parse the AI response");
      }
      } 

      async generateMetadata(contentPlan: string): Promise<any> {
        // Use this.aiClient to generate title
        const prompt = `Task: 
            Considering the following article outline, generate a sophisticated article title and description.
            Both the title and description will be used as the metadata for the article. These need to be SEO friendly and optimized to be discovered by relevant searches.
  
            Outline: ${contentPlan}
  
            Style Guidelines:
            1. Emulate the depth and nuance of The Atlantic or The New Yorker.
            2. Evoke curiosity and suggest intellectual depth.
            3. Appeal to readers who enjoy well-researched, in-depth articles.
            4. Be engaging and thought-provoking.
  
            Requirements:
            1. Avoid clichés and sensationalism.
            2. Incorporate a subtle play on words or a clever turn of phrase, if appropriate.
            3. Aim for 6-12 words.
            4. Use clear, concise language.
  
            Output: Provide only the generated title and description as strings, without quotation marks or additional commentary.`;
  
        const response = await this.aiClient.chat.completions.create({
          model: "gpt-4o-2024-08-06",
          messages: [
            { role: "system", content: "You are a helpful assistant that generates high-quality, intriguing blog titles and descriptions." },
            { role: "user", content: prompt }
          ],
          response_format: zodResponseFormat(responseFormat2, "articleMetadata")
        });
  
        //console.log("Article metadata: \n", response.choices[0].message.content.trim());
        const parsedResponse = JSON.parse(response.choices[0].message.content.trim());
  
        return {
          articleTitle: parsedResponse.articleTitle,
          articleDescription: parsedResponse.articleDescription
        };
      }
    
  }


  const responseFormat = z.object({
    articleContent: z.string(),
    references: z.array(z.string())
});

const responseFormat2 = z.object({
  articleTitle: z.string(),
  articleDescription: z.string()
})