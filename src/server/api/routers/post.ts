import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { postLikes, posts, students } from "@/server/db/schema";
import { desc, eq, like, sql } from "drizzle-orm";

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
        content: z.string().min(1),
        parentId : z.string().optional(), // Post content
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
        parentPostId : input.parentId,
        // Optionally include student data in the post or logs
      });
  
      return {
        message: "Post created successfully!",
        student, // Optionally return the student data for client-side usage
      };
    }),
    incrementLikes: protectedProcedure
    .input(
      z.object({
        postId: z.string().min(1), // The ID of the post to increment likes for
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id; // Get the logged-in user's ID
  
      // Check if the user has already liked the post
      const existingLike = await ctx.db.query.postLikes.findFirst({
        where: (like) => eq(like.postId, input.postId) && eq(like.userId, userId),
      });
  
      if (existingLike) {
        throw new Error("You have already liked this post.");
      }
  
      // Increment the likes count on the post
  
      // Add an entry to the postLikes table
      await ctx.db.insert(postLikes).values({
        id: crypto.randomUUID(),
        postId: input.postId,
        userId,

      });
  
      return { message: "Post liked successfully!" };
    }),
    getPostsWithDetails: protectedProcedure.query(async ({ ctx }) => {
      const tweets = await ctx.db
        .select({
          post: posts,
          likes: postLikes,
        })
        .from(posts)
        .leftJoin(postLikes, eq(posts.postId, postLikes.postId))
        .orderBy(desc(posts.createdAt));
    
      if (tweets) {
        // Group likes by postId
        const postsMap = tweets.reduce((acc, tweet) => {
          const postId = tweet.post.postId;
    
          if (!acc[postId]) {
            acc[postId] = {
              parentId : tweet.post.parentPostId,
              postId: tweet.post.postId,
              id: tweet.post.id,
              name: tweet.post.name,
              content: tweet.post.content,
              likes: [],
              createdAt: tweet.post.createdAt,
            };
          }
    
          // Add the like to the respective post's likes array if it exists
          if (tweet.likes) {
            acc[postId].likes.push(tweet.likes);
          }
    
          return acc;
        }, {});
    
        // Convert the object back into an array
        return Object.values(postsMap);
      }
    
      return tweets ?? null;
    }),
    getPostDetails: protectedProcedure
    .input(z.object({ postId: z.string() })) // Validate the input, expecting postId
    .query(async ({ ctx, input }) => {
      const { postId } = input;
  
      const tweets = await ctx.db
        .select({
          post: posts,
          likes: postLikes,
        })
        .from(posts)
        .leftJoin(postLikes, eq(posts.postId, postLikes.postId))
        .where(eq(posts.postId, postId)) // Filter by the given postId
        .orderBy(desc(posts.createdAt));
  
    
        if (tweets) {
          // Group likes by postId
          const postsMap = tweets.reduce((acc, tweet) => {
            const postId = tweet.post.postId;
      
            if (!acc[postId]) {
              acc[postId] = {
                postId: tweet.post.postId,
                id: tweet.post.id,
                name: tweet.post.name,
                content: tweet.post.content,
                likes: [],
                createdAt: tweet.post.createdAt,
              };
            }
      
            // Add the like to the respective post's likes array if it exists
            if (tweet.likes) {
              acc[postId].likes.push(tweet.likes);
            }
      
            return acc;
          }, {});
      
          // Convert the object back into an array
          return Object.values(postsMap);
        }
  
      return null;
    }),
    getPostsByParentId: protectedProcedure
  .input(z.object({ parentPostId: z.string() })) // Validate the input
  .query(async ({ ctx, input }) => {
    const { parentPostId } = input;

    // Fetch posts and likes where the parentPostId matches the input
    const tweets = await ctx.db
      .select({
        post: posts,
        likes: postLikes,
      })
      .from(posts)
      .leftJoin(postLikes, eq(posts.postId, postLikes.postId))
      .where(eq(posts.parentPostId, parentPostId)) // Filter by parentPostId
      .orderBy(desc(posts.createdAt));

    if (tweets) {
      // Group likes by postId
      const postsMap = tweets.reduce((acc, tweet) => {
        const postId = tweet.post.postId;

        if (!acc[postId]) {
          acc[postId] = {
            postId: tweet.post.postId,
            id: tweet.post.id,
            name: tweet.post.name,
            content: tweet.post.content,
            likes: [],
            createdAt: tweet.post.createdAt,
          };
        }

        // Add the like to the respective post's likes array if it exists
        if (tweet.likes) {
          acc[postId].likes.push(tweet.likes);
        }

        return acc;
      }, {});

      // Convert the object back into an array
      return Object.values(postsMap);
    }

    return tweets ?? null;
  }),
  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.query.posts.findMany({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });

  //   return post ?? null;
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
