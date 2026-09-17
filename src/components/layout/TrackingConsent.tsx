"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const savedConsent = readSavedConsent();
    setAnalytics(savedConsent?.analytics ?? false);
    setMarketing(savedConsent?.marketing ?? false);
    setOpen(savedConsent === null);
    setReady(true);

    const openPreferences = () => {
      const currentConsent = readSavedConsent();
      setAnalytics(currentConsent?.analytics ?? false);
      setMarketing(currentConsent?.marketing ?? false);
      setOpen(true);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  const saveConsent = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const value = serializeTrackingConsent({
      analytics: nextAnalytics,
      marketing: nextMarketing,
    });
    const secure = window.location.protocol === "https:" ? "; Secure" : "";

    document.cookie = `${TRACKING_CONSENT_COOKIE}=${value}; Path=/; Max-Age=${TRACKING_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
    window.location.reload();
  };

  if (!ready || !open) return null;

  return (
    <aside
      aria-labelledby="tracking-consent-title"
      aria-describedby="tracking-consent-description"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white/95 shadow-2xl backdrop-blur"
    >
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-8">
        <div className="space-y-3">
          <div>
            <h2
              id="tracking-consent-title"
              className="font-archivo text-base font-bold text-[#051A33]"
            >
              Suas preferências de privacidade
            </h2>
            <p
              id="tracking-consent-description"
              className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-700"
            >
              Ferramentas opcionais ajudam a entender a audiência e medir os
              anúncios da campanha. Você pode escolher cada finalidade agora e
              alterar sua decisão depois no rodapé. Consulte a{" "}
              <Link
                href="/politica-de-privacidade"
                className="font-semibold text-[#1256CE] underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-slate-800">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
                className="h-4 w-4 accent-[#1256CE]"
              />
              <span>Estatísticas de audiência (Google Analytics)</span>
            </label>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-slate-800">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="h-4 w-4 accent-[#1256CE]"
              />
              <span>Medição de anúncios (Meta Pixel)</span>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <button
            type="button"
            onClick={() => saveConsent(false, false)}
            className="min-h-11 rounded border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1256CE]"
          >
            Recusar opcionais
          </button>
          <button
            type="button"
            onClick={() => saveConsent(analytics, marketing)}
            className="min-h-11 rounded border border-[#1256CE] px-4 text-sm font-semibold text-[#1256CE] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1256CE]"
          >
            Salvar seleção
          </button>
          <button
            type="button"
            onClick={() => saveConsent(true, true)}
            className="min-h-11 rounded bg-[#1256CE] px-4 text-sm font-bold text-white transition-colors hover:bg-[#003967] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1256CE]"
          >
            Aceitar todas
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
