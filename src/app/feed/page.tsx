"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";

interface Tweet {
  id: number;
  author: string;
  content: string;
  avatar: string;
  timestamp: string;
}

export default function TwitterFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      author: "John Doe",
      content: "Just setting up my Twitter clone!",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "2m ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "This Twitter clone looks amazing! #excited",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "5m ago",
    },
  ]);
  const [newTweet, setNewTweet] = useState("");

  const handlePostTweet = () => {
    if (newTweet.trim()) {
      const tweet: Tweet = {
        id: tweets.length + 1,
        author: "Current User",
        content: newTweet,
        avatar: "/placeholder.svg?height=40&width=40",
        timestamp: "Just now",
      };
      setTweets([tweet, ...tweets]);
      setNewTweet("");
    }
  };

  return (
    <div className="mx-auto h-screen max-w-2xl overflow-scroll p-4">
      <Card className="mb-4">
        <CardContent className="pt-4">
          <Textarea
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div></div>
          <Button onClick={handlePostTweet}>Tweet</Button>
        </CardFooter>
      </Card>

      <ScrollArea className="h-[600px]">
        {tweets.map((tweet) => (
          <Card key={tweet.id} className="mb-4">
            <CardHeader>
              <div className="flex items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={tweet.avatar} alt={tweet.author} />
                  <AvatarFallback>{tweet.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{tweet.author}</p>
                  <p className="text-sm text-gray-500">{tweet.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{tweet.content}</p>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <Button variant="default" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="default" size="icon">
                  <Repeat2 className="h-5 w-5" />
                </Button>
                <Button variant="default" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="default" size="icon">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
