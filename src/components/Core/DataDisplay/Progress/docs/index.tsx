import { component$ } from "@builder.io/qwik";
import Overview from "./Overview";
import Examples from "./Examples";
import APIReference from "./APIReference";
import Usage from "./Usage";
import Playground from "./Playground";

export default component$(() => {
  return (
    <>
      <Overview />
      <Examples />
      <APIReference />
      <Usage />
      <Playground />
    </>
  );
});
