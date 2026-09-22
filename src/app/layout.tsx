import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrackingConsentBanner } from "@/components/layout/TrackingConsent";
import { TrackingScripts } from "@/components/layout/TrackingScripts";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { absoluteUrl, siteUrl } from "@/lib/site-config";
import {
  parseTrackingConsent,
  TRACKING_CONSENT_COOKIE,
} from "@/lib/tracking-consent";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const archivoCondensed = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-archivo-condensed",
  display: "swap",
  weight: ["500", "600", "700"],
});

const socialImage = "/images/optimized/foto-edson-herosec.png";
const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-23WMV8NSDZ";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "Edson Albertassi | Deputado Estadual 15088 — Tem Que Ter Fé",
    template: "%s | Edson Albertassi",
  },
  description:
    "Site oficial de Edson Albertassi, candidato a deputado estadual pelo Rio de Janeiro. Conheça sua história, propostas e como apoiar a campanha 15088.",
  keywords: [
    "Edson Albertassi",
    "Albertassi",
    "Deputado Estadual",
    "15088",
    "Volta Redonda",
    "Sul Fluminense",
    "Rio de Janeiro",
    "Eleições 2026",
    "Tem Que Ter Fé",
    "Rádio 88 FM",
    "Bancada Evangélica",
    "candidato a deputado estadual",
    "deputado estadual do Rio de Janeiro",
    "deputado estadual 15088",
    "em quem votar para deputado estadual",
    "candidato de Volta Redonda",
    "candidato do Sul Fluminense",
    "Edson Albertassi 15088",
  ],
  authors: [{ name: "Edson Albertassi" }],
  creator: "Edson Albertassi",
  publisher: "Campanha Oficial Edson Albertassi 15088",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "3FKAibUnI1dkfxsWlmfyYNDQ-Drd1GH52oI0hmXWA58",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    title: "Edson Albertassi | Deputado Estadual 15088 — Tem Que Ter Fé",
    description:
      "Com coragem, confiança e competência, vamos colocar o Rio de Janeiro no caminho do desenvolvimento outra vez.",
    siteName: "Edson Albertassi Oficial",
    images: [
      {
        url: absoluteUrl(socialImage),
        width: 1600,
        height: 1866,
        alt: "Edson Albertassi - Deputado Estadual 15088",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edson Albertassi | Deputado Estadual 15088",
    description: "Com coragem, confiança e competência. Tem que ter fé!",
    images: [absoluteUrl(socialImage)],
  },
  icons: {
    icon: "/images/logos/logo-header.svg",
    apple: "/images/logos/logo-header.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const trackingConsent = parseTrackingConsent(
    cookieStore.get(TRACKING_CONSENT_COOKIE)?.value,
  );

  const socialProfiles = [
    "https://www.instagram.com/ealbertassi/",
    "https://www.tiktok.com/@ealbertassi",
    "https://www.facebook.com/ealbertassi",
    "https://www.youtube.com/@ealbertassi",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Edson Albertassi Oficial",
        description:
          "Site oficial de Edson Albertassi, candidato a Deputado Estadual pelo Rio de Janeiro.",
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Edson Albertassi",
        alternateName: ["Albertassi", "Edson Albertassi 15088"],
        jobTitle: "Candidato a Deputado Estadual",
        url: siteUrl,
        image: absoluteUrl(socialImage),
        description:
          "Edson Albertassi é líder político fluminense, fundador da Rádio 88 FM, ex-vice-presidente da ALERJ e defensor dos valores da família.",
        sameAs: socialProfiles,
      },
    ],
  };

  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoCondensed.variable}`}>
      <head>
        <JsonLd data={jsonLd} />
        <meta
            name="facebook-domain-verification"
            content="gk3x5ae7ss9hrelyipy63okhqw69u4"
          />
      </head>
      <body className="font-archivo min-h-screen flex flex-col antialiased selection:bg-brand-yellow selection:text-brand-dark">
        <ScrollProgress />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <TrackingScripts consent={trackingConsent} googleAnalyticsId={googleAnalyticsId} />
        <TrackingConsentBanner />
      </body>
    </html>
  );
}
