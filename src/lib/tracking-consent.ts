export const TRACKING_CONSENT_COOKIE = "edson_tracking_consent";
export const TRACKING_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export type TrackingConsent = {
  analytics: boolean;
  marketing: boolean;
};

export function parseTrackingConsent(
  value: string | undefined,
): TrackingConsent | null {
  switch (value) {
    case "analytics":
      return { analytics: true, marketing: false };
    case "marketing":
      return { analytics: false, marketing: true };
    case "both":
      return { analytics: true, marketing: true };
    case "none":
      return { analytics: false, marketing: false };
    default:
      return null;
  }
}

export function serializeTrackingConsent(
  consent: TrackingConsent,
): string {
  if (consent.analytics && consent.marketing) return "both";
  if (consent.analytics) return "analytics";
  if (consent.marketing) return "marketing";
  return "none";
}
