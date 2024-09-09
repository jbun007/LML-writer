import { Keyword, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Keyword[]> {
  // Fetch data from your API here.
  return [
    {
      id: "What are the benefits of ashwagandha?",
      keyword: "What are the benefits of ashwagandha?",
      search_volume: 100,
      competition: 20,
      page_bid: 3.1,
    },
    {
      id: "ashwagandha testosterone",
      keyword: "ashwagandha testosterone",
      search_volume: 125,
      competition: 20,
      page_bid: 3.2,
    },
    {
      id: "ashwagandha anxiety relief",
      keyword: "ashwagandha anxiety relief",
      search_volume: 125,
      competition: 20,
      page_bid: 1.4,
    },
    {
      id: "ashwagandha sleep aid",
      keyword: "ashwagandha sleep aid",
      search_volume: 125,
      competition: 20,
      page_bid: 1.0,
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
