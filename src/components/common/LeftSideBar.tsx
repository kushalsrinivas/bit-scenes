"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
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
  Mic,
  ClipboardCheck,
  Voicemail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/feed", icon: Home },
  { name: "confessions", href: "/feed/confessions", icon: Voicemail },
  { name: "jobs", href: "/feed/jobs", icon: ClipboardCheck },
  //   { name: "clubs", href: "/communities", icon: Users },
  { name: "Profile", href: "/feed/profile", icon: User },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden w-[275px] flex-col gap-4 p-4 md:flex">
      <Link href="/" className="p-2">
        <div className="h-8 w-8 text-3xl font-black">BS</div>
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
      <Button
        onClick={() => {
          redirect("/api/auth/signout");
        }}
        className="mt-4 h-12 rounded-full text-lg"
      >
        logout
      </Button>
    </div>
  );
}
