import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { students } from "@/server/db/schema";

export const studentsRouter = createTRPCRouter({
  // Public procedure for a test endpoint
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // Protected procedure to create a new student record
  create: publicProcedure
    .input(
      z.object({
        userId : z.string(),    
        usn: z.string().min(1),
        username: z.string().min(1),
        branch: z.string().min(1),
        socialLinks: z.object({
          github: z.string().url(),
          linkedin: z.string().url(),
          twitter: z.string().url(),
        }),
        interests: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(students).values({
        userId : input.userId,
        usn: input.usn,
        username: input.username,
        branch: input.branch,
        socialLinks: input.socialLinks,
        interests: input.interests,
      });
      return "Student created successfully!";
    }),

  // Protected procedure to fetch all students
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allStudents = await ctx.db.query.students.findMany();

    return allStudents;
  }),

  // Protected procedure to fetch a specific student by ID
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const student = await ctx.db.query.students.findFirst({
        where: (students, { eq }) => eq(students.userId, input.userId),
      });

      return student ?? null;
    }),

  // Protected procedure to update a student's information

});