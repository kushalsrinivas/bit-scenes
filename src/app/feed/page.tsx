import { ComposePost } from "@/components/common/ComposePost";
import { Feed } from "@/components/common/Feed";

export default function Home() {
  return (
    <div>
      <div className="border-b border-border p-4">
        <h1 className="text-xl font-bold">Home</h1>
      </div>
      <ComposePost />
      <Feed />
    </div>
  );
}
