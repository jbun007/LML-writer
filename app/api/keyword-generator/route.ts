import { NextRequest, NextResponse } from 'next/server';
import KeywordGenerator from '@/lib/keyword/keyword-generator';

export async function POST(req: NextRequest) {
  const { intent, mainIdea } = await req.json();

  try {
    const keywordGenerator = new KeywordGenerator();
    const result = await keywordGenerator.execute(intent, mainIdea);

    return NextResponse.json(result);


  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}