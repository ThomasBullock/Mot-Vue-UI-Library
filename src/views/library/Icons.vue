<template>
  <section>
    <h1 class="text-3xl font-bold text-grey-900">Icons</h1>
    <p class="mt-2 max-w-2xl text-grey-600">
      IcoMoon glyphs wrapped by
      <code class="font-mono text-grey-800">BaseIcon</code>. Colour mode maps palette0 to brand
      tokens. Mono inherits the parent
      <code class="font-mono text-grey-800">color</code>
      for strokes and accents;
      <code class="font-mono text-grey-800">color0</code>
      /
      <code class="font-mono text-grey-800">color3</code>
      fills are unused.
    </p>
    <p class="mt-2 text-sm text-grey-500">
      Icons by
      <a
        class="font-medium text-grey-700 underline decoration-grey-300 underline-offset-2 hover:text-grey-900"
        href="https://icomoon.io"
        rel="noopener noreferrer"
        target="_blank"
      >
        Keyamoon / IcoMoon </a
      >.
    </p>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Inherit (mono)</h3>
      <p class="mt-1 text-sm text-grey-500">
        Parent
        <code class="font-mono">text-*</code>
        sets the mono colour. No colour prop.
      </p>
      <div class="mt-4 flex flex-wrap items-center gap-4">
        <span
          v-for="swatch in INHERIT_SWATCHES"
          :key="swatch.class"
          class="inline-flex items-center gap-2"
          :class="swatch.class"
        >
          <BaseIcon name="heart" mode="mono" />
          <span class="text-sm">{{ swatch.label }}</span>
        </span>
        <BaseButton>
          <BaseIcon name="check" mode="mono" :size="16" />
          Save
        </BaseButton>
      </div>
    </article>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Size</h3>
      <p class="mt-1 text-sm text-grey-500">Same glyph at the preset sizes (px).</p>
      <div class="mt-4 flex items-end gap-6">
        <div
          v-for="preset in ICON_SIZE_PRESETS"
          :key="preset"
          class="flex flex-col items-center gap-2"
        >
          <BaseIcon name="alert" :size="preset" />
          <span class="font-mono text-xs text-grey-500">{{ preset }}</span>
        </div>
      </div>
    </article>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">All icons</h3>
      <p class="mt-1 text-sm text-grey-500">Colour on the left, mono on the right.</p>

      <div class="mt-4 flex flex-wrap items-end gap-6">
        <div class="w-64">
          <BaseLabel for="icon-filter">Filter</BaseLabel>
          <BaseInput
            id="icon-filter"
            v-model="query"
            class="mt-1"
            type="search"
            placeholder="alarm-clock, heart…"
          />
        </div>
        <div>
          <BaseLabel for="icon-preview-size">Preview size ({{ previewSize }}px)</BaseLabel>
          <input
            id="icon-preview-size"
            v-model.number="previewSize"
            class="mt-1 block w-48 accent-primary"
            type="range"
            :min="PREVIEW_SIZE_MIN"
            :max="PREVIEW_SIZE_MAX"
            :step="PREVIEW_SIZE_STEP"
          />
        </div>
      </div>

      <p class="mt-3 text-sm text-grey-500">{{ filteredNames.length }} / {{ ICON_NAMES.length }}</p>

      <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <li
          v-for="iconName in filteredNames"
          :key="iconName"
          class="rounded-md border border-grey-200 bg-white p-3"
        >
          <div class="flex items-center justify-center gap-4 text-grey-800">
            <BaseIcon :name="iconName" :size="previewSize" />
            <BaseIcon :name="iconName" mode="mono" :size="previewSize" />
          </div>
          <p class="mt-2 text-center font-mono text-xs text-grey-600">{{ iconName }}</p>
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseLabel from '@/components/ui/BaseLabel.vue';
import { ICON_NAMES } from '@/components/ui/iconGlyphs';
import { ICON_SIZE_DEFAULT, ICON_SIZE_PRESETS } from '@/constants/icons';
import { computed, ref } from 'vue';

const PREVIEW_SIZE_MIN = 12;
const PREVIEW_SIZE_MAX = 48;
const PREVIEW_SIZE_STEP = 4;

const INHERIT_SWATCHES = [
  { class: 'text-grey-900', label: 'grey-900' },
  { class: 'text-primary-600', label: 'primary-600' },
  { class: 'text-danger-600', label: 'danger-600' },
] as const;

const query = ref('');
const previewSize = ref(ICON_SIZE_DEFAULT);

const filteredNames = computed(() => {
  const needle = query.value.trim().toLowerCase();
  if (!needle) {
    return ICON_NAMES;
  }
  return ICON_NAMES.filter((iconName) => iconName.includes(needle));
});
</script>
