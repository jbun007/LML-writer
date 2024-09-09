import { Keyword } from "@/app/keyword-table/columns"; // Adjust the import path as needed

export function transformKeywordsToTableData(keywords: string[]): Keyword[] {
  return keywords.map((keyword, index) => ({
    id: index.toString(),
    keyword: keyword,
    search_volume: Math.floor(Math.random() * 1000), // Random value between 0 and 999
    competition: Math.floor(Math.random() * 100), // Random value between 0 and 99
    page_bid: +(Math.random() * 5).toFixed(2), // Random value between 0 and 5 with 2 decimal places
  }));
}