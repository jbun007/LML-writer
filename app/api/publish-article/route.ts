import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/server";
import { Database } from "@/lib/types/database";

type BlogsTable = Database['public']['Tables']['blogs']['Insert'];

export async function POST(req: NextRequest) {

  const { title, content, keywords, description } = await req.json();

  const supabase = createServiceRoleClient();

  //const slug = generateSlug(title);
  const slug = "sample-slug6";

  const newBlogEntry: Partial<BlogsTable> = {
    title,
    content,
    keywords,
    slug,
    description,
  };

  try {
    const { data, error } = await supabase
      .schema("public")
      .from("blogs")
      .insert([newBlogEntry])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Error publishing article:", error);
    return NextResponse.json(
      { error: "Failed to publish article" },
      { status: 500 }
    );
  }
}

// Function to generate a slug from the title
function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }