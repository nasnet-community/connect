import { component$, useServerData, useVisibleTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik";
import { inject } from "@vercel/analytics";

import "./global.css";
import "./routes/i18n-utils";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  // useVisibleTask$(() => {
  //   initFlowbite();
  // });

  // useTask$(() => {
  //   // Only run on the client side
  //   if (typeof window !== "undefined") {
  //     initFlowbite();
  //   }
  // });

  const nonce = useServerData<string | undefined>("nonce");

  useVisibleTask$(() => {
    inject({
      mode: isDev ? "development" : "production",
      debug: true,
    });
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QW43P8FSXT"
        ></script>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QW43P8FSXT');
          `}
        />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={`
        (function() {
          function setTheme(theme) {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
          }
          const theme = localStorage.getItem('theme');
 
          if (theme) {
            setTheme(theme);
          } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              setTheme('dark');}
              else {
                setTheme('light');}}
        })();
        window.addEventListener('load', function() {
          const themeSwitch = document.getElementById('hide-checkbox');
          if (themeSwitch) {
            themeSwitch.checked = localStorage.getItem('theme') === 'light' ? true : false;
          }
        }
        );
      `}
        ></script>
      </head>
      <body lang="en">
        <RouterOutlet />
        {/* {!isDev && <ServiceWorkerRegister />} */}
        {!isDev && <ServiceWorkerRegister nonce={nonce} />}
      </body>
    </QwikCityProvider>
  );
});
