<template>
  <section>
    <h1 class="text-3xl font-bold text-grey-900">Slots</h1>
    <p class="mt-2 max-w-2xl text-grey-600">
      Slot content always compiles in the parent, even when it renders inside the child. A plain
      slot therefore cannot see the child’s data. A scoped slot (Vue 3 slot props) can, but only the
      values the child explicitly passes.
    </p>

    <div class="mt-6">
      <RenderScopeDemo />
    </div>
  </section>
</template>

<script setup lang="ts">
import RenderScopeDemo from '@/components/slots/RenderScopeDemo.vue';
</script>
