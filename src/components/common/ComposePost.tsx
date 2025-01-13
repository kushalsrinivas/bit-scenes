"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { api } from "@/trpc/react";

export function ComposePost({ userId }: { userId: string }) {
  const [content, setContent] = useState("");
  const post = api.post.create.useMutation();
  const handleSubmit = () => {
    if (content.trim().length !== 0) {
      post.mutate({ userId: userId, content: content });
      setContent("");
    }
  };
  return (
    <div className="border-b border-border p-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What is happening?!"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0"
          />
          <div className="mt-4 flex items-center justify-between">
            <Button onClick={handleSubmit} className="rounded-full">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
