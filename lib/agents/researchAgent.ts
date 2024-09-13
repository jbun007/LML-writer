import axios from 'axios';
import * as cheerio from 'cheerio';
import { Agent } from './agents';

class ResearchAgent extends Agent {
  googleClient: any;

  constructor(name: string, role: string, aiClient: any, googleClient: any, sharedContext: any) {
    super(name, role, aiClient, sharedContext);
    this.googleClient = googleClient;
  }

  async executeTask(inputData: any): Promise<any> {
    const contentType = inputData.contentType;
    const searchQuery = inputData.searchQuery;
    const optimizedQuery = await this.optimizeQuery(contentType, searchQuery);
    const googleResults = await this.searchQueryOnline(optimizedQuery);
    const filteredResults = this.filterResults(googleResults);
    return { researchResults: filteredResults };
  }

  async optimizeQuery(contentType: string, query: string): Promise<string> {
    let prompt: string;
    if (contentType === "social commentary") {
      console.log("Optimizing query for social commentary");
      prompt = `Assume you're a writer for an urban, pop culture, fashion magazine. You're tasked with doing research for an article on the topic of ${query}. Generate a search query that is optimized to gather data that would support an interesting take on this topic. Return only the search query as a string.`;
    } else if (contentType === "archive dive") {
      prompt = `Generate an optimized search query for an archive dive on: ${query}`;
    } else {
      return query; // Return original query if contentType is not recognized
    }

    const response = await this.aiClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that optimizes search queries." },
        { role: "user", content: prompt }
      ]
    });
    console.log(response.choices[0].message.content.trim());
    return response.choices[0].message.content.trim();
  }

  async searchQueryOnline(query: string): Promise<any> {
    if (query.startsWith('"') && query.endsWith('"')) {
      query = query.slice(1, -1);
    }
    const googleSearchResult = await this.googleSearch(query);
    return googleSearchResult;
  }

  async googleSearch(query: string): Promise<any> {
    const apiKey = this.googleClient.apiKey;
    const cseId = this.googleClient.cseId;
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cseId}`;

    const response = await axios.get(url);
    console.log(`\n${'='.repeat(50)}\nGoogle Search Results for: '${query}'\n${'='.repeat(50)}`);

    if (response.status === 200) {
      const data = response.data;
      const results = data.items ? data.items.map((item: any) => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet
      })) : [];
      return results.slice(0,4);
    } else {
      console.log(`Error: ${response.status}`);
      console.log(response.statusText);
      return [];
    }
  }

  async filterResults(results: any): Promise<any> {
    const extractedTexts = await Promise.all(results.map(async (result: any) => {
      const text = await this.extractText(result.url);

      //Maintains all the properties of the result object, but adds the text property
      return { ...result, text };
    }));
    return extractedTexts;
  }

  async extractText(url: string): Promise<string> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      // Extract text from main content tags
      const mainText = $('main').text();
      const articleText = $('article').text();
      const sectionText = $('section').text();

      // Combine the text from these tags
      const combinedText = `${mainText}\n${articleText}\n${sectionText}`.trim();
      return combinedText;

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Failed to extract text from ${url}: ${error.message}`);
      } else {
        console.error(`Failed to extract text from ${url}: Unknown error`);
      }
      return "";
    }
  }
}

export default ResearchAgent;
