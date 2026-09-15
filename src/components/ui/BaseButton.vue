<template>
  <button :type="type" :class="classes" v-bind="attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import {
  BUTTON_BASE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  BUTTON_VARIANT_DEFAULT,
  type ButtonVariant,
} from "@/constants/ui";
import { computed, useAttrs } from "vue";

// opt out of auto-fallthrough on the component, then reapplied attrs on the native <button>
defineOptions({ inheritAttrs: false });

const { type = "button", variant = BUTTON_VARIANT_DEFAULT } = defineProps<{
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
}>();

const attrs = useAttrs();

const classes = computed(() => {
  return [BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES[variant]].join(" ");
});
</script>
