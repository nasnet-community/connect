import { useLocation } from "@builder.io/qwik-city";
import * as messages from "~/paraglide/messages.js";
import { normalizeLocale, type AppLocale } from "./config";

export const semanticMessages = messages;

export const resolveMessageLocale = (locale?: string | null): AppLocale => {
  return normalizeLocale(locale);
};

export const useMessageLocale = (): AppLocale => {
  const location = useLocation();
  return normalizeLocale(location.params.locale);
};
