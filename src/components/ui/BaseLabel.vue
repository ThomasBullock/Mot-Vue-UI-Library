<template>
  <label :class="LABEL_BASE_CLASSES">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { LABEL_BASE_CLASSES } from '@/constants/ui';

defineOptions({
  name: 'BaseLabel',
});
</script>
