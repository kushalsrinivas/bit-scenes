import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function RightSidebar() {
  const trends = [
    {
      category: "Business & finance · Trending",
      title: "#stockmarketcrash",
      posts: "2,543 posts",
    },
    {
      category: "Trending",
      title: "#LosAngelesFires",
      posts: "60.6K posts",
    },
    {
      category: "News · Trending",
      title: "#CaliforniaWildfires",
      posts: "53.2K posts",
    },
  ];

  return (
    <div className="hidden w-[350px] flex-col gap-4 p-4 lg:flex">
      <div className="relative">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
        <Input placeholder="Search" className="bg-accent rounded-full pl-10" />
      </div>

      <Card className="p-4">
        <h2 className="mb-4 text-xl font-bold">Subscribe to Premium</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        <Button className="w-full rounded-full">Subscribe</Button>
      </Card>

      <Card className="p-4">
        <h2 className="mb-4 text-xl font-bold">What&apos;s happening</h2>
        {trends.map((trend, i) => (
          <div
            key={i}
            className="hover:bg-accent -mx-2 cursor-pointer rounded-lg px-2 py-3"
          >
            <p className="text-muted-foreground text-sm">{trend.category}</p>
            <p className="font-bold">{trend.title}</p>
            <p className="text-muted-foreground text-sm">{trend.posts}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
