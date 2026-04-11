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

  // eslint-disable-next-line qwik/no-use-visible-task -- analytics injection must run in the browser after render
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
          var THEME_STORAGE_KEY = 'theme';

          function setTheme(theme) {
            var root = document.documentElement;
            var normalizedTheme = theme === 'dark' ? 'dark' : 'light';
            root.classList.toggle('dark', normalizedTheme === 'dark');
            root.setAttribute('data-theme', normalizedTheme);
            root.style.colorScheme = normalizedTheme;
            localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);
          }
          var theme = localStorage.getItem(THEME_STORAGE_KEY);
          var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
 
          if (theme === 'dark' || theme === 'light') {
            setTheme(theme);
          } else {
            setTheme(systemTheme);
          }
        })();
      `}
        ></script>
      </head>
      <body>
        <RouterOutlet />
        {/* {!isDev && <ServiceWorkerRegister />} */}
        {!isDev && <ServiceWorkerRegister nonce={nonce} />}
      </body>
    </QwikCityProvider>
  );
});
