"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
interface Tweet {
  parentId: string | null; // Assuming parentPostId can be null
  postId: string;
  id: number;
  name: string;
  content: string;
  likes: Array<{ userId: string; postId: string; id: string }>; // Adjust the structure of likes based on your data
  createdAt: Date;
}
export function CommentSection({ userId }: { userId: string }) {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const post = api.post.create.useMutation();
  const handleSubmit = () => {
    if (content.trim().length !== 0) {
      post.mutate({ userId: userId, content: content, parentId: id as string });
      setContent("");
    }
  };

  const { data } = api.post.getPostsByParentId.useQuery({
    parentPostId: id as string,
  });
  function getRelativeTime(timestamp: string | Date): string {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
  }
  return (
    <div>
      <div className="border-b border-border p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post your reply"
              className="min-h-[100px] resize-none border-none focus-visible:ring-0"
            />
            <div className="mt-4 flex items-center justify-between">
              <Button onClick={handleSubmit} className="rounded-full">
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div>
        {data && data.length > 0 ? (
          (data as Tweet[]).map((tweet, i) => (
            <Card key={i} className="rounded-none border-x-0 border-t-0 p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{tweet.name.substring(0, 3)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">@{tweet.name}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {getRelativeTime(tweet.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2">{tweet.content}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div>wow so empty</div>
        )}
      </div>
    </div>
  );
}
