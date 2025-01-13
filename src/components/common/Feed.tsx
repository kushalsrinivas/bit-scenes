"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { MessageCircle, Heart, Repeat2, Share } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
interface Tweet {
  parentId: string | null; // The unique identifier for the post
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

export function Feed({ userId }: { userId: string }) {
  const { data, isLoading, refetch, isFetching } =
    api.post.getPostsWithDetails.useQuery(
      undefined, // Pass query parameters here if needed
      {
        staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes

        refetchOnWindowFocus: false, // Prevent refetch on window focus
        enabled: true, // Ensure this is set to false if conditional fetching is required
      },
    );

  const router = useRouter();

  // Optional: Use refetch explicitly when needed
  useEffect(() => {
    if (!data) {
      void refetch();
    }
  }, [data, refetch]);

  const likes = api.post.incrementLikes.useMutation();

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
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  return (
    <div>
      {(data as Tweet[]).map((tweet: Tweet) => {
        return (
          <div key={tweet.id}>
            {!tweet.parentId && (
              <Card
                key={tweet.id}
                className="rounded-none border-x-0 border-t-0 p-4"
              >
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage className="bg-white" src={""} />
                    <AvatarFallback className="bg-white">
                      {tweet.name.substring(0, 3)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        @{tweet.name}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">
                        {getRelativeTime(tweet.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap">{tweet.content}</p>

                    <div className="text-muted-foreground mt-4 flex justify-between">
                      <Button
                        onClick={() => handleComment(tweet.postId)}
                        variant="default"
                        size="icon"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>

                      <Button
                        onClick={() => {
                          handleLike(tweet.postId);
                        }}
                        variant="default"
                        size="icon"
                        disabled={
                          (tweet.likes.length > 0 &&
                            tweet.likes.some(
                              (like) => like.userId === userId,
                            )) ||
                          tweet.likes.length === 0
                        }
                      >
                        <Heart className="h-4 w-4" />
                        {tweet.likes.length === 0 ? 1 : tweet.likes.length}
                      </Button>
                      <Button
                        onClick={handleShare}
                        variant="default"
                        size="icon"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
}
