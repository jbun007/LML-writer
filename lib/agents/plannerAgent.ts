import { Agent } from './agents';
import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

class ContentPlannerAgent extends Agent {
    async executeTask(inputData: any): Promise<any> {
      //const researchResults = inputData.researchResults || {};
      const mainIdea = inputData.mainIdea;
      const intent = inputData.intent;
      const keywords = inputData.keywords;
      const targetAudience = inputData.targetAudience;
      const articleLength = inputData.length;

      //outline sections
      const outline = await this.outlineSections(targetAudience, mainIdea, articleLength, keywords);

      //generate content plan - needed if we decide to implement research step
      //const contentPlan = await this.generateContentPlan(outline, keywords);

      //Suggest where visuals, graphs, images, or other media could be incorporated to enhance the content. Provide ideas on the type of visuals that would best complement each section

      return { contentPlan: outline };
    }

    async outlineSections(targetAudience: string, searchQuery: string, articleLength: string, keywords: string): Promise<any> {

      console.log("Keywords (in the outlineSections function): ", keywords);

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
        I. [Introduction Title]
          A. [Subsection]
        II. [Main Section 1]
            A. [Subsection]
            B. [Subsection]
        V. [Conclusion Title]
          A. [Subsection]
        `;
      } else if (articleLength === "medium") {
        output_format = 
        `     
        I. [Introduction Title]
          A. [Subsection]
        II. [Main Section 1]
            A. [Subsection]
            B. [Subsection]
        III. [Main Section 2]
            A. [Subsection]
            B. [Subsection]
        IV. [Main Section 3]
            A. [Subsection]
            B. [Subsection]
        V. [Conclusion Title]
          A. [Subsection]
        `;
      } else if (articleLength === "long") {
        output_format = 
        `     
        I. [Introduction Title]
          A. [Subsection]
        II. [Main Section 1]
            A. [Subsection]
            B. [Subsection]
        III. [Main Section 2]
            A. [Subsection]
            B. [Subsection]
        IV. [Main Section 3]
            A. [Subsection]
            B. [Subsection]
        V. [Conclusion Title]
          A. [Subsection]
        `;
      } else {
        // Default to medium if articleLength is not recognized
        output_format = 
        `     
        I. [Introduction Title]
          A. [Subsection]
        II. [Main Section 1]
            A. [Subsection]
            B. [Subsection]
        III. [Main Section 2]
            A. [Subsection]
            B. [Subsection]
        IV. [Main Section 3]
            A. [Subsection]
            B. [Subsection]
        V. [Conclusion Title]
          A. [Subsection]
        `;
      }

      //if taraget audience empty then set to "people"
      targetAudience = targetAudience?.trim() || 'people';

      const objective = `Create a detailed content plan for an article that aims to educate ${targetAudience} about ${searchQuery}. The objective is to inform and inspire the readers. We want readers to organically share the article with their circle of influences.`;

      const prompt = `Create an article outline based on the following:

        Content Objective: "${objective}"
        Core Idea: ${searchQuery}

        Instructions:
        1. Provide a structured outline with main sections and subsections.
        2. Ensure each section builds upon the previous one for a cohesive narrative.
        3. Keep the core idea (${searchQuery}) central to the entire outline.
        4. Incorporate the following keywords: ${keywords} into the outline. Use your discretion here. If by including a keyword, it hurts the cohesion or readability of the article - do not include it.

        Exmaple Output Format:
        ${output_format}

        Before the outline, briefly restate the content objective in your own words.

        Generate the outline now:`;

      const response = await this.aiClient.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
              { role: "system", content: "You are a helpful assistant that generates content plans for articles." },
              { role: "user", content: prompt }
          ]
      });
      //console.log(response.choices[0].message.content.trim());
      return response.choices[0].message.content.trim();
  }


  
    // async generateContentPlan(outline: string, keywords: string): Promise<any> {
    //   // Use this.aiClient to generate content plan
    //   const prompt = `Generate a content plan for an article with the following outline: ${outline}.
    //   Incorporate the following keywords: ${keywords} into the content plan.`;
    //   //The supporting points are the following: ${supportingPoints}. The references are the following: ${references}. The style of the article is the following: ${style}

    //   const response = await this.aiClient.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       { role: "system", content: "You are a helpful assistant that generates content plans for articles." },
    //       { role: "user", content: prompt }
    //     ]
    //   });

    //   return response.choices[0].message.content.trim();
    // }
}

export default ContentPlannerAgent;