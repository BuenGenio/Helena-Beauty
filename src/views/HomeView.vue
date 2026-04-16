<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import HeroSlideshow from "../components/HeroSlideshow.vue";
import ServiceCard from "../components/ServiceCard.vue";
import { useServiceCatalog } from "../composables/useServiceCatalog";
import {
  HOME_HERO_IMAGE_PATHS,
  UNSPLASH_LICENSE_URL,
} from "../data/homeHeroSlideImages";
import type { HeroSlide } from "../types/heroSlide";

const { t, tm, locale } = useI18n();
const { services } = useServiceCatalog();

const featured = computed(() => services.value.slice(0, 3));

const heroSlides = computed((): HeroSlide[] => {
  void locale.value;
  const alts = tm("hero.alts") as string[];
  return HOME_HERO_IMAGE_PATHS.map((src, i) => ({
    src,
    alt: alts[i] ?? "",
    attribution: t("hero.attribution"),
    sourceUrl: UNSPLASH_LICENSE_URL,
    license: t("hero.licenseLabel"),
  }));
});
</script>

<template>
  <div>
    <HeroSlideshow :slides="heroSlides" content-max-width-class="max-w-6xl">
      <div class="max-w-3xl">
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600"
        >
          {{ t("home.kicker") }}
        </p>
        <h1
          class="mt-4 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          {{ t("home.headline") }}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-ink-muted">
          {{ t("home.lead") }}
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <RouterLink
            to="/services"
            class="inline-flex items-center justify-center rounded-full bg-sage-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sage-600"
          >
            {{ t("home.ctaServices") }}
          </RouterLink>
          <RouterLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full border border-sand-300 bg-white/90 px-6 py-3 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:border-sage-500/50"
          >
            {{ t("home.ctaContact") }}
          </RouterLink>
        </div>
      </div>
    </HeroSlideshow>

    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h2 class="text-2xl font-semibold text-ink sm:text-3xl">
            {{ t("home.popularTitle") }}
          </h2>
          <p class="mt-2 max-w-xl text-ink-muted">
            {{ t("home.popularBody") }}
          </p>
        </div>
        <RouterLink
          to="/services"
          class="text-sm font-semibold text-sage-700 hover:text-sage-600"
        >
          {{ t("home.seeAll") }}
        </RouterLink>
      </div>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          v-for="item in featured"
          :key="item.slug"
          :service="item"
        />
      </div>
    </section>

    <section class="border-y border-sand-200 bg-white">
      <div
        class="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-3 sm:px-6 sm:py-20"
      >
        <div>
          <p class="text-lg font-semibold text-ink">
            {{ t("home.pillar1Title") }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">
            {{ t("home.pillar1Body") }}
          </p>
        </div>
        <div>
          <p class="text-lg font-semibold text-ink">
            {{ t("home.pillar2Title") }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">
            {{ t("home.pillar2Body") }}
          </p>
        </div>
        <div>
          <p class="text-lg font-semibold text-ink">
            {{ t("home.pillar3Title") }}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-ink-muted">
            {{ t("home.pillar3Body") }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
