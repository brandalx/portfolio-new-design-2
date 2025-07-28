"use client";

import { useEffect } from "react";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieConsenInitilizer() {
  useEffect(() => {
    CookieConsent.run({
      autoShow: true,
      mode: "opt-out",
      disablePageInteraction: false,
      guiOptions: {
        consentModal: {
          layout: "box wide",
          position: "bottom center",
          equalWeightButtons: false,
          flipButtons: true,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: false,
          flipButtons: false,
        },
      },
      cookie: {
        name: "cc_cookie",
      },
      onFirstConsent: ({ cookie }) => {
        console.log("onFirstConsent fired", cookie);
        // Dispatch custom event for analytics wrapper
        window.dispatchEvent(
          new CustomEvent("cc:onConsent", { detail: cookie })
        );
      },
      onConsent: ({ cookie }) => {
        console.log("onConsent fired!", cookie);
        // Dispatch custom event for analytics wrapper
        window.dispatchEvent(
          new CustomEvent("cc:onConsent", { detail: cookie })
        );
      },
      onChange: ({ changedCategories, changedServices }) => {
        console.log("onChange fired!", changedCategories, changedServices);
        // Dispatch custom event for analytics wrapper
        window.dispatchEvent(
          new CustomEvent("cc:onChange", {
            detail: { changedCategories, changedServices },
          })
        );

        // Handle analytics disabling when user opts out
        if (changedCategories.includes("analytics")) {
          const currentConsent = CookieConsent.getCookie();
          const analyticsEnabled =
            currentConsent.categories.includes("analytics");

          if (!analyticsEnabled) {
            // Clear Google Analytics cookies
            document.cookie =
              "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Disable Google Analytics
            //@ts-expect-error - no error
            if (typeof window !== "undefined" && window.gtag) {
              //@ts-expect-error - no error
              window.gtag("consent", "update", {
                analytics_storage: "denied",
              });
            }
          }
        }
      },
      onModalReady: ({ modalName }) => {
        console.log("ready:", modalName);
      },
      onModalShow: ({ modalName }) => {
        console.log("visible:", modalName);
      },
      onModalHide: ({ modalName }) => {
        console.log("hidden:", modalName);
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: true,
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
              { name: "_gat" },
              { name: /^_gac_/ },
            ],
          },
          services: {
            ga: {
              label: "Google Analytics",
              onAccept: () => {
                console.log("Google Analytics accepted");
              },
              onReject: () => {
                console.log("Google Analytics rejected");
                // Clear Google Analytics cookies
                document.cookie =
                  "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie =
                  "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              },
            },
            vercel: {
              label: "Vercel Analytics",
              onAccept: () => {
                console.log("Vercel Analytics accepted");
              },
              onReject: () => {
                console.log("Vercel Analytics rejected");
              },
            },
          },
        },
        ads: { enabled: true },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: `
                <div style="display: flex;justify-items:start; align-items: center; gap: 8px;">
           


<svg style="width:25px !important;"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-cookie"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path stroke="none" d="M0 0h24v24H0z" /><path d="M8 13v.01" /><path d="M12 17v.01" /><path d="M12 12v.01" /><path d="M16 14v.01" /><path d="M11 8v.01" /><path d="M13.148 3.476l2.667 1.104a4 4 0 0 0 4.656 6.14l.053 .132a3 3 0 0 1 0 2.296q -.745 1.18 -1.024 1.852q -.283 .684 -.66 2.216a3 3 0 0 1 -1.624 1.623q -1.572 .394 -2.216 .661q -.712 .295 -1.852 1.024a3 3 0 0 1 -2.296 0q -1.203 -.754 -1.852 -1.024q -.707 -.292 -2.216 -.66a3 3 0 0 1 -1.623 -1.624q -.397 -1.577 -.661 -2.216q -.298 -.718 -1.024 -1.852a3 3 0 0 1 0 -2.296q .719 -1.116 1.024 -1.852q .257 -.62 .66 -2.216a3 3 0 0 1 1.624 -1.623q 1.547 -.384 2.216 -.661q .687 -.285 1.852 -1.024a3 3 0 0 1 2.296 0" /></svg>



                  <p class="ddd">Manage Cookies</p>
                </div>`,
              description:
                "I Use Cookies to ensure you get the best experience on my website. ",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage Individual preferences",
              // footer: `<a href="/privacy" target="_blank">Privacy Policy</a>`,
            },
            preferencesModal: {
              title: "Manage cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Accept current selection",
              closeIconLabel: "Close modal",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  title: "Your Privacy Choices",
                  description:
                    'In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the "Reject all" button and confirm you want to save your choices.',
                },
                {
                  title: "Strictly Necessary",
                  description:
                    "These cookies are essential for the proper functioning of the website and cannot be disabled.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Performance and Analytics",
                  description:
                    "These cookies collect information about how you use my website, including Google Analytics and Vercel Analytics. All of the data is anonymized and cannot be used to identify you.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    caption: "Cookie table",
                    headers: {
                      name: "Cookie",
                      domain: "Domain",
                      desc: "Description",
                    },
                    body: [
                      {
                        name: "Google Analytics",
                        domain:
                          typeof window !== "undefined"
                            ? location.hostname
                            : "",
                        desc: "Google Analytics - Used to distinguish users",
                      },
                      {
                        name: "Vercel Analytics",
                        domain:
                          typeof window !== "undefined"
                            ? location.hostname
                            : "",
                        desc: "Vercel Analytics - Used to track page views and performance",
                      },
                    ],
                  },
                },
                {
                  title: "Targeting and Advertising",
                  description:
                    "These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
                  linkedCategory: "ads",
                },
                {
                  title: "More information",
                  description:
                    'For any queries in relation to my policy on cookies and your choices, please <a href="/contact" style="text-decoration:underline !important;">contact us</a>',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
