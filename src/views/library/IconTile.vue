<template>
  <li class="rounded-md border border-grey-200 bg-white p-3">
    <div class="flex items-center justify-center gap-4 text-grey-800">
      <BaseIcon v-if="!monoOnly" :name="name" :size="size" />
      <BaseIcon :name="name" mode="mono" :size="size" />
    </div>
    <p class="mt-2 text-center font-mono text-xs text-grey-600">{{ name }}</p>
  </li>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue';

const {
  name,
  size,
  monoOnly = false,
} = defineProps<{
  name: string;
  size: number;
  monoOnly?: boolean;
}>();
</script>
