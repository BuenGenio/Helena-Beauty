<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import type { HeroSlide } from "../types/heroSlide";

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    slides: HeroSlide[];
    /** Autoplay interval when motion is allowed. */
    intervalMs?: number;
    /** Tailwind max-width class for the foreground column. */
    contentMaxWidthClass?: string;
    /** Minimum height of the hero region. */
    minHeightClass?: string;
  }>(),
  {
    intervalMs: 6000,
    contentMaxWidthClass: "max-w-6xl",
    minHeightClass: "min-h-[320px] sm:min-h-[380px] lg:min-h-[440px]",
  },
);

const index = ref(0);
const reduceMotion = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

const slideCount = computed(() => Math.max(1, props.slides.length));

const activeIndex = computed(() => index.value % slideCount.value);

const current = computed(
  () => props.slides[activeIndex.value] ?? props.slides[0],
);

function next() {
  if (props.slides.length <= 1) return;
  index.value = (index.value + 1) % props.slides.length;
}

function prev() {
  if (props.slides.length <= 1) return;
  index.value =
    (index.value - 1 + props.slides.length) % props.slides.length;
}

function go(i: number) {
  if (!props.slides.length) return;
  index.value = ((i % props.slides.length) + props.slides.length) % props.slides.length;
}

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = null;
}

function startTimer() {
  stopTimer();
  if (reduceMotion.value || props.slides.length <= 1) return;
  timer = setInterval(next, props.intervalMs);
}

function onVisibility() {
  if (document.hidden) stopTimer();
  else startTimer();
}

let mq: MediaQueryList | null = null;
function onMotionChange() {
  reduceMotion.value = mq?.matches ?? false;
  if (reduceMotion.value) {
    index.value = 0;
    stopTimer();
  } else startTimer();
}

onMounted(() => {
  mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceMotion.value = mq.matches;
  mq.addEventListener("change", onMotionChange);
  document.addEventListener("visibilitychange", onVisibility);
  startTimer();
});

onUnmounted(() => {
  mq?.removeEventListener("change", onMotionChange);
  document.removeEventListener("visibilitychange", onVisibility);
  stopTimer();
});

watch(
  () => props.slides,
  () => {
    index.value = 0;
    startTimer();
  },
  { deep: true },
);
</script>

<template>
  <section
    class="relative overflow-hidden border-b border-sand-200"
    :class="minHeightClass"
    role="region"
    aria-roledescription="carousel"
    :aria-label="
      t('hero.carouselLabel', { n: activeIndex + 1, total: slides.length })
    "
  >
    <!-- Background images -->
    <div class="absolute inset-0 bg-stone-900" aria-hidden="true">
      <template v-for="(slide, i) in slides" :key="slide.src + i">
        <img
          :src="slide.src"
          :alt="slide.alt"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out"
          :class="i === activeIndex ? 'opacity-100' : 'opacity-0'"
          loading="eager"
          decoding="async"
          :fetchpriority="i === 0 ? 'high' : 'low'"
        />
      </template>
      <div
        class="absolute inset-0 bg-gradient-to-r from-sand-50/95 via-sand-50/88 to-sand-50/55 sm:from-sand-50/97 sm:via-sand-50/80 sm:to-sand-50/35"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-sand-50/40 via-transparent to-transparent"
      />
    </div>

    <!-- Foreground -->
    <div
      class="relative z-10 mx-auto flex h-full flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
      :class="contentMaxWidthClass"
    >
      <slot />

      <div
        v-if="slides.length > 1 && !reduceMotion"
        class="mt-8 flex flex-wrap items-center gap-3"
      >
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-white/90 text-lg text-ink shadow-sm backdrop-blur transition hover:border-sage-500/50 hover:bg-white"
          :aria-label="t('hero.prev')"
          @click="prev(); startTimer()"
        >
          ‹
        </button>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sand-300 bg-white/90 text-lg text-ink shadow-sm backdrop-blur transition hover:border-sage-500/50 hover:bg-white"
          :aria-label="t('hero.next')"
          @click="next(); startTimer()"
        >
          ›
        </button>
        <div class="flex flex-1 flex-wrap justify-center gap-2 sm:justify-end">
          <button
            v-for="(_, i) in slides"
            :key="'dot-' + i"
            type="button"
            class="h-2.5 rounded-full transition-all"
            :class="
              i === activeIndex
                ? 'w-8 bg-sage-600'
                : 'w-2.5 bg-sand-300 hover:bg-sand-400'
            "
            :aria-label="t('hero.goTo', { n: i + 1 })"
            :aria-current="i === activeIndex"
            @click="go(i); startTimer()"
          />
        </div>
      </div>

      <p
        v-else-if="slides.length > 1 && reduceMotion"
        class="mt-6 text-xs text-ink-muted"
      >
        {{ t("hero.reducedMotion") }}
      </p>
    </div>

    <!-- Attribution -->
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10 sm:px-6"
    >
      <p
        class="pointer-events-auto mx-auto max-w-6xl text-right text-[0.65rem] leading-snug text-white/90 drop-shadow sm:text-xs"
      >
        <a
          :href="current.sourceUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-white/40 underline-offset-2 hover:decoration-white"
        >
          {{ current.attribution }}
        </a>
        <span class="text-white/70"> · {{ current.license }}</span>
      </p>
    </div>
  </section>
</template>
