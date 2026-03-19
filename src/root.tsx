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

const localizeBootstrapScript = `
  (function() {
    if (typeof globalThis.$localize === 'function') {
      return;
    }

    var localize = function(messageParts) {
      var expressions = Array.prototype.slice.call(arguments, 1);

      if (typeof localize.translate === 'function') {
        var translation = localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
      }

      var message = messageParts[0] || '';

      for (var index = 1; index < messageParts.length; index += 1) {
        message += String(expressions[index - 1] ?? '');
        message += messageParts[index] || '';
      }

      return message;
    };

    localize.TRANSLATIONS = {};
    globalThis.$localize = localize;
  })();
`;

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
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={localizeBootstrapScript}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      <body>
        <RouterOutlet />
        {/* {!isDev && <ServiceWorkerRegister />} */}
        {!isDev && <ServiceWorkerRegister nonce={nonce} />}
      </body>
    </QwikCityProvider>
  );
});
