<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-sand-200 bg-sand-100">
    <div
      class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div>
        <p class="text-lg font-semibold text-ink">Helena Beauty</p>
        <p class="mt-1 text-sm text-ink-muted">
          {{ t("footer.tagline") }}
        </p>
      </div>
      <div class="max-w-md text-xs text-ink-muted">
        <p>{{ t("footer.rights", { year }) }}</p>
        <p class="mt-2">
          {{ t("footer.photoBefore") }}
          <a
            class="font-medium text-sage-700 underline decoration-sand-300 underline-offset-2 hover:decoration-sage-600"
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t("footer.unsplash") }}</a
          >
          {{ t("footer.photoBetween") }}
          <a
            class="font-medium text-sage-700 underline decoration-sand-300 underline-offset-2 hover:decoration-sage-600"
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            >{{ t("footer.license") }}</a
          >{{ t("footer.photoEnd") }}
        </p>
      </div>
    </div>
  </footer>
</template>
