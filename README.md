lore research

High priority:
//memory preservation across agent threads

Medium priority:
//vector search for backlinks & references
//image selection / generation

Low priority:
//content length input on plannerAgent

//research agent:

- leverage the model's pretrained data first
- clean html extraction on ResearchAgent extractText method
- gracefully handle 403 errors on textExtraction

Base Prompt:
I have a next.js project that takes a user's text input and runs it through various agents with the goal of generating a unique, compelling blog article in the health and wellness space.

These agents include:

- plannerAgent: plans the content layout
- keywordAgent: generates keywords for SEO (short and long tail)
- contentcreatorAgent: generates the blog content
