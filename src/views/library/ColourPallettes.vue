<template>
  <section>
    <h1 class="text-3xl font-bold text-grey-900">Colours</h1>
    <p class="mt-2 max-w-2xl text-grey-600">
      Brand palettes from the theme. Swatches are the OKLCH tokens; hex is the source sRGB they
      round-trip to.
    </p>

    <div class="mt-6 space-y-10">
      <article v-for="palette in PALETTES" :key="palette.name">
        <h3 class="text-lg font-semibold text-grey-900">
          {{ palette.name }}
        </h3>
        <p class="mt-1 text-sm" :class="palette.captionClass">
          {{ palette.caption }}
        </p>
        <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
          <li v-for="swatch in palette.swatches" :key="swatch.step">
            <div class="h-8 rounded-md ring-1 ring-grey-950/10 ring-inset" :class="swatch.class" />
            <div class="mt-1.5 text-xs text-grey-900">
              <span class="font-medium">{{ swatch.step }}</span>
              <span class="block font-mono text-grey-400">{{ swatch.hex }}</span>
            </div>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Swatch = {
  step: number;
  hex: string;
  class: string;
};

type Palette = {
  name: string;
  caption: string;
  captionClass: string;
  swatches: Swatch[];
};

const PALETTES: Palette[] = [
  {
    name: 'Primary',
    caption:
      'Yellow brand. DEFAULT (`bg-primary`) is step 400 — the CTA colour. Step 200 is the light-yellow wash.',
    captionClass: 'text-grey-500',
    swatches: [
      { step: 50, hex: '#FFFEF0', class: 'bg-primary-50' },
      { step: 100, hex: '#FFFDDB', class: 'bg-primary-100' },
      { step: 200, hex: '#FFFEA8', class: 'bg-primary-200' },
      { step: 300, hex: '#FFF48F', class: 'bg-primary-300' },
      { step: 400, hex: '#FFE857', class: 'bg-primary-400' },
      { step: 500, hex: '#FDD617', class: 'bg-primary-500' },
      { step: 600, hex: '#EAB106', class: 'bg-primary-600' },
      { step: 700, hex: '#B87E0A', class: 'bg-primary-700' },
      { step: 800, hex: '#8E5A0B', class: 'bg-primary-800' },
      { step: 900, hex: '#6E440C', class: 'bg-primary-900' },
      { step: 950, hex: '#442808', class: 'bg-primary-950' },
    ],
  },
  {
    name: 'Grey',
    caption: 'Warm-neutral charcoal. Also fills the secondary role — dark surfaces use 900 / 950.',
    captionClass: 'text-grey-500',
    swatches: [
      { step: 50, hex: '#FAFAF8', class: 'bg-grey-50' },
      { step: 100, hex: '#F5F5F2', class: 'bg-grey-100' },
      { step: 200, hex: '#E6E5E0', class: 'bg-grey-200' },
      { step: 300, hex: '#CCCAC2', class: 'bg-grey-300' },
      { step: 400, hex: '#A7A5A0', class: 'bg-grey-400' },
      { step: 500, hex: '#7F7D76', class: 'bg-grey-500' },
      { step: 600, hex: '#66635C', class: 'bg-grey-600' },
      { step: 700, hex: '#4C4943', class: 'bg-grey-700' },
      { step: 800, hex: '#312F2B', class: 'bg-grey-800' },
      { step: 900, hex: '#211F1C', class: 'bg-grey-900' },
      { step: 950, hex: '#161513', class: 'bg-grey-950' },
    ],
  },
  {
    name: 'Success',
    caption: 'Emerald, held cooler than the yellow so it reads as its own signal.',
    captionClass: 'text-grey-500',
    swatches: [
      { step: 50, hex: '#ECFDF6', class: 'bg-success-50' },
      { step: 100, hex: '#D0FAE7', class: 'bg-success-100' },
      { step: 200, hex: '#A3F3CE', class: 'bg-success-200' },
      { step: 300, hex: '#67E7AE', class: 'bg-success-300' },
      { step: 400, hex: '#2ED18E', class: 'bg-success-400' },
      { step: 500, hex: '#12B577', class: 'bg-success-500' },
      { step: 600, hex: '#039760', class: 'bg-success-600' },
      { step: 700, hex: '#02794E', class: 'bg-success-700' },
      { step: 800, hex: '#055F3E', class: 'bg-success-800' },
      { step: 900, hex: '#054E34', class: 'bg-success-900' },
      { step: 950, hex: '#033322', class: 'bg-success-950' },
    ],
  },
  {
    name: 'Danger',
    caption: 'Warm red tuned to sit next to the yellow brand (formerly error).',
    captionClass: 'text-grey-500',
    swatches: [
      { step: 50, hex: '#FEF3F1', class: 'bg-danger-50' },
      { step: 100, hex: '#FCE0DB', class: 'bg-danger-100' },
      { step: 200, hex: '#F9C2B8', class: 'bg-danger-200' },
      { step: 300, hex: '#F2988A', class: 'bg-danger-300' },
      { step: 400, hex: '#EA6A57', class: 'bg-danger-400' },
      { step: 500, hex: '#DE4230', class: 'bg-danger-500' },
      { step: 600, hex: '#C1301F', class: 'bg-danger-600' },
      { step: 700, hex: '#9E2417', class: 'bg-danger-700' },
      { step: 800, hex: '#7C1D14', class: 'bg-danger-800' },
      { step: 900, hex: '#661A13', class: 'bg-danger-900' },
      { step: 950, hex: '#3B0C07', class: 'bg-danger-950' },
    ],
  },
];
</script>
