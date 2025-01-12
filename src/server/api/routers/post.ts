import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    create: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1), // User ID from the students table
        content: z.string().min(1), // Post content
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Fetch student data based on userId
      const student = await ctx.db.query.students.findFirst({
        where: (students, { eq }) => eq(students.userId, input.userId),
      });
  
      if (!student) {
        throw new Error("Student not found");
      }
  
      // Insert a new post with the retrieved student data
      await ctx.db.insert(posts).values({
        name : student.username,
        createdById: ctx.session.user.id,
        content: input.content,
        // Optionally include student data in the post or logs
      });
  
      return {
        message: "Post created successfully!",
        student, // Optionally return the student data for client-side usage
      };
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
