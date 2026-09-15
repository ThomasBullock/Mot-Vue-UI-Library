<template>
  <div class="rounded-lg border-2 border-primary-700 bg-primary-100 p-4">
    <div class="mb-3 flex items-baseline justify-between gap-2">
      <p class="text-xs font-semibold uppercase tracking-wide text-primary-900">Child scope</p>
      <p class="font-mono text-xs text-primary-800">ScopedSlotHost.vue</p>
    </div>

    <label class="block text-sm font-medium text-grey-900">
      secret
      <input v-model="secret" :class="inputClasses" />
    </label>

    <div class="mt-3 flex items-center gap-2">
      <p class="text-sm font-medium text-grey-900">count: {{ count }}</p>
      <BaseButton variant="secondary-outline" @click="count += 1">+1</BaseButton>
    </div>

    <div class="mt-4">
      <p class="mb-2 text-xs font-medium text-primary-900">Slot outlet — passes secret, count</p>
      <!-- Same parent compile scope, but the child exposes data as slot props. -->
      <slot :secret="secret" :count="count" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import { CONTROL_BASE_CLASSES, CONTROL_FOCUS_CLASSES, CONTROL_SIZE_CLASSES } from '@/constants/ui';
import { ref } from 'vue';

defineSlots<{
  default(props: { secret: string; count: number }): unknown;
}>();

const secret = ref('child-secret');
const count = ref(0);

const inputClasses = [
  'mt-1 w-full border-grey-300 bg-white px-3 text-grey-900',
  CONTROL_BASE_CLASSES,
  CONTROL_SIZE_CLASSES,
  CONTROL_FOCUS_CLASSES,
].join(' ');
</script>
