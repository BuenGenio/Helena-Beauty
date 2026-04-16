<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import type { Service } from "../types/service";
import { serviceCardImageSrc } from "../data/serviceCardImage";

const props = defineProps<{ service: Service }>();
const { t } = useI18n();

const categoryLabel = computed(() =>
  t(`categories.${props.service.category}`),
);

const thumbSrc = computed(() => serviceCardImageSrc(props.service.slug));

const thumbAlt = computed(() => t(`card.imageAlts.${props.service.slug}`));
</script>

<template>
  <RouterLink
    :to="`/services/${service.slug}`"
    class="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:border-sage-500/40 hover:shadow-md"
  >
    <div class="relative aspect-[16/10] overflow-hidden bg-sand-200">
      <img
        :src="thumbSrc"
        :alt="thumbAlt"
        class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <span
        class="text-xs font-semibold uppercase tracking-wider text-sage-600"
        >{{ categoryLabel }}</span
      >
      <h2
        class="mt-2 text-xl font-semibold text-ink group-hover:text-sage-700"
      >
        {{ service.shortTitle }}
      </h2>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {{ service.tagline }}
      </p>
      <span
        class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage-700"
      >
        {{ t("card.viewDetails") }}
        <span aria-hidden="true" class="transition group-hover:translate-x-0.5"
          >→</span
        >
      </span>
    </div>
  </RouterLink>
</template>
