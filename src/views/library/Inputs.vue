<template>
  <div>
    <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 mb-6">Input Components</h1>
    <p class="text-surface-600 dark:text-surface-400">
      This section will showcase input components and variations.
    </p>

    <h3>Inputs</h3>
    <div class="mt-4 flex max-w-sm flex-col gap-4">
      <div>
        <BaseLabel for="library-input-text">Text</BaseLabel>
        <BaseInput id="library-input-text" v-model="textInput" class="mt-1" />
      </div>

      <div>
        <BaseLabel for="library-input-invalid">With error</BaseLabel>
        <BaseInput
          id="library-input-invalid"
          v-model="invalidInput"
          class="mt-1"
          placeholder="Error"
          aria-invalid="true"
        />
      </div>

      <div>
        <BaseLabel for="library-input-search" class="sr-only">Search</BaseLabel>
        <BaseInput
          id="library-input-search"
          v-model="searchInput"
          class="mt-1"
          type="search"
          placeholder="Search…"
        />
      </div>

      <div>
        <BaseLabel for="salary" class="sr-only">Salary</BaseLabel>
        <BaseCurrencyInput id="salary" v-model="salary" class="mt-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseLabel from '@/components/ui/BaseLabel.vue';
import BaseCurrencyInput from '@/components/ui/BaseCurrencyInput.vue';
import { ref } from 'vue';

const textInput = ref('');
const invalidInput = ref('');
const searchInput = ref('');
const salary = ref(null);
</script>
