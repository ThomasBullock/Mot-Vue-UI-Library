<template>
  <div class="flex h-full flex-col">
    <div class="border-b border-grey-200 bg-grey-50">
      <nav class="flex gap-1 overflow-x-auto px-6 py-2">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.name"
          :to="{ name: item.name }"
          class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150"
          active-class="bg-primary text-white"
          :class="
            $route.name === item.name ? 'bg-primary text-white' : 'text-grey-700 hover:bg-grey-100'
          "
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>

    <div class="flex-1 overflow-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const NAV_ITEMS = [
  { name: 'ColourPallettes', label: 'Colours' },
  { name: 'Buttons', label: 'Button' },
  { name: 'Inputs', label: 'Input' },
  { name: 'Icons', label: 'Icons' },
  { name: 'Slots', label: 'Slots' },
] as const;
</script>
