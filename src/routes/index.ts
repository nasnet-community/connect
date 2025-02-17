import type { RequestHandler } from "@builder.io/qwik-city";
import { extractLang } from "./i18n-utils";

export const onGet: RequestHandler = async ({ request, redirect, url }) => {
  // const guessedLocale = extractLang(request);
  const guessedLocale = extractLang(
    request.headers.get("accept-language") || "",
  );

  console.log(`  ➜  GET / - Redirecting to /${guessedLocale}...`);
  throw redirect(301, `/${guessedLocale}/${url.search}`);
};
