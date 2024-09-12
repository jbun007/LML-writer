import { NextRequest, NextResponse } from "next/server";
import ArticleRegenerator from "@/lib/article/article-regenerator";

export async function POST(req: NextRequest) {
    const { previousOutput, additionalCommentary } = await req.json();
  
    try {
      const articleRegenerator = new ArticleRegenerator();
      return NextResponse.json(await articleRegenerator.execute(previousOutput, additionalCommentary));
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
      }
    }
  }