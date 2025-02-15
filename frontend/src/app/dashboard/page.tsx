"use client";
import React, { useState } from "react";
import { Hash, Loader2, Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

interface ContentIdea {
  contentType: string;
  title: string;
  hook: string;
  description: string;
  trendConnection: string;
  hashtags: string[];
  estimatedEngagement: "HIGH" | "MEDIUM" | "LOW";
}

const platforms = [
  "YouTube",
  "Instagram",
  "TikTok",
  "Twitter",
  "LinkedIn",
  "Facebook",
];

const niches = [
  "All",
  "Autos and Vehicles",
  "Beauty and Fashion",
  "Business and Finance",
  "Climate",
  "Entertainment",
  "Food and Drink",
  "Games",
  "Health",
  "Hobbies and Leisure",
  "Jobs and Education",
  "Law and Government",
  "Pets and Animals",
  "Politics",
  "Science",
  "Shopping",
  "Sports",
  "Technology",
  "Travel and Transportation",
  "Other",
];

const timeRanges = [
  { value: "24", label: "Last 24 Hours" },
  { value: "48", label: "Last 48 Hours" },
  { value: "72", label: "Last 3 Days" },
  { value: "168", label: "Last 7 Days" },
];

export default function Page() {
  const [platform, setPlatform] = useState("");
  const [niche, setNiche] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const {
    mutate,
    data: ideas,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const response = await api.post("/ai/generate", {
        platform,
        niche,
        timeRange: parseInt(timeRange),
      });
      return response.data as ContentIdea[];
    },
    onSuccess: () => {
      toast({
        description: "Content ideas generated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description:
          "Failed to generate content ideas. Please try again later.",
      });
    },
  });


  return (
    <main className="h-screen w-full relative bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container h-screen overflow-y-scroll  mx-auto px-4 py-8 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Sparkles className="w-8 h-8 text-indigo-400 mb-3 mx-auto" />
            <h1 className="text-3xl font-bold text-white mb-2">
              AI Content Idea Generator
            </h1>
            <p className="text-zinc-400">
              Get trending content ideas tailored to your platform and niche
            </p>
          </div>

          <Card className="bg-zinc-900/50 border-zinc-800/50 shadow-xl mb-8 backdrop-blur-sm">
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-indigo-400"></div>
                    Platform
                  </label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 h-10 transition-all hover:border-indigo-500/50">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {platforms.map((p) => (
                        <SelectItem key={p} value={p.toLowerCase()}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-indigo-400"></div>
                    Content Niche
                  </label>
                  <Select value={niche} onValueChange={setNiche}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 h-10 transition-all hover:border-indigo-500/50">
                      <SelectValue placeholder="Select your niche" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {niches.map((n) => (
                        <SelectItem key={n} value={n.toLowerCase()}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-indigo-400"></div>
                    Time Range
                  </label>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700/50 h-10 transition-all hover:border-indigo-500/50">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700">
                      {timeRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={() => mutate()}
                disabled={!platform || !niche || !timeRange || isPending}
                className="w-full h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-zinc-50 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {ideas && ideas.length > 0 && (
            <div className="grid gap-4">
              {ideas?.map((idea, index) => (
                <Card
                  key={index}
                  className={cn(
                    "bg-zinc-900/50 border-zinc-800/50 shadow-lg transition-all duration-300 backdrop-blur-sm",
                    "hover:bg-zinc-800/50 group hover:border-indigo-500/20"
                  )}
                >
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-indigo-500/10 text-indigo-400 px-2 py-1 text-xs rounded-full"
                      >
                        {idea.contentType}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn("px-2 py-1 rounded-full text-xs", {
                          "bg-green-500/10 text-green-400":
                            idea.estimatedEngagement === "HIGH",
                          "bg-yellow-500/10 text-yellow-400":
                            idea.estimatedEngagement === "MEDIUM",
                          "bg-red-500/10 text-red-400":
                            idea.estimatedEngagement === "LOW",
                        })}
                      >
                        {idea.estimatedEngagement} Engagement
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-indigo-400 transition-colors mb-4">
                      {idea.title}
                    </CardTitle>
                    <CardDescription className="space-y-4">
                      <div className="space-y-2">
                        <p className="font-medium text-indigo-400 text-sm flex items-center gap-2">
                          <span  className="h-1 w-1 rounded-full block bg-indigo-400"></span>
                          Hook
                        </p>
                        <p className="text-zinc-300 text-sm">{idea.hook}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-indigo-400 text-sm flex items-center gap-2">
                          <span className=" block h-1 w-1 rounded-full bg-indigo-400"></span>
                          Description
                        </p>
                        <p className="text-zinc-300 text-sm">
                          {idea.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-indigo-400 text-sm flex items-center gap-2">
                          <span className=" block h-1 w-1 rounded-full bg-indigo-400"></span>
                          Trend Connection
                        </p>
                        <p className="text-zinc-300 text-sm">
                          {idea.trendConnection}
                        </p>
                      </div>
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {idea.hashtags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 px-2 py-0.5 text-xs rounded-full transition-colors hover:text-indigo-400"
                        >
                          <Hash className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
