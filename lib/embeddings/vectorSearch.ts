import { createClient } from '@/utils/supabase/client'; // Adjust the import path as necessary

/**
 * Searches the database for relevant text chunks based on the input vector.
 * @param queryVector Vectorized user input.
 * @param matchThreshold Minimum similarity threshold for matches.
 * @param matchCount Number of matches to return.
 * @returns Array of relevant text chunks.
 */
export async function searchDatabase(queryVector: Float32Array, matchThreshold: number, matchCount: number): Promise<string[]> {
  try {
    const supabase = createClient();

    // const vectorBuffer = Buffer.from(queryVector.buffer);
        // Convert the queryVector object to an array
        const queryVectorArray = Object.values(queryVector);

    const { data, error } = await supabase.schema('normalized_data').rpc('match_supplement_description', {
      query_embedding: queryVectorArray,
      match_threshold: matchThreshold,
      match_count: matchCount
    });

    if (error) {
      console.error('Error executing Supabase function:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No relevant data found in the database.');
      return [];
    }

    // Return the text field from the result
    return data.map((row: { body: string }) => row.body);
  } catch (error) {
    console.error('Error during vector search:', error);
    throw error;
  }
}