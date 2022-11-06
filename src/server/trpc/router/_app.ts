import { router } from "../trpc";
import { product } from "../product";

export const appRouter = router({
  product: product,
});

// export type definition of API
export type AppRouter = typeof appRouter;
