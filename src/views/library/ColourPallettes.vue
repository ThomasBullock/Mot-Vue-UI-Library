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
      'Indigo-blue brand. DEFAULT (`bg-primary`) is step 700 — the CTA colour. Step 200 is the light wash.',
    captionClass: 'text-grey-500',
    swatches: [
      { step: 50, hex: '#F1F6FF', class: 'bg-primary-50' },
      { step: 100, hex: '#E2ECFF', class: 'bg-primary-100' },
      { step: 200, hex: '#CADBFF', class: 'bg-primary-200' },
      { step: 300, hex: '#A4C0FF', class: 'bg-primary-300' },
      { step: 400, hex: '#749BFF', class: 'bg-primary-400' },
      { step: 500, hex: '#426CFF', class: 'bg-primary-500' },
      { step: 600, hex: '#2A46EE', class: 'bg-primary-600' },
      { step: 700, hex: '#1E21D4', class: 'bg-primary-700' },
      { step: 800, hex: '#1C1BA0', class: 'bg-primary-800' },
      { step: 900, hex: '#161776', class: 'bg-primary-900' },
      { step: 950, hex: '#0D1148', class: 'bg-primary-950' },
    ],
  },
  {
    name: 'Grey',
    caption: 'Cool-neutral charcoal. Also fills the secondary role — dark surfaces use 900 / 950.',
    captionClass: 'text-grey-500',
    swatches: [
      { step: 50, hex: '#F9FAFC', class: 'bg-grey-50' },
      { step: 100, hex: '#F3F5F8', class: 'bg-grey-100' },
      { step: 200, hex: '#E3E5EA', class: 'bg-grey-200' },
      { step: 300, hex: '#C6CAD2', class: 'bg-grey-300' },
      { step: 400, hex: '#A3A5AA', class: 'bg-grey-400' },
      { step: 500, hex: '#7A7D84', class: 'bg-grey-500' },
      { step: 600, hex: '#60636A', class: 'bg-grey-600' },
      { step: 700, hex: '#47494F', class: 'bg-grey-700' },
      { step: 800, hex: '#2E2F33', class: 'bg-grey-800' },
      { step: 900, hex: '#1E1F22', class: 'bg-grey-900' },
      { step: 950, hex: '#141517', class: 'bg-grey-950' },
    ],
  },
  {
    name: 'Success',
    caption: 'Emerald, held distinct from the cool blue so it reads as its own signal.',
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
    caption: 'Warm red, complementary contrast to the cool brand (formerly error).',
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
