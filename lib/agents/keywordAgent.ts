import { Agent } from './agents';
import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";
import { getAccessToken } from '@/utils/google-auth';
import axios from 'axios';

class keywordAgent extends Agent {
    googleClient: any;
  
    constructor(name: string, role: string, aiClient: any, googleClient: any, sharedContext: any) {
      super(name, role, aiClient, sharedContext);
      this.googleClient = googleClient;
    }
  
    async executeTask(inputData: any): Promise<any> {
      try {
        const accessToken = await getAccessToken();
        console.log("access token: ", accessToken);
        // Use the accessToken to make authorized requests
      } catch (error) {
        console.error('Error during task execution:', error);
        // Handle the error appropriately
      }

      const userInput = inputData.mainIdea;
      const targetIntent = inputData.intent;
      let intent = "";

      if (targetIntent === "trends") {
        intent = "articles that the surge in popularity of a specific product, supplement, ingredient,practice, etc."
      }
      if (targetIntent === "problem") {
        intent = "articles that help users clearly define a problem and learn about the best known solutions."
      }
      if (targetIntent === "product") {
        intent = "articles that help users make informed decisions about which product to buy via reviews, comparisons, etc"
      }
      if (targetIntent === "supplement") {
        intent = "articles that explain what a supplement is or highlights one of its specific use cases"
      }
      if (targetIntent === "ingredient") {
        intent = "articles that explain what an ingredient is or highlights one of its specific use cases"
      }

      const entities = await this.extractEntities(userInput);
      const keywordSuggestions = await this.generateKeywords(entities, intent);
      const keywordMetrics = await this.getHistoricalMetrics(keywordSuggestions);
      //const filteredKeywords = this.filterKeywords(keywordMetrics);
      //const questionKeywords = await this.generateQuestionKeywords(entities, keywordSuggestions);

      // console.log("entities: \n", entities);
      // console.log("keywordSuggestions: \n", keywordSuggestions);
      // console.log("questionKeywords: \n", questionKeywords);
      
      return {
        keywordResults: keywordSuggestions
        //keywordResults: keywordMetrics,

      };
    }

    private async extractEntities(userInput: string): Promise<string[]> {
      const prompt = `Extract the entities from the following user input: ${userInput}
  
      Instructions: 
      1. Return a list of the entities. Values should be strings
      2. Do not return any other text besides the list of entities;`;

      this.sharedContext.addMessage('user', prompt);

      try {
        const response = await this.aiClient.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant that extracts entities from user input." },
            ...this.sharedContext.getMessages()
          ],
        });

        console.log("shared context: \n", this.sharedContext.getMessages());

        const entities = response.choices[0].message.content;
        this.sharedContext.addMessage('assistant', entities);

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

    private async generateKeywords(entities: string[], intent: string): Promise<string[]> {
        const prompt = `
            Generate a list of keywords related to the following entities: ${entities.join(', ')}.

            Context:
            - Intent: ${intent}
            - Focus on frequently searched queries and keywords on Google

            Instructions:
            1. Generate a mix of high-volume and long-tail keywords
            2. Ensure all keywords are relevant to the given entities and intent
            3. Avoid overly generic suggestions
            4. Include a variety of keyword types (e.g., questions, comparisons, specific features)

            Output Format:
            - Provide a comma-separated list of keyword phrases
            - Do not number the keywords
            - Do not include any additional text or explanations
            - Limit the number of keyword phrases to less than 30
            - Give at least 5 question-based keywords

            Example Output:
            keyword 1, keyword 2, long tail keyword 3, question keyword 4

            Generate the keyword list now:`;
  
        try {
          const response = await this.aiClient.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
              { role: "system", content: `You are a helpful assistant that generates keywords for ${intent}` },
              { role: "user", content: prompt },
              ...this.sharedContext.getMessages()
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

          //returns string array of keywords
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

    async getHistoricalMetrics(keywords: string[]): Promise<any[]> {
      try {
        const accessToken = await getAccessToken();
        const customerId = '2010840203'; 

        const url = `https://googleads.googleapis.com/v18/customers/${customerId}:generateKeywordHistoricalMetrics`;

        const requestBody = {
          keywords: keywords,
          geoTargetConstants: ['2840'], // Example: USA
          keywordPlanNetwork: 'GOOGLE_SEARCH',
          language: '1000', // Example: English
        };

        try {
          const response = await axios.post(url, requestBody, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          console.log("KEYWORD API: ", response.data.results);

          return response.data.results.map((result: any) => ({
            keyword: result.text,
            avgMonthlySearches: result.keywordMetrics.avgMonthlySearches,
            competition: result.keywordMetrics.competition,
            competitionIndex: result.keywordMetrics.competitionIndex,
            lowTopOfPageBidMicros: result.keywordMetrics.lowTopOfPageBidMicros,
            highTopOfPageBidMicros: result.keywordMetrics.highTopOfPageBidMicros,
          }));
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Axios error:', {
              message: error.message,
              code: error.code,
              response: error.response ? {
                status: error.response.status,
                statusText: error.response.statusText,
                headers: error.response.headers,
                data: error.response.data,
              } : null,
              request: error.request,
            });
            return [];
          } else {
            console.error('Unexpected error:', error);
            return [];
          }
        }
      } catch (error) {
        console.error('Error fetching historical metrics:', error);
        return [];
      }
    }

    // private async generateQuestionKeywords(entities: string[], keywordSuggestions: string[]): Promise<string[]> {
    //   const prompt = `Generate question-based keywords for ${entities} based on these suggestions:${keywordSuggestions}
      
    //    Instructions: 
    //     1. Return a comma separatedlist of the questions. 
    //     2. The question keywords suggestions should be a mix of frequently searched and less competitive, long-tail keywords
    //     3. The question keywords suggestions should be related to the entities
    //     4. Ensure that the suggestions are not too generic`;
      
    //   try {
    //     const response = await this.aiClient.chat.completions.create({
    //       model: "gpt-4o-2024-08-06",
    //       messages: [
    //         { role: "system", content: "You are a helpful assistant that generates content based on a given plan." },
    //         { role: "user", content: prompt }
    //       ],
    //       response_format: zodResponseFormat(responseFormat, "generatedKeywords")
    //     });

    //     const content = response.choices[0].message.content;
    //       let parsedResponse;
    //       try {
    //         parsedResponse = JSON.parse(content);
    //       } catch (error) {
    //         console.error("Error parsing JSON - question keywords:", error);
    //         return [];
    //       }

    //       const keywords = parsedResponse.generatedKeywords.split(',').map((keyword: string) => keyword.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    //       //console.log("question keywords: \n", keywords);
    //       return keywords;
    //     }
    //     catch (error) {
    //       console.error("Error generating question keywords:", error);
    //       return [];
    //     }
    // }
}

const responseFormat = z.object({
    generatedKeywords: z.string()
});

export default keywordAgent;
