/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { AsyncLocalStorage } from "node:async_hooks";
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { extractBase, setServerRenderLocaleGetter } from "./routes/i18n-utils";

const serverLocaleStorage = new AsyncLocalStorage<string>();

setServerRenderLocaleGetter(() => serverLocaleStorage.getStore());

export default async function (opts: RenderToStreamOptions) {
  return serverLocaleStorage.run(opts.serverData?.locale ?? "en", async () => {
    return renderToStream(<Root />, {
      manifest,
      ...opts,
      base: extractBase, // determine the base URL for the client code
      // Use container attributes to set attributes on the html tag.
      containerAttributes: {
        lang: opts.serverData?.locale ?? "en-us",
        ...opts.containerAttributes,
      },
    });
  });
}
