import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel administrativo",
  description: "Área restrita para gerenciamento de conteúdos da campanha.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
