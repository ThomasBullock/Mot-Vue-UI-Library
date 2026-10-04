<template>
  <span :class="CHECKBOX_ROOT_CLASSES">
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input v-bind="$attrs" v-model="model" type="checkbox" :class="CHECKBOX_BASE_CLASSES" />
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" :class="CHECKBOX_TICK_CLASSES">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<script setup lang="ts">
import {
  CHECKBOX_BASE_CLASSES,
  CHECKBOX_ROOT_CLASSES,
  CHECKBOX_TICK_CLASSES,
} from '@/constants/ui';

defineOptions({ inheritAttrs: false });

const model = defineModel<boolean>({ default: false });
</script>
