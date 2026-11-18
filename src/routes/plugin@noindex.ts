import type { RequestHandler } from "@builder.io/qwik-city";

// The project is sunset, so keep every route out of search engines.
export const onRequest: RequestHandler = ({ headers }) => {
  headers.set("X-Robots-Tag", "noindex, nofollow");
};
