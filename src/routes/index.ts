import type { RequestHandler } from "@builder.io/qwik-city";
import { resolveRequestedLocale } from "~/i18n/config";

export const onGet: RequestHandler = async ({ request, redirect, url }) => {
  const guessedLocale = resolveRequestedLocale(
    request.headers.get("accept-language") || "",
  );

  console.log(`  ➜  GET / - Redirecting to /${guessedLocale}...`);
  throw redirect(301, `/${guessedLocale}/${url.search}`);
};
