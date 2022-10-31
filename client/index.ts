import fetch from "node-fetch";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server";

// @ts-ignore
global.window = {
  ...global.window,
  fetch: fetch as any,
};

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8080",
    }),
  ],
});

async function main() {
  const primary = await client.name.mutate("peter");
  const secondary = await client.greet.query("chance");

  // log responses
  console.log([primary, secondary]);
}

main();
