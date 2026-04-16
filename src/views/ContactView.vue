<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const instagram = "https://www.instagram.com/helena_beauty_massages/";
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
    <p
      class="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600"
    >
      {{ t("contactPage.kicker") }}
    </p>
    <h1
      class="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
    >
      {{ t("contactPage.title") }}
    </h1>
    <p class="mt-4 text-lg leading-relaxed text-ink-muted">
      {{ t("contactPage.intro") }}
    </p>

    <div class="mt-10 space-y-6">
      <a
        :href="instagram"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition hover:border-sage-500/40 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wider text-sage-600"
          >
            {{ t("contactPage.instagramLabel") }}
          </p>
          <p class="mt-1 font-medium text-ink">@helena_beauty_massages</p>
          <p class="mt-1 text-sm text-ink-muted">
            {{ t("contactPage.instagramDm") }}
          </p>
        </div>
        <span
          class="mt-4 inline-flex items-center text-sm font-semibold text-sage-700 sm:mt-0"
        >
          {{ t("contactPage.openProfile") }}
        </span>
      </a>

      <div
        class="rounded-2xl border border-dashed border-sand-300 bg-sand-50 p-6"
      >
        <p class="text-sm font-semibold text-ink">
          {{ t("contactPage.placeholderTitle") }}
        </p>
        <p class="mt-2 text-sm leading-relaxed text-ink-muted">
          {{ t("contactPage.placeholderBody") }}
        </p>
      </div>
    </div>
  </div>
</template>
