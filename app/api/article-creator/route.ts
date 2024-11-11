import { NextRequest, NextResponse } from 'next/server';
import ArticleCreator from '@/lib/controllers/article-creator';

export async function POST(req: NextRequest) {
  const { intent, mainIdea, keywords } = await req.json();

  try {
    const articleCreator = new ArticleCreator();

    const result = await articleCreator.execute(intent, mainIdea, keywords);
    return NextResponse.json( result );

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}