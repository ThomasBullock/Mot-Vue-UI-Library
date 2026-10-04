<template>
  <button
    v-if="clickable"
    type="button"
    :class="STEP_TRIGGER_BUTTON"
    :disabled="disabled"
    @click="emit('select')"
  >
    <span class="sr-only">{{ srLabel }}</span>
    <slot />
  </button>
  <div v-else>
    <span class="sr-only">{{ srLabel }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { STEP_TRIGGER_BUTTON } from '@/constants/ux-blocks';

// Step content wrapper: a button when the stepper is clickable, else a plain
// block. Carries the SR position/status so a button's name includes it.
const {
  clickable,
  disabled = false,
  srLabel,
} = defineProps<{
  clickable: boolean;
  disabled?: boolean;
  srLabel: string;
}>();

const emit = defineEmits<{ select: [] }>();
</script>
