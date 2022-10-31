import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

export type AppRouter = typeof appRouter;

const { router, procedure } = initTRPC.create();

let lastName: string | null = null;

const appRouter = router({
  greet: procedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query(({ input, ctx }) => {
      console.log(
        `[server]: processing request for ctx ${JSON.stringify(ctx)}`
      );
      return { greeting: `hello, ${input}! (last = ${lastName ?? "unknown"})` };
    }),
  name: procedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .mutation(({ input, ctx }) => {
      console.log(
        `[server]: processing request for ctx ${JSON.stringify(ctx)}`
      );

      lastName = input;
    }),
});

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(8080);
