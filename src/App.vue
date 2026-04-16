<script setup lang="ts">
import { watch } from "vue";
import { useI18n } from "vue-i18n";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

const { locale, t } = useI18n();

watch(
  locale,
  (l) => {
    const htmlLang = l === "en" ? "en-GB" : l === "uk" ? "uk" : "pl";
    document.documentElement.lang = htmlLang;
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
