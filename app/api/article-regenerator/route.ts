import { NextRequest, NextResponse } from "next/server";
import ArticleRegenerator from "@/lib/controllers/article-regenerator";
import { SharedContext } from "@/lib/sharedContext";

export async function POST(req: NextRequest) {
    const { previousOutput, additionalCommentary, sharedContext } = await req.json();
  
    try {
      const context = new SharedContext();
      if (sharedContext && Array.isArray(sharedContext.messages)) {
        sharedContext.messages.forEach((msg: any) => 
          context.addMessage(msg.role, msg.content)
        );
      }
      console.log("SHARED CONTEXT FOR REGENERATION: \n", context);

      const articleRegenerator = new ArticleRegenerator(context);
      return NextResponse.json(await articleRegenerator.execute(previousOutput, additionalCommentary));

    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
      }
    }
  }