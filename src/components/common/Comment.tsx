"use client";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/trpc/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  MessageCircle,
  Heart,
  Repeat2,
  Bookmark,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
interface Tweet {
  postId: string; // The unique identifier for the post
  id: string; // ID of the post
  name: string; // Name of the user who created the post
  content: string; // The content of the post
  likes: Like[]; // Array of likes for the post
  createdAt: string; // Timestamp of when the post was created
}

interface Like {
  likeId: string; // Unique identifier for the like
  userId: string; // ID of the user who liked the post
  createdAt: string; // Timestamp of when the like was created
}
export function PostDetail({ userId }: { userId: string }) {
  const { id } = useParams(); // Ensure this returns the correct `postId`
  const router = useRouter();

  // Fetch the tweet details based on `id`
  const {
    data: tweet,
    isLoading,
    error,
  } = api.post.getPostDetails.useQuery(
    { postId: id! },
    { enabled: !!id }, // Only fetch if `id` is defined
  );

  // Helper to calculate relative time
  function getRelativeTime(timestamp: string | Date): string {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000,
    );

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} years ago`;
  }
  const likes = api.post.incrementLikes.useMutation();

  // Handlers for like, comment, and share actions
  const handleLike = (postId: string) => {
    likes.mutate({ postId: postId });
  };

  const handleShare = () => {
    console.log("share");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !tweet) return <div>Failed to load post.</div>;

  const post: Tweet = tweet[0]; // Assuming `tweet` is an array

  return (
    <div className="border-b border-border">
      <div>
        <Card className="rounded-none border-x-0 border-t-0 p-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage className="bg-white" src="" alt="Avatar" />
              <AvatarFallback className="bg-white">
                {post.name.substring(0, 3).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">@{post.name}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">
                  {getRelativeTime(post.createdAt)}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap">{post.content}</p>

              <div className="text-muted-foreground mt-4 flex justify-between">
                <Button
                  onClick={() => handleLike(post.postId)}
                  variant="default"
                  size="icon"
                  disabled={
                    post.likes.some((like) => like.userId === userId) ||
                    post.likes.length === 0
                  }
                >
                  <Heart className="h-4 w-4" />
                  {post.likes.length === 0 ? 1 : post.likes.length}
                </Button>
                <Button onClick={handleShare} variant="default" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
