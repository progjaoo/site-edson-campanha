import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";

const DEFAULT_SOCIAL_IMAGE = {
  url: "/images/optimized/foto-edson-herosec.png",
  width: 1600,
  height: 1866,
  alt: "Edson Albertassi — Deputado Estadual 15088",
};

interface PageMetadataInput {
  title: string;
  description: string;
  pathname: string;
  image?: Partial<typeof DEFAULT_SOCIAL_IMAGE> & { url: string };
  type?: "website" | "article";
}

export function createPageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
}: PageMetadataInput): Metadata {
  const socialImage = {
    ...DEFAULT_SOCIAL_IMAGE,
    ...image,
  };

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(pathname) },
    openGraph: {
      type,
      url: absoluteUrl(pathname),
      title,
      description,
      images: [
        {
          url: absoluteUrl(socialImage.url),
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(socialImage.url)],
    },
  };
}
