import { createI18n } from "vue-i18n";
import enUi from "../locales/en/ui.json";
import enServices from "../locales/en/services.json";
import ukUi from "../locales/uk/ui.json";
import ukServices from "../locales/uk/services.json";
import plUi from "../locales/pl/ui.json";
import plServices from "../locales/pl/services.json";

export type AppLocale = "en" | "uk" | "pl";

const STORAGE_KEY = "hb-locale";

function mergeMessages(
  ui: Record<string, unknown>,
  services: Record<string, unknown>,
) {
  return { ...ui, services };
}

function readStoredLocale(): AppLocale {
  if (typeof localStorage === "undefined") return "en";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "uk" || v === "pl" || v === "en") return v;
  return "en";
}

export const i18n = createI18n({
  legacy: false,
  locale: readStoredLocale(),
  fallbackLocale: "en",
  messages: {
    en: mergeMessages(enUi as Record<string, unknown>, enServices as never),
    uk: mergeMessages(ukUi as Record<string, unknown>, ukServices as never),
    pl: mergeMessages(plUi as Record<string, unknown>, plServices as never),
  },
  globalInjection: true,
});

export function persistLocale(locale: AppLocale) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
  }
}
