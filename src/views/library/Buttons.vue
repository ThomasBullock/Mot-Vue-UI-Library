<template>
  <div>
    <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-6">Button Components</h1>
    <p class="text-surface-600 dark:text-surface-400">
      This section will showcase Button components and variations.
    </p>

    <h3>Buttons</h3>
    <div class="flex justify-start gap-2">
      <BaseButton class="mt-4" id="foo">Primary Button</BaseButton>
      <BaseButton variant="secondary" class="mt-4" id="foo">Secondary Button</BaseButton>
      <BaseButton variant="secondary-outline" class="mt-4" id="foo">Secondary Outline</BaseButton>
      <BaseButton variant="success" class="mt-4" id="foo">Success Button</BaseButton>
      <BaseButton variant="danger" class="mt-4" id="foo">Danger Button</BaseButton>

      <BaseButton class="mt-4" id="foo" disabled>Disabled Button</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
</script>
