<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRoute } from "vue-router";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const { t } = useI18n();
const route = useRoute();
const open = ref(false);

function closeMenu() {
  open.value = false;
}

function onEscape(e: KeyboardEvent) {
  if (e.key === "Escape") closeMenu();
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : "";
  if (isOpen) window.addEventListener("keydown", onEscape);
  else window.removeEventListener("keydown", onEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onEscape);
  document.body.style.overflow = "";
});
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-sand-200/80 bg-sand-50/90 backdrop-blur-md"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6"
    >
      <RouterLink
        to="/"
        class="group flex min-w-0 shrink items-baseline gap-2"
        @click="closeMenu"
      >
        <span
          class="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
          >Helena Beauty</span
        >
        <span
          class="hidden text-xs font-medium uppercase tracking-widest text-sage-600 sm:inline"
          >{{ t("nav.aberdeen") }}</span
        >
      </RouterLink>

      <div class="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand-300 text-ink md:hidden"
          :aria-expanded="open"
          aria-controls="mobile-nav-panel"
          :aria-label="t('nav.toggleMenu')"
          @click="open = !open"
        >
          <span v-if="!open" class="text-lg leading-none">☰</span>
          <span v-else class="text-lg leading-none">×</span>
        </button>

        <div class="hidden items-center gap-6 md:flex">
          <nav
            id="site-nav"
            class="flex items-center gap-8 text-sm font-medium text-ink-muted"
          >
            <RouterLink
              to="/"
              class="transition hover:text-sage-700"
              :class="{ 'text-sage-700': route.name === 'home' }"
              >{{ t("nav.home") }}</RouterLink
            >
            <RouterLink
              to="/services"
              class="transition hover:text-sage-700"
              :class="{
                'text-sage-700':
                  route.name === 'services' || route.name === 'service',
              }"
              >{{ t("nav.services") }}</RouterLink
            >
            <RouterLink
              to="/contact"
              class="transition hover:text-sage-700"
              :class="{ 'text-sage-700': route.name === 'contact' }"
              >{{ t("nav.contact") }}</RouterLink
            >
          </nav>
          <LanguageSwitcher />
        </div>

        <div class="md:hidden">
          <LanguageSwitcher />
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        leave-active-class="transition-opacity duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="fixed inset-0 z-50 bg-ink/25 backdrop-blur-[2px] md:hidden"
          aria-hidden="true"
          @click="closeMenu"
        />
      </Transition>
      <Transition
        enter-active-class="transition-transform duration-200 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <aside
          v-if="open"
          id="mobile-nav-panel"
          class="fixed inset-y-0 right-0 z-[60] flex w-[min(100%,18rem)] flex-col border-l border-sand-200 bg-sand-50 shadow-xl md:hidden"
          role="dialog"
          aria-modal="true"
          :aria-label="t('nav.toggleMenu')"
        >
          <div class="flex justify-end border-b border-sand-200 px-3 py-3">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sand-300 text-ink"
              :aria-label="t('nav.toggleMenu')"
              @click="closeMenu"
            >
              <span class="text-lg leading-none">×</span>
            </button>
          </div>
          <nav class="flex flex-1 flex-col gap-1 px-2 py-4 text-sm font-medium text-ink">
            <RouterLink
              to="/"
              class="rounded-lg px-3 py-3 transition hover:bg-sand-100"
              :class="{ 'bg-sand-100 text-sage-700': route.name === 'home' }"
              @click="closeMenu"
              >{{ t("nav.home") }}</RouterLink
            >
            <RouterLink
              to="/services"
              class="rounded-lg px-3 py-3 transition hover:bg-sand-100"
              :class="{
                'bg-sand-100 text-sage-700':
                  route.name === 'services' || route.name === 'service',
              }"
              @click="closeMenu"
              >{{ t("nav.services") }}</RouterLink
            >
            <RouterLink
              to="/contact"
              class="rounded-lg px-3 py-3 transition hover:bg-sand-100"
              :class="{ 'bg-sand-100 text-sage-700': route.name === 'contact' }"
              @click="closeMenu"
              >{{ t("nav.contact") }}</RouterLink
            >
          </nav>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>
