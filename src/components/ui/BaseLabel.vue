<template>
  <label :class="LABEL_BASE_CLASSES" v-bind="attrs">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { LABEL_BASE_CLASSES } from "@/constants/ui";
import { useAttrs } from "vue";

defineOptions({
  name: "BaseLabel",
  inheritAttrs: false,
});

const attrs = useAttrs();
</script>
