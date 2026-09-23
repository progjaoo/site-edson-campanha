"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  parseTrackingConsent,
  serializeTrackingConsent,
  TRACKING_CONSENT_COOKIE,
  TRACKING_CONSENT_MAX_AGE_SECONDS,
  type TrackingConsent,
} from "@/lib/tracking-consent";

const OPEN_PREFERENCES_EVENT = "edson:open-tracking-preferences";
const DEFAULT_CONSENT: TrackingConsent = { analytics: false, marketing: false };

function readSavedConsent() {
  const prefix = `${TRACKING_CONSENT_COOKIE}=`;
  const item = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));

  return parseTrackingConsent(item?.slice(prefix.length));
}

function saveConsentCookie(consent: TrackingConsent) {
  const value = serializeTrackingConsent(consent);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TRACKING_CONSENT_COOKIE}=${value}; Path=/; Max-Age=${TRACKING_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

function PreferenceSwitch({
  checked,
  label,
  onClick,
}: {
  checked: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
        checked ? "border-brand-blue bg-brand-blue" : "border-slate-300 bg-slate-200"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function TrackingConsentBanner() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<TrackingConsent>(DEFAULT_CONSENT);
  const isColinha = pathname === "/colinha-eleitoral" || pathname?.startsWith("/colinha-eleitoral/");

  useEffect(() => {
    const savedConsent = readSavedConsent();
    setPreferences(savedConsent ?? DEFAULT_CONSENT);
    setOpen(savedConsent === null);
    setReady(true);

    const openPreferences = () => {
      setPreferences(readSavedConsent() ?? DEFAULT_CONSENT);
      setOpen(false);
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    };
  }, []);

  const saveAndApply = (consent: TrackingConsent) => {
    saveConsentCookie(consent);
    setPreferences(consent);
    setPreferencesOpen(false);
    setOpen(false);
    window.location.reload();
  };

  const updatePreference = (key: keyof TrackingConsent) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  const openPreferenceEditor = () => {
    setOpen(false);
    setPreferencesOpen(true);
  };

  const handlePreferenceDialogChange = (nextOpen: boolean) => {
    setPreferencesOpen(nextOpen);
    if (!nextOpen) setOpen(readSavedConsent() === null);
  };

  return (
    <>
      {ready && open ? (
        <aside
          aria-labelledby="tracking-consent-title"
          aria-describedby="tracking-consent-description"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white shadow-2xl"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="min-w-0 md:max-w-3xl">
              <h2 id="tracking-consent-title" className="font-archivo text-sm font-bold text-[#051A33]">
                Privacidade e cookies
              </h2>
              <p id="tracking-consent-description" className="mt-1 text-xs leading-relaxed text-slate-700 sm:text-sm">
                {isColinha
                  ? "Os cookies opcionais medem audiência e anúncios nas páginas institucionais. Nesta colinha, Google Analytics e Meta Pixel permanecem desativados."
                  : "Cookies opcionais permitem estatísticas de audiência (Google Analytics) e medição de anúncios (Meta Pixel). Só são ativados com sua autorização."}{" "}
                Você pode mudar sua decisão a qualquer momento em “Gerenciar cookies”.{" "}
                <Link href="/politica-de-privacidade" className="font-semibold text-[#1256CE] underline underline-offset-2">
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2 md:justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => saveAndApply(DEFAULT_CONSENT)}>
                Recusar opcionais
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={openPreferenceEditor}>
                Personalizar
              </Button>
              <Button type="button" variant="default" size="sm" onClick={() => saveAndApply({ analytics: true, marketing: true })}>
                Aceitar opcionais
              </Button>
            </div>
          </div>
        </aside>
      ) : null}

      <Dialog open={preferencesOpen} onOpenChange={handlePreferenceDialogChange}>
        <DialogContent className="max-w-xl gap-0 p-0">
          <DialogHeader className="border-b border-slate-200 px-5 py-5 pr-14 sm:px-6">
            <DialogTitle className="font-archivo">Gerenciar cookies</DialogTitle>
            <DialogDescription>
              Escolha separadamente quais medições opcionais autoriza. Elas ficam desligadas até você ativá-las.
              {isColinha ? " Na página da colinha, esses scripts não são carregados, mesmo quando autorizados aqui." : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 px-5 py-5 sm:px-6">
            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="font-archivo text-sm font-bold text-brand-navy">Preferência de consentimento</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Um cookie próprio guarda sua escolha por até 180 dias para respeitar sua decisão.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                Essencial
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div className="pr-2">
                <p className="font-archivo text-sm font-bold text-brand-navy">Estatísticas de audiência</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Google Analytics 4 ajuda a entender visitas e uso das páginas institucionais.
                </p>
              </div>
              <PreferenceSwitch
                checked={preferences.analytics}
                label="Permitir estatísticas de audiência do Google Analytics"
                onClick={() => updatePreference("analytics")}
              />
            </div>

            <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div className="pr-2">
                <p className="font-archivo text-sm font-bold text-brand-navy">Medição de anúncios</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Meta Pixel mede visitas relacionadas aos anúncios da campanha.
                </p>
              </div>
              <PreferenceSwitch
                checked={preferences.marketing}
                label="Permitir medição de anúncios do Meta Pixel"
                onClick={() => updatePreference("marketing")}
              />
            </div>

            <p className="text-xs leading-relaxed text-slate-500">
              A recusa não impede o uso do site. Você pode revogar ou alterar esta escolha em “Gerenciar cookies” no rodapé.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <Button type="button" variant="outline" onClick={() => saveAndApply(DEFAULT_CONSENT)}>
              Recusar opcionais
            </Button>
            <Button type="button" variant="outline" onClick={() => saveAndApply({ analytics: true, marketing: true })}>
              Aceitar opcionais
            </Button>
            <Button type="button" onClick={() => saveAndApply(preferences)}>
              Salvar preferências
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TrackingPreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
      className="flex min-h-11 items-center gap-2 font-archivo text-xs font-semibold text-white/80 transition-colors hover:text-[#FBE502] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBE502] focus-visible:ring-offset-2 focus-visible:ring-offset-[#003967]"
    >
      <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
      Gerenciar cookies
    </button>
  );
}
