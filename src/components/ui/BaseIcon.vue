<template>
  <span v-if="glyph" class="inline-flex shrink-0" :style="hostStyle" v-bind="a11yAttrs">
    <component :is="glyph" />
  </span>
</template>

<script setup lang="ts">
import {
  ICON_COLOR_PALETTE,
  ICON_MODE_DEFAULT,
  ICON_MONO_CURRENT,
  ICON_MONO_UNUSED,
  ICON_SIZE_DEFAULT,
  type IconMode,
} from '@/constants/icons';
import { computed, watch } from 'vue';
import { getIconGlyph } from './iconGlyphs';

const {
  name,
  size = ICON_SIZE_DEFAULT,
  mode = ICON_MODE_DEFAULT,
  color = null,
  color0 = null,
  color1 = null,
  color2 = null,
  color3 = null,
  label = null,
} = defineProps<{
  name: string;
  size?: number;
  mode?: IconMode;
  color?: string | null;
  color0?: string | null;
  color1?: string | null;
  color2?: string | null;
  color3?: string | null;
  label?: string | null;
}>();

const glyph = computed(() => getIconGlyph(name));

const a11yAttrs = computed(() => {
  if (label) {
    return { role: 'img', 'aria-label': label };
  }
  return { 'aria-hidden': true };
});

watch(
  () => name,
  (iconName) => {
    if (!getIconGlyph(iconName) && import.meta.env.DEV) {
      console.warn(`[BaseIcon] unknown icon name: "${iconName}"`);
    }
  },
  { immediate: true },
);

const hostStyle = computed(() => {
  const sizePx = `${size}px`;
  const style: Record<string, string> = {
    width: sizePx,
    height: sizePx,
  };

  if (mode === 'mono') {
    if (color) {
      style.color = color;
    }
    style['--color1'] = color1 ?? ICON_MONO_CURRENT;
    style['--color2'] = color2 ?? ICON_MONO_CURRENT;
    style['--color0'] = color0 ?? ICON_MONO_UNUSED;
    style['--color3'] = color3 ?? ICON_MONO_UNUSED;
  } else {
    style.color = color ?? ICON_COLOR_PALETTE.color;
    style['--color0'] = color0 ?? ICON_COLOR_PALETTE.color0;
    style['--color1'] = color1 ?? ICON_COLOR_PALETTE.color1;
    style['--color2'] = color2 ?? ICON_COLOR_PALETTE.color2;
    style['--color3'] = color3 ?? ICON_COLOR_PALETTE.color3;
  }

  return style;
});
</script>

<style scoped>
span :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
