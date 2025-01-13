import { PostDetail } from "@/components/common/Comment";
import { CommentSection } from "@/components/common/CommentSection";
import { auth } from "@/server/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      {/* <Comment userId={session.user.id} /> */}
      <div>
        <div className="bg-background/95 sticky top-0 z-10 flex items-center gap-6 border-b border-border p-4 backdrop-blur">
          <Link href="/feed" className="hover:opacity-75">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Post</h1>
        </div>
        <PostDetail userId={session.user.id} />
        <CommentSection userId={session.user.id} />
      </div>
    </div>
  );
}

export default page;
