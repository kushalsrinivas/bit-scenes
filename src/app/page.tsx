import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import { MultiStepForm } from "@/components/registration/multi-step-form";
import { MarqueeDemo } from "@/components/common/Fancy";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <HydrateClient>
      <div className="relative min-h-screen">
        <MarqueeDemo />
        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-5">
          <div className="mx-auto my-5 max-w-2xl text-center">
            <h1 className="bg-gradient-to-r from-black to-black/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Join BS NOW
            </h1>
          </div>
          <MultiStepForm />
        </main>
      </div>
    </HydrateClient>
  );
}
