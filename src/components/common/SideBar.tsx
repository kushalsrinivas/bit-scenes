"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  Settings,
  Menu,
  Twitter,
} from "lucide-react";

const sidebarItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen md:flex">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="default" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 px-2">
              <Twitter className="h-6 w-6" />
              <span className="text-xl font-bold">Twitter</span>
            </Link>
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "hover:bg-accent flex items-center gap-4 rounded-md px-2 py-2",
                  pathname === item.href && "bg-accent",
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-[300px] flex-col gap-4 md:flex">
        <ScrollArea className="h-[calc(100vh-4rem)] w-full">
          <div className="flex flex-col gap-4 p-4">
            <Link href="/" className="flex items-center gap-2 px-2">
              <Twitter className="h-6 w-6" />
              <span className="text-xl font-bold">Twitter</span>
            </Link>
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "hover:bg-accent flex items-center gap-4 rounded-md px-2 py-2",
                  pathname === item.href && "bg-accent",
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.name}</span>
              </Link>
            ))}
            <Button className="mt-4">Tweet</Button>
          </div>
        </ScrollArea>
        <div className="p-4">
          <Button
            variant="default"
            className="w-full"
            onClick={() => alert("Settings clicked")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </aside>
    </div>
  );
}
