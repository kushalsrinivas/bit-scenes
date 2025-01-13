"use client";
import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { MessageCircle, Heart, Repeat2, Share } from "lucide-react";
function Comment({ userId }: { userId: string }) {
  const { id } = useParams();
  const { data: tweet } = api.post.getPostDetails.useQuery({ postId: id });
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

  const handleLike = (postId: string) => {
    likes.mutate({ postId: postId });
  };
  const handleComment = (postId: string) => {
    router.push(`/feed/${postId}`);
  };
  const handleShare = () => {
    console.log("share");
  };
  if (!tweet) return <div>Loading...</div>;
  return (
    <div>
      <Card className="rounded-none border-x-0 border-t-0 p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage className="bg-white" src={""} />
            <AvatarFallback className="bg-white">
              {tweet[0].name.substring(0, 3)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">@{tweet.name}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">
                {getRelativeTime(tweet[0].createdAt)}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-wrap">{tweet[0].content}</p>

            <div className="text-muted-foreground mt-4 flex justify-between">
              <Button
                onClick={() => handleComment(tweet[0].postId)}
                variant="default"
                size="icon"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => {
                  handleLike(tweet[0].postId);
                }}
                variant="default"
                size="icon"
                disabled={
                  (tweet[0].likes.length > 0 &&
                    tweet[0].likes.some((like) => like.userId === userId)) ||
                  tweet[0].likes.length === 0
                }
              >
                <Heart className="h-4 w-4" />
                {tweet[0].likes.length === 0 ? 1 : tweet[0].likes.length}
              </Button>
              <Button onClick={handleShare} variant="default" size="icon">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Comment;
