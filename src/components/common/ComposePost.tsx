"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Image,
  FileVideo,
  ListTodo,
  MapPin,
  Smile,
  Calendar,
} from "lucide-react";

export function ComposePost() {
  const [content, setContent] = useState("");

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
            <div className="text-primary flex gap-2">
              <Button variant="default" size="icon" className="h-8 w-8">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <FileVideo className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <ListTodo className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon" className="h-8 w-8">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
            <Button className="rounded-full">Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
