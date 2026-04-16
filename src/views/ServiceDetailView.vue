<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { useServiceCatalog } from "../composables/useServiceCatalog";

const props = defineProps<{ slug: string }>();

const { t, locale } = useI18n();
const { getServiceBySlug } = useServiceCatalog();

const service = computed(() => {
  void locale.value;
  return getServiceBySlug(props.slug);
});

const categoryLabel = computed(() => {
  const s = service.value;
  if (!s) return "";
  return t(`categories.${s.category}`);
});
</script>

<template>
  <div v-if="service" class="pb-16">
    <div
      class="border-b border-sand-200 bg-gradient-to-b from-sand-100 to-sand-50"
    >
      <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <RouterLink
          to="/services"
          class="text-sm font-medium text-sage-700 hover:text-sage-600"
        >
          {{ t("serviceDetail.back") }}
        </RouterLink>
        <p
          class="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sage-600"
        >
          {{ categoryLabel }}
        </p>
        <h1
          class="mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {{ service.title }}
        </h1>
        <p class="mt-4 text-lg leading-relaxed text-ink-muted">
          {{ service.tagline }}
        </p>
      </div>
    </div>

    <article class="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-12">
      <p class="text-base leading-relaxed text-ink">
        {{ service.intro }}
      </p>

      <div
        v-if="service.sessionNote"
        class="mt-8 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 text-sm leading-relaxed text-ink"
      >
        <span class="font-semibold">{{ t("serviceDetail.sessionPrefix") }} </span>{{ service.sessionNote }}
      </div>

      <section class="mt-12">
        <h2 class="text-xl font-semibold text-ink">
          {{ t("serviceDetail.benefitsTitle") }}
        </h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="(b, i) in service.benefits"
            :key="i"
            class="flex gap-3 text-ink-muted"
          >
            <span
              class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500"
              aria-hidden="true"
            />
            <span class="leading-relaxed">{{ b }}</span>
          </li>
        </ul>
      </section>

      <section class="mt-12">
        <h2 class="text-xl font-semibold text-ink">
          {{ t("serviceDetail.idealTitle") }}
        </h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="(line, i) in service.idealFor"
            :key="i"
            class="flex gap-3 text-ink-muted"
          >
            <span
              class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-600"
              aria-hidden="true"
            />
            <span class="leading-relaxed">{{ line }}</span>
          </li>
        </ul>
      </section>

      <div
        class="mt-14 rounded-2xl border border-sand-200 bg-white p-8 text-center shadow-sm"
      >
        <p class="text-lg font-semibold text-ink">
          {{ t("serviceDetail.ctaTitle") }}
        </p>
        <p class="mt-2 text-sm text-ink-muted">
          {{ t("serviceDetail.ctaBody") }}
        </p>
        <RouterLink
          to="/contact"
          class="mt-6 inline-flex items-center justify-center rounded-full bg-sage-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sage-600"
        >
          {{ t("serviceDetail.ctaButton") }}
        </RouterLink>
      </div>
    </article>
  </div>
</template>
