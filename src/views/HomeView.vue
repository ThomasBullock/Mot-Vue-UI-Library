<template>
  <main class="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
    <h1 class="text-3xl font-bold text-grey-900">Mot Vue UI Library</h1>
    <p class="mt-3 max-w-md text-grey-600">
      A Vue component library by Thomas Bullock — primitives, tokens, and patterns for building
      interfaces.
    </p>
    <RouterLink
      to="/library"
      class="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-800"
    >
      Browse the library
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
