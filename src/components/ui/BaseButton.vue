<template>
  <button :type="type" :class="classes">
    <slot />
  </button>
</template>

<script setup lang="ts">
import {
  BUTTON_BASE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  BUTTON_VARIANT_DEFAULT,
  type ButtonVariant,
} from '@/constants/ui';
import { computed } from 'vue';

const { type = 'button', variant = BUTTON_VARIANT_DEFAULT } = defineProps<{
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
}>();

const classes = computed(() => {
  return [BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES[variant]].join(' ');
});
</script>
