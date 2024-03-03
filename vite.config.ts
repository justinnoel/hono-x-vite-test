import { defineConfig } from 'vite'
import { getPlatformProxy } from 'wrangler'
import honox from 'honox/vite'
import clientBuild from 'honox/vite/client'
import pagesBuild from '@hono/vite-cloudflare-pages'

export default defineConfig(async ({ mode, command }) => {
  if (mode === 'client') {
    return {
      plugins: [clientBuild()]
    }
  }
  if (command === 'build') {
    return {
      plugins: [honox(), pagesBuild()]
    }
  }
  const { env, dispose } = await getPlatformProxy()
  return {
    plugins: [
      honox({
        devServer: {
          env,
          plugins: [
            {
              onServerClose: dispose
            }
          ]
        }
      }),
      pagesBuild()
    ]
  }
})