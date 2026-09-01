import { absoluteUrl, siteUrl } from "@/lib/site-config";

export interface BreadcrumbItemInput {
  name: string;
  pathname: string;
}

export interface ArticleJsonLdInput {
  headline: string;
  description: string;
  pathname: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  section?: string;
}

export function createBreadcrumbJsonLd(items: BreadcrumbItemInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}

export function createArticleJsonLd(input: ArticleJsonLdInput) {
  const articleUrl = absoluteUrl(input.pathname);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.headline,
    description: input.description,
    image: [absoluteUrl(input.imageUrl)],
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    articleSection: input.section,
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Edson Albertassi — Campanha Oficial",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logos/logo-header.svg"),
      },
    },
  };
}
