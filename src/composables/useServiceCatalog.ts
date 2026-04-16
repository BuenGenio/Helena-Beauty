import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { Service } from "../types/service";
import { SERVICE_ORDER } from "../data/serviceMeta";

function readService(
  tm: ReturnType<typeof useI18n>["tm"],
  slug: string,
  category: Service["category"],
  localeTag: string,
): Service | undefined {
  void localeTag;
  const raw = tm(`services.${slug}`) as Record<string, unknown> | string;
  if (!raw || typeof raw !== "object") return undefined;
  const benefits = Array.isArray(raw.benefits)
    ? (raw.benefits as unknown[]).map(String)
    : [];
  const idealFor = Array.isArray(raw.idealFor)
    ? (raw.idealFor as unknown[]).map(String)
    : [];
  const sessionNote =
    raw.sessionNote != null && String(raw.sessionNote).length > 0
      ? String(raw.sessionNote)
      : undefined;
  return {
    slug,
    category,
    title: String(raw.title ?? ""),
    shortTitle: String(raw.shortTitle ?? ""),
    tagline: String(raw.tagline ?? ""),
    intro: String(raw.intro ?? ""),
    benefits,
    idealFor,
    sessionNote,
  };
}

export function useServiceCatalog() {
  const { locale, tm } = useI18n();

  const services = computed((): Service[] => {
    const list: Service[] = [];
    for (const row of SERVICE_ORDER) {
      const s = readService(tm, row.slug, row.category, locale.value);
      if (s && s.title) list.push(s);
    }
    return list;
  });

  function getServiceBySlug(slug: string): Service | undefined {
    const meta = SERVICE_ORDER.find((m) => m.slug === slug);
    if (!meta) return undefined;
    return readService(tm, slug, meta.category, locale.value);
  }

  function servicesByCategory(category: Service["category"]) {
    return computed(() =>
      services.value.filter((s) => s.category === category),
    );
  }

  return { services, getServiceBySlug, servicesByCategory };
}
