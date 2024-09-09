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

export default function Dashboard() {
  const [contentType, setContentType] = useState("social commentary");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<{
    articleTitle: string;
    articleContent: string;
    contentPlan?: string;
  } | null>(null);
  const [additionalCommentary, setAdditionalCommentary] = useState("");

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/article-creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentType, searchQuery: keywords }),
      });

      if (!response.ok) {
        throw new Error("Failed to create article");
      }

      const data: {
        articleTitle: string;
        articleContent: string;
        contentPlan: string;
      } = await response.json();
      //console.log("DATA --- AAAAA: \n", data);

      // Update the output state with the correct structure
      setOutput({
        articleTitle: data.articleTitle,
        articleContent: data.articleContent,
        contentPlan: data.contentPlan,
      });
      // console.log("\n OUTPUT: \n", output);
    } catch (error) {
      console.error("Error creating article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to regenerate article");
      }

      const data = await response.json();
      //console.log("REGENERATED DATA: \n", data);

      setOutput({
        articleTitle: data.articleTitle,
        articleContent: data.articleContent,
        // contentPlan: data.contentPlan,
      });
    } catch (error) {
      console.error("Error regenerating article:", error);
    } finally {
      setIsLoading(false);
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
          <Drawer>
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
          </Drawer>
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
          <div
            className="relative hidden flex-col items-start gap-8 md:flex"
            x-chunk="A settings form a configuring an AI model and messages."
          >
            <form
              className="grid w-full items-start gap-6"
              onSubmit={handleSubmit}
            >
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Intent</Label>
                  <Select onValueChange={setContentType}>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select Target Audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solution">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Define the Problem, Find solutions
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that help users clearly define a problem
                              and learn about the best known solutions.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="product research">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                Research Before Buying
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Articles that help users make informed decisions
                              before making a purchase. Reviews, comparisons,
                              etc.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* <div className="grid gap-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" type="number" placeholder="0.4" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" placeholder="0.7" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="top-k">Top K</Label>
                    <Input id="top-k" type="number" placeholder="0.0" />
                  </div>
                </div> */}
              </fieldset>

              {/* Messages Input */}
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  {/* Title for fieldset */}
                </legend>
                {/* <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="grid gap-3">
                  <Label htmlFor="content">Keywords</Label>
                  <Textarea
                    id="content"
                    placeholder="Keywords for content generation."
                    className="min-h-[9.5rem]"
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
                <Button type="submit" size="sm" className="ml-auto gap-1.5">
                  Generate Article
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </fieldset>
            </form>
          </div>
          <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3">
              Output
            </Badge>
            <div className="flex-1 overflow-auto p-4">
              {/* ********       where the output will be displayed        *****/}
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
                handleRegenerate();
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
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
