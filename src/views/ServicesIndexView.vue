<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import ServiceCard from "../components/ServiceCard.vue";
import { useServiceCatalog } from "../composables/useServiceCatalog";

const { t } = useI18n();
const { services, servicesByCategory } = useServiceCatalog();

const massage = servicesByCategory("massage");
const body = servicesByCategory("body");
const skin = servicesByCategory("skin");

const year = new Date().getFullYear();
const count = computed(() => services.value.length);
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
    <header class="max-w-2xl">
      <p
        class="text-xs font-semibold uppercase tracking-[0.2em] text-sage-600"
      >
        {{ t("servicesPage.kicker") }}
      </p>
      <h1
        class="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {{ t("servicesPage.title") }}
      </h1>
      <p class="mt-4 text-lg leading-relaxed text-ink-muted">
        {{ t("servicesPage.intro") }}
      </p>
    </header>

    <section class="mt-14">
      <h2
        class="border-b border-sand-200 pb-3 text-xl font-semibold text-ink"
      >
        {{ t("categories.massage") }}
      </h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in massage" :key="s.slug" :service="s" />
      </div>
    </section>

    <section class="mt-16">
      <h2
        class="border-b border-sand-200 pb-3 text-xl font-semibold text-ink"
      >
        {{ t("categories.body") }}
      </h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in body" :key="s.slug" :service="s" />
      </div>
    </section>

    <section class="mt-16">
      <h2
        class="border-b border-sand-200 pb-3 text-xl font-semibold text-ink"
      >
        {{ t("categories.skin") }}
      </h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in skin" :key="s.slug" :service="s" />
      </div>
    </section>

    <p class="mt-16 text-center text-sm text-ink-muted">
      {{ t("servicesPage.footer", { count, year }) }}
    </p>
  </div>
</template>
