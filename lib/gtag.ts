export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (command: string, target: string, params?: Record<string, unknown>) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params);
  }
}
