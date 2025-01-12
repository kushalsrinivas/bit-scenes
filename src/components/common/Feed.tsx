"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Heart, Repeat2, Share } from "lucide-react";

const tweets = [
  {
    id: 1,
    author: "Varsha Singh",
    handle: "@varshaparmar06",
    avatar: "/placeholder.svg?height=40&width=40",
    content: `A wholesome thread on Simple Ideas can have big Impacts

Don't open if you can't handle too much excitement⚡️

1. Boston moved it's highway underground in 2003. This was the result.`,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-12%20at%209.51.22%E2%80%AFPM-ae6wIBPJP3TUX7JRL55W3VozOoJotz.png",
    date: "Jan 11",
  },
  // Add more tweets as needed
];

export function Feed() {
  return (
    <div>
      {tweets.map((tweet) => (
        <Card key={tweet.id} className="rounded-none border-x-0 border-t-0 p-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={tweet.avatar} />
              <AvatarFallback>VS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold">{tweet.author}</span>
                <span className="text-muted-foreground">{tweet.handle}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{tweet.date}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap">{tweet.content}</p>
              {tweet.image && (
                <img
                  src={tweet.image}
                  alt="Tweet image"
                  className="mt-4 rounded-xl border border-border"
                />
              )}
              <div className="text-muted-foreground mt-4 flex justify-between">
                <Button variant="default" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="default" size="icon">
                  <Repeat2 className="h-4 w-4" />
                </Button>
                <Button variant="default" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="default" size="icon">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
