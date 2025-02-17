import type { JSX } from "@builder.io/qwik";

export interface AppOption {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
}
