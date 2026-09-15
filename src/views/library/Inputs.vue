<template>
  <div>
    <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-6">Input Components</h1>
    <p class="text-surface-600 dark:text-surface-400">
      This section will showcase input components and variations.
    </p>

    <h3>Inputs</h3>
    <div class="flex justify-start gap-2">
      <BaseInput class="mt-4" id="foo" v-model="textInput" />
      <BaseInput
        class="mt-4"
        id="input-invalid"
        v-model="invalidInput"
        placeholder="Error"
        aria-invalid="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/ui/BaseInput.vue";
import { ref } from "vue";

const textInput = ref("");
const invalidInput = ref("");
</script>
