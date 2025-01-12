import { ComposePost } from "@/components/common/ComposePost";
import { Feed } from "@/components/common/Feed";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <div className="border-b border-border p-4">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <ComposePost userId={session.user.id} />
      <Feed userId={session.user.id} />
    </div>
  );
}
