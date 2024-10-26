LORE-RESEARCH

App Description:
Takes the user's prompt for a blog post
Generates keyword ideas using LLM
Uses Google API to pull data points on the generated keywords
Vectorizes the user's prompt and executes retrieval to get relevant research backed data from LML database
Generates a content outline and then a blog post using the generated key words
Option to revise article with additional instructions
Publish artcile to LML database

Embeddings Model: https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1

High priority:
//google key word metric data
//backlinks - if entities exist in database - then search article for supplement name mention and include hyperlink / prob use another agent to handle this on publish article action

Medium priority:
//image selection / generation
//vector search for references

Low priority:
//content length input on plannerAgent

//research agent:
//leverage the model's pretrained data first
//clean html extraction on ResearchAgent extractText method
//gracefully handle 403 errors on textExtraction

//COMPLETE:

9/?
//pipeline for article creation
//iterative content generation
//add loading state to article creation
//implement ability to re-prompt with additional instruction and feedback until satisfied

9/9 DAY SESSION
//created keyword generator
//data table UI for keywords

9/10 AFTER DARK SESSION
//fixed bug with intent not being passed
//pass keywords to the article generator
// select keywords from the table

9/10
//set up database connection
//database schema for blogs
//publish article action w/ metadata / write to databae

9/11
//memory preservation across agent threads

10/24
//vector search for research backed context
