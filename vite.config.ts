import { defineConfig } from "vite";
import { getPlatformProxy } from "wrangler";
import honox from "honox/vite";
import clientBuild from "honox/vite/client";
import pagesBuild from "@hono/vite-cloudflare-pages";

export default defineConfig(async ({ mode }) => {
  const { env, dispose } = await getPlatformProxy();
  if (mode === "client") {
    return {
      plugins: [clientBuild()],
    };
  }
  return {
    plugins: [
      honox({
        devServer: {
          env,
          plugins: [
            {
              onServerClose: dispose,
            },
          ],
        },
      }),
      pagesBuild(),
    ],
  };
});