import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "./trpc";

export const product = router({
  get: publicProcedure
    .input( z.object({
      id: z.string()
    }))
    .query(async ({ctx, input}) => {
      //return ctx.prisma.product.findFirst();
      const { id } = input;
      const post = await ctx.prisma.product.findUnique({
        where: { id },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  create: publicProcedure
    .input( z.object({
      name: z.string(),
      slug: z.string(),
      description: z.string(),
      inventary: z.number(),
      price: z.number(),
      createdAt: z.date(),
      updatedAt: z.date()
    }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.product.create({
        data: input,
      });
      return post;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
});