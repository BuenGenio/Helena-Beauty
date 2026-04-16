<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { AppLocale } from "../i18n";
import { persistLocale } from "../i18n";

const { locale, t } = useI18n();

function setLocale(next: AppLocale) {
  locale.value = next;
  persistLocale(next);
}
</script>

<template>
  <div
    class="flex items-center gap-1.5"
    role="group"
    :aria-label="t('nav.language')"
  >
    <button
      type="button"
      class="flex h-9 w-9 items-center justify-center rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
      :class="
        locale === 'en'
          ? 'border-sage-600 bg-white shadow-sm'
          : 'border-sand-300 bg-white/70 hover:border-sage-500/50'
      "
      :aria-label="t('nav.langEn')"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      <svg
        class="h-5 w-7 overflow-hidden rounded-sm shadow-sm"
        viewBox="0 0 60 36"
        aria-hidden="true"
      >
        <rect width="60" height="36" fill="#012169" />
        <path d="M0 0 L60 36 M60 0 L0 36" stroke="#fff" stroke-width="7" />
        <path d="M0 0 L60 36 M60 0 L0 36" stroke="#C8102E" stroke-width="4" />
        <path d="M30 0 V36 M0 18 H60" stroke="#fff" stroke-width="10" />
        <path d="M30 0 V36 M0 18 H60" stroke="#C8102E" stroke-width="6" />
      </svg>
    </button>
    <button
      type="button"
      class="flex h-9 w-9 items-center justify-center rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
      :class="
        locale === 'uk'
          ? 'border-sage-600 bg-white shadow-sm'
          : 'border-sand-300 bg-white/70 hover:border-sage-500/50'
      "
      :aria-label="t('nav.langUk')"
      :aria-pressed="locale === 'uk'"
      @click="setLocale('uk')"
    >
      <svg
        class="h-5 w-7 overflow-hidden rounded-sm shadow-sm"
        viewBox="0 0 60 36"
        aria-hidden="true"
      >
        <rect width="60" height="18" y="0" fill="#0057B7" />
        <rect width="60" height="18" y="18" fill="#FFD700" />
      </svg>
    </button>
    <button
      type="button"
      class="flex h-9 w-9 items-center justify-center rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
      :class="
        locale === 'pl'
          ? 'border-sage-600 bg-white shadow-sm'
          : 'border-sand-300 bg-white/70 hover:border-sage-500/50'
      "
      :aria-label="t('nav.langPl')"
      :aria-pressed="locale === 'pl'"
      @click="setLocale('pl')"
    >
      <svg
        class="h-5 w-7 overflow-hidden rounded-sm shadow-sm"
        viewBox="0 0 60 36"
        aria-hidden="true"
      >
        <rect width="60" height="18" y="0" fill="#fff" />
        <rect width="60" height="18" y="18" fill="#DC143C" />
      </svg>
    </button>
  </div>
</template>
