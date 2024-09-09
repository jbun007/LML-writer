import { NextRequest, NextResponse } from 'next/server';
import KeywordGenerator from '@/classes/keyword-generator';

export async function POST(req: NextRequest) {
  const { intent, searchQuery } = await req.json();

  try {
    const keywordGenerator = new KeywordGenerator();

    return NextResponse.json(await keywordGenerator.execute(intent, searchQuery));


  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}