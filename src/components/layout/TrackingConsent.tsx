"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  parseTrackingConsent,
  serializeTrackingConsent,
  TRACKING_CONSENT_COOKIE,
  TRACKING_CONSENT_MAX_AGE_SECONDS,
} from "@/lib/tracking-consent";

const OPEN_PREFERENCES_EVENT = "edson:open-tracking-preferences";

function readSavedConsent() {
  const prefix = `${TRACKING_CONSENT_COOKIE}=`;
  const item = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));

  return parseTrackingConsent(item?.slice(prefix.length));
}

export function TrackingConsentBanner() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedConsent = readSavedConsent();
    setOpen(savedConsent === null);
    setReady(true);

    const openPreferences = () => setOpen(true);

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  const saveConsent = (accepted: boolean) => {
    const value = serializeTrackingConsent({
      analytics: accepted,
      marketing: accepted,
    });
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${TRACKING_CONSENT_COOKIE}=${value}; Path=/; Max-Age=${TRACKING_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
    window.location.reload();
  };

  if (!ready || !open || pathname === "/colinha-eleitoral" || pathname?.startsWith("/colinha-eleitoral/")) return null;

  return (
    <aside
      aria-labelledby="tracking-consent-title"
      aria-describedby="tracking-consent-description"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white/95 shadow-2xl backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="min-w-0">
          <div>
            <h2
              id="tracking-consent-title"
              className="font-archivo text-sm font-bold text-[#051A33]"
            >
              Privacidade e cookies
            </h2>
            <p
              id="tracking-consent-description"
              className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-700 sm:text-sm"
            >
              Usamos cookies opcionais para estatísticas de audiência e anúncios.
              Eles só são ativados se você aceitar. Você pode alterar sua decisão
              depois no rodapé. Consulte a{" "}
              <Link
                href="/politica-de-privacidade"
                className="font-semibold text-[#1256CE] underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 md:justify-end">
          <button
            type="button"
            onClick={() => saveConsent(false)}
            className="min-h-10 flex-1 whitespace-nowrap rounded border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1256CE] sm:px-4 sm:text-sm md:flex-none"
          >
            Recusar opcionais
          </button>
          <button
            type="button"
            onClick={() => saveConsent(true)}
            className="min-h-10 flex-1 whitespace-nowrap rounded bg-[#1256CE] px-3 text-xs font-bold text-white transition-colors hover:bg-[#003967] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1256CE] sm:px-4 sm:text-sm md:flex-none"
          >
            Aceitar opcionais
          </button>
        </div>
      </div>
    </aside>
  );
}

export function TrackingPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className="flex min-h-11 items-center gap-2 text-xs text-white/70 transition-colors hover:text-[#FBE502]"
    >
      Preferências de cookies
    </button>
  );
}
