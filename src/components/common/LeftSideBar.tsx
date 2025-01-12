"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  Bell,
  Mail,
  Users,
  Bookmark,
  User,
  MoreHorizontal,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: Mail },
  { name: "Communities", href: "/communities", icon: Users },
  { name: "Premium", href: "/premium", icon: Twitter },
  { name: "Profile", href: "/profile", icon: User },
  { name: "More", href: "/more", icon: MoreHorizontal },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden w-[275px] flex-col gap-4 p-4 md:flex">
      <Link href="/" className="p-2">
        <Twitter className="h-8 w-8" />
      </Link>
      <nav className="flex flex-col gap-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "hover:bg-accent flex items-center gap-4 rounded-full px-4 py-3",
              pathname === item.href && "font-bold",
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xl">{item.name}</span>
          </Link>
        ))}
      </nav>
      <Button className="mt-4 h-12 rounded-full text-lg">Post</Button>
    </div>
  );
}
