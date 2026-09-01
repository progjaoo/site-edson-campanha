"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const sectionByPathname: Record<string, string> = {
  "/redes-sociais": "redes",
  "/jingle": "jingle",
  "/noticias": "noticias",
};

export function SectionRouteSync() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = sectionByPathname[pathname];
    if (!sectionId) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
