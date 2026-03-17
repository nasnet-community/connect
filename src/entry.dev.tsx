/*
 * WHAT IS THIS FILE?
 *
 * Development entry point using only client-side modules:
 * - Do not use this mode in production!
 * - No SSR
 * - No portion of the application is pre-rendered on the server.
 * - All of the application is running eagerly in the browser.
 * - More code is transferred to the browser than in SSR mode.
 * - Optimizer/Serialization/Deserialization code is not exercised!
 */
import { render, type RenderOptions } from "@builder.io/qwik";
import { initializeBrowserI18n } from "./routes/i18n-utils";

export default async function (opts: RenderOptions) {
  initializeBrowserI18n();

  const { default: Root } = await import("./root");

  return render(document, <Root />, opts);
}
