"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import type { TrackingConsent } from "@/lib/tracking-consent";

const ISOLATED_PATH = "/colinha-eleitoral";
const META_PIXEL_ID = "1860501818274690";

const metaPixelBootstrap = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

export function TrackingScripts({
  consent,
  googleAnalyticsId,
}: {
  consent: TrackingConsent | null;
  googleAnalyticsId: string;
}) {
  const pathname = usePathname();

  // This route is intentionally isolated: no optional tracking script is even
  // rendered, regardless of the consent cookie saved on another page.
  if (!pathname || pathname === ISOLATED_PATH || pathname.startsWith(`${ISOLATED_PATH}/`)) {
    return null;
  }

  return (
    <>
      {consent?.marketing ? (
        <>
          <Script id="meta-pixel" strategy="lazyOnload">
            {metaPixelBootstrap}
          </Script>
          <noscript>
            {/* Meta requires a plain 1×1 request for the no-JavaScript fallback. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      ) : null}
      {consent?.analytics && googleAnalyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)}, { page_path: window.location.pathname });`}
          </Script>
        </>
      ) : null}
    </>
  );
}
