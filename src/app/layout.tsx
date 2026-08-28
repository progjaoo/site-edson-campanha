import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { absoluteUrl, siteUrl } from "@/lib/site-config";
import "./globals.css";

// O HTML precisa acompanhar cada deploy para não ficar preso a hashes antigos
// de chunks quando a Hostinger/CDN mantém a página em cache.
export const dynamic = "force-dynamic";

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
    "Site oficial de Edson Albertassi, candidato a Deputado Estadual pelo Rio de Janeiro. Com coragem, confiança e competência para o desenvolvimento do nosso estado. Tem que ter fé!",
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
        url: socialImage,
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
    images: [socialImage],
  },
  icons: {
    icon: "/images/logos/logo-header.svg",
    apple: "/images/logos/logo-header.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoCondensed.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className="font-archivo min-h-screen flex flex-col antialiased selection:bg-brand-yellow selection:text-brand-dark">
        <ScrollProgress />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 carregado após a hidratação para não bloquear a página. */}
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)}, { page_path: window.location.pathname });`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
