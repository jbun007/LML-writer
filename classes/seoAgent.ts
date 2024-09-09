import { Agent } from './agents';
import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

class seoOptimizerAgent extends Agent {
    googleClient: any;
  
    constructor(name: string, role: string, aiClient: any, googleClient: any) {
      super(name, role, aiClient);
      this.googleClient = googleClient;
    }
  
    async executeTask(inputData: any): Promise<any> {
      const userInput = inputData.searchQuery;
      const entities = await this.extractEntities(userInput);
      const keywordSuggestions = await this.generateKeywords(entities);
      //const keywordMetrics = await this.getKeywordMetrics(keywordSuggestions);
      //const filteredKeywords = this.filterKeywords(keywordMetrics);
      const questionKeywords = await this.generateQuestionKeywords(entities, keywordSuggestions);

      console.log("entities: \n", entities);
      console.log("keywordSuggestions: \n", keywordSuggestions);
      console.log("questionKeywords: \n", questionKeywords);
      
      return {
        seoResults: [...keywordSuggestions, ...questionKeywords]
      };
    }

    private async extractEntities(userInput: string): Promise<string[]> {
      const prompt = `Extract the entities from the following user input: ${userInput}
  
      Instructions: 1. Return a list of the entities. Values should be strings`;

      try {
        const response = await this.aiClient.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
            { role: "user", content: prompt }
          ],
        });

        const entities = response.choices[0].message.content;

        // Check if entities is empty
        if (!entities || entities.length === 0) {
          console.log("Failed to extract entities");
          return []; // Return an empty array if no entities were extracted
        }

        // If entities were successfully extracted, return them
        return JSON.parse(entities);
      } catch (error) {
        console.error("Error extracting entities:", error);
        return [];
      }
    }

    private async generateKeywords(entities: string[]): Promise<string[]> {
        const prompt = `
        Research frequently searched queries and keywords on Google that are related to the following entities: ${entities}.
        
        Given the list of entities and research you executed, generate a list of keywords that .
  
        Entities: ${entities}
  
        Instructions: 
        1. Return a comma separatedlist of the keywords. 
        2. The keywords suggestions should be frequently searched 
        3. The keywords suggestions should be related to the entities
        4. Ensure that the suggestions are not too generic`;
  
        try {
          const response = await this.aiClient.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
              { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
              { role: "user", content: prompt }
            ],
            response_format: zodResponseFormat(responseFormat, "generatedKeywords")
          });

          const content = response.choices[0].message.content;
          let parsedResponse;
          try {
            parsedResponse = JSON.parse(content);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return [];
          }

          const keywords = parsedResponse.generatedKeywords.split(',').map((keyword: string) => keyword.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
          //console.log("processed keywords: \n", keywords);
          return keywords;
        }
        catch (error) {
          console.error("Error generating keywords:", error);
          return [];
        }
    }

    // WIP: Implement this
    private async getKeywordMetrics(keywords: string[]): Promise<Array<{keyword: string, volume: number, competition: number}>> {
      // Mock API call to Google client
      return keywords.map(keyword => ({
        keyword,
        volume: Math.floor(Math.random() * 300) + 50, // Random volume between 50 and 349
        competition: Math.random() // Random competition between 0 and 1
      }));
    }

    // WIP: Implement this
    private filterKeywords(keywordMetrics: Array<{keyword: string, volume: number, competition: number}>): string[] {
      const minVolume = 100;
      const maxCompetition = 0.3;
      return keywordMetrics
        .filter(metric => metric.volume >= minVolume && metric.competition <= maxCompetition)
        .map(metric => metric.keyword)
        .slice(0, 10);
    }

    private async generateQuestionKeywords(entities: string[], keywordSuggestions: string[]): Promise<string[]> {
      const prompt = `Generate question-based keywords for ${entities} based on these suggestions:${keywordSuggestions}
      
       Instructions: 
        1. Return a comma separatedlist of the questions. 
        2. The question keywords suggestions should be frequently searched `;
      
      try {
        const response = await this.aiClient.chat.completions.create({
          model: "gpt-4o-2024-08-06",
          messages: [
            { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
            { role: "user", content: prompt }
          ],
          response_format: zodResponseFormat(responseFormat, "generatedKeywords")
        });

        const content = response.choices[0].message.content;
          let parsedResponse;
          try {
            parsedResponse = JSON.parse(content);
          } catch (error) {
            console.error("Error parsing JSON - question keywords:", error);
            return [];
          }

          const keywords = parsedResponse.generatedKeywords.split(',').map((keyword: string) => keyword.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
          //console.log("question keywords: \n", keywords);
          return keywords;
        }
        catch (error) {
          console.error("Error generating question keywords:", error);
          return [];
        }
    }
}

const responseFormat = z.object({
    generatedKeywords: z.string()
});

export default seoOptimizerAgent;