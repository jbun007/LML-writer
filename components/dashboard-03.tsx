"use client";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
  Pencil,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Keyword, columns } from "@/app/keyword-table/columns";
import { DataTable } from "@/app/keyword-table/data-table";
import { transformKeywordsToTableData } from "@/utils/dataTransform";
import Image from "next/image";

export default function Dashboard() {
  const [intent, setIntent] = useState("solution");
  const [length, setLength] = useState("medium");
  const [mainIdea, setMainIdea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [output, setOutput] = useState<{
    articleTitle: string;
    articleContent: string;
    contentPlan?: string;
    articleDescription?: string;
    sharedContext?: any;
  } | null>(null);
  const [additionalCommentary, setAdditionalCommentary] = useState("");
  const [isKeywordTableOpen, setIsKeywordTableOpen] = useState(false);
  const [tableData, setTableData] = useState<Keyword[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string>("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  const generateKeywords = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/keyword-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ intent: intent, mainIdea: mainIdea }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate keywords");
      }

      const data = await response.json();

      setTableData(transformKeywordsToTableData(data.keywordResults));
      setIsKeywordTableOpen(true);
    } catch (error) {
      console.error("Error generating keywords:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateArticle = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log("SELECTED KEYWORDS: ", selectedKeywords);

      const response = await fetch("/api/article-creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: intent,
          mainIdea: mainIdea,
          keywords: selectedKeywords ? selectedKeywords : "",
          length: length,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      const data: {
        articleTitle: string;
        articleContent: string;
        contentPlan: string;
        articleDescription: string;
        sharedContext: any;
      } = await response.json();
      //console.log("DATA --- AAAAA: \n", data);

      // Update the output state with the correct structure
      setOutput(data);
      // console.log("\n OUTPUT: \n", output);
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateArticle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/article-regenerator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          previousOutput: output,
          additionalCommentary,
          sharedContext: output?.sharedContext,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate article");
      }

      const data = await response.json();
      //console.log("SHARED CONTEXT FOR REGENERATION: \n", output?.sharedContext);

      setOutput({
        articleTitle: data.articleTitle,
        articleContent: data.articleContent,
        articleDescription: data.articleDescription,
        sharedContext: data.sharedContext,
        // contentPlan: data.contentPlan,
      });
    } catch (error) {
      console.error("Error regenerating article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const publishArticle = async () => {
    if (!output || !selectedKeywords) {
      console.error("No article or keywords to publish");
      return;
    }

    const keywordsArray = selectedKeywords
      .split(",")
      .map((keyword) => keyword.trim());

    try {
      const response = await fetch("/api/publish-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: output.articleTitle,
          content: output.articleContent,
          keywords: keywordsArray,
          description: output.articleDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to publish article");
      }

      const result = await response.json();
      console.log("Article published successfully:", result);
      // You can add a success message or notification here
    } catch (error) {
      console.error("Error publishing article:", error);
      // You can add an error message or notification here
    }
  };

  const generateImage = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsImageLoading(true);
    try {
      const response = await fetch("/api/image-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl); // Assuming the API returns the image URL
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="grid h-screen pl-[53px] w-screen">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg bg-muted"
                aria-label="Playground"
              >
                <SquareTerminal className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Playground
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Models"
              >
                <Bot className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Models
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="API"
              >
                <Code2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              API
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Documentation"
              >
                <Book className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Documentation
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg"
                aria-label="Settings"
              >
                <Settings2 className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Settings
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Help"
              >
                <LifeBuoy className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-auto rounded-lg"
                aria-label="Account"
              >
                <SquareUser className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">LML ARTICLES</h1>

          {/* Don't need this drawer - but keeping as reference  */}
          {/* <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Settings className="size-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Inputs</DrawerTitle>
                <DrawerDescription>
                  Configure the inputs for content generation.
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer> */}

          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form
              className="grid w-full items-start gap-6"
              onSubmit={generateArticle}
            >
              <fieldset className="grid gap-4 rounded-lg border p-4">
                <div className="grid gap-2">
                  <Label htmlFor="model">Article Type</Label>
                  <Select onValueChange={(value) => setIntent(value)}>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select Article Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trends">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Health & Wellness Trends
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that highlights the surge in popularity
                              of a specific product, supplement, ingredient,
                              practice, etc.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="problem">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Problem Breakdown
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that identify problems and break down the
                              best known solutions.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="product">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Product Breakdown
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that help users make informed decisions
                              before making a purchase via reviews, comparisons,
                              etc.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="supplement">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Supplement Breakdown
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that explain what a supplement is or
                              highlights one of its specific use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="ingredient">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Ingredient Breakdown
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that explain what a ingredient is or
                              highlights one of its specific use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="length">Article Length</Label>
                  <Select onValueChange={(value) => setLength(value)}>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select Article Length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Pencil className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Short
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              150-250 words
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Pencil className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Medium
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              300-600 words
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="long">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Pencil className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Long
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              700-1500 words
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>

              {/* Article Prompt Input */}
              <fieldset className="grid gap-4 rounded-lg border p-4">
                <legend className="ml-1 text-sm font-medium">
                  {/* Title for fieldset */}
                </legend>
                <div className="grid gap-2">
                  <Label htmlFor="content">Article Prompt</Label>
                  <span className="text-sm font-light italic">
                    {" "}
                    Instructions for the content generation - include main
                    points and ideas for the article{" "}
                  </span>
                  <Textarea
                    id="content"
                    placeholder="Ashwaghanda influence on testosterone..."
                    className="min-h-[6rem]"
                    onChange={(e) => setMainIdea(e.target.value)}
                  />
                </div>
                <div className="flex w-full justify-between">
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={generateKeywords}
                  >
                    Generate Keywords
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                  <Button type="submit" size="sm" className="ml-auto gap-1.5">
                    Generate Article
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </fieldset>

              {/* Article Image Section */}
              <fieldset className="grid gap-4 rounded-lg border p-4">
                <Label htmlFor="image-prompt">Article Image</Label>
                <div className="flex justify-center">
                  <div className="border rounded-lg relative w-full aspect-square">
                    {isImageLoading ? (
                      <div className="flex justify-center items-center bg-slate-200 w-full h-full">
                        <div
                          className="animate-spin rounded-full border-b-2 border-gray-900"
                          style={{ width: "64px", height: "64px" }}
                        ></div>
                      </div>
                    ) : generatedImageUrl ? (
                      <Image
                        src={generatedImageUrl}
                        alt="Generated Thumbnail"
                        layout="fill"
                        objectFit="contain"
                        className="border-4 rounded-lg"
                      />
                    ) : (
                      <Image
                        src="/abstract-paint.webp"
                        alt="Placeholder Image"
                        layout="fill"
                        objectFit="contain"
                        className="border-4 rounded-lg"
                      />
                    )}
                  </div>
                </div>
                <div className="grid gap-3">
                  <Textarea
                    id="image-prompt"
                    placeholder="Generate a vibrant expressive abstract painting that creates a sense of movement and energy through bold colors and loose brushstrokes"
                    className="min-h-[6rem]"
                    onChange={(e) => setImagePrompt(e.target.value)}
                  />
                </div>
                <div>
                  <Button size="sm" className="gap-1.5" onClick={generateImage}>
                    Generate Image
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </fieldset>
            </form>
          </div>

          {/* Output Section */}
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1 overflow-auto p-4">
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-full">
                  <span className="mb-4">Patience is a virtue...</span>
                  <LoadingSpinner />
                </div>
              ) : output ? (
                <div className="space-y-4">
                  {/* Content Plan */}
                  <div className="mt-4 border-t pt-4">
                    <ReactMarkdown className="prose prose-sm">
                      {output.contentPlan}
                    </ReactMarkdown>
                  </div>
                  {/* Article Title */}
                  <h2 className="text-2xl font-bold">{output.articleTitle}</h2>
                  {/* Article Content */}
                  <div className="prose prose-sm">
                    <ReactMarkdown>
                      {output.articleContent || "No content available"}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Generated content will appear here.
                </p>
              )}
            </div>
            <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="A form for sending a directions to AI agents. The form has a textarea and buttons to upload files and record audio."
              onSubmit={(e) => {
                e.preventDefault();
                regenerateArticle();
              }}
            >
              <Label htmlFor="additionalCommentary" className="sr-only">
                Additional Feedback and Commentary
              </Label>
              <Textarea
                id="additionalFeedback"
                placeholder="For additional instructions and revisions after initial content is generated"
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                value={additionalCommentary}
                onChange={(e) => setAdditionalCommentary(e.target.value)}
              />
              <div className="flex items-center p-3 pt-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Regenerate Article
                  <CornerDownLeft className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="ml-2 gap-1.5 bg-green-500 hover:bg-green-600 text-white"
                  onClick={publishArticle}
                >
                  Publish
                </Button>
              </div>
            </form>
          </div>
          {/* Keyword Data table pop up */}
          <Dialog
            open={isKeywordTableOpen}
            onOpenChange={setIsKeywordTableOpen}
          >
            <DialogContent className="sm:max-w-[80%]">
              <DialogHeader>
                <DialogTitle>Generated Keywords</DialogTitle>
                <DialogClose />
              </DialogHeader>
              <div className="mt-4">
                <DataTable
                  columns={columns}
                  data={tableData}
                  onSelectionChange={(selectedRows) =>
                    setSelectedKeywords(
                      selectedRows.map((row) => row.keyword).join(", ")
                    )
                  }
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsKeywordTableOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
