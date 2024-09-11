import React from "react";
import { createClient } from "@/utils/supabase/client";

export default async function TestPage() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema("public")
    .from("supplement")
    .select("*");

  console.log(data);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>This is a basic test page.</p>
    </div>
  );
}
