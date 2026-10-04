<template>
  <div :class="[CIRCLE_BASE, completed ? CIRCLE_COMPLETED : CIRCLE_PENDING]">
    <BaseIcon
      v-if="completed"
      name="check"
      mode="mono"
      :size="STEP_ICON_SIZE"
      class="step-check text-white"
    />
    <BaseIcon
      v-else-if="icon"
      :name="icon"
      mode="mono"
      :size="STEP_ICON_SIZE"
      class="text-grey-600 dark:text-grey-300"
    />
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue';
import { STEP_COMPLETED_SURFACE, STEP_ICON_SIZE } from '@/constants/ux-blocks';

const { completed, icon } = defineProps<{
  completed: boolean;
  icon: string | null;
}>();

const CIRCLE_BASE =
  'z-10 flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border leading-none';
const CIRCLE_COMPLETED = STEP_COMPLETED_SURFACE;
const CIRCLE_PENDING = 'border-grey-200 bg-grey-100 dark:border-grey-700 dark:bg-grey-800';
</script>

<style scoped>
/* Check.vue ships a circled glyph; this marker already draws the circle. */
:deep(.step-check svg circle) {
  display: none;
}
</style>
