<template>
  <div class="flex flex-col h-full">
    <!-- Horizontal Navigation Menu -->
    <div class="border-b border-grey-200 bg-grey-50">
      <nav class="flex gap-1 px-6 py-2 overflow-x-auto">
        <RouterLink
          :to="{ name: 'ColourPallettes' }"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap"
          active-class="bg-primary text-grey-950"
          :class="
            $route.name === 'ColourPallettes'
              ? 'bg-primary text-grey-950'
              : 'text-grey-700 hover:bg-grey-100'
          "
        >
          Colours
        </RouterLink>
        <RouterLink
          :to="{ name: 'Buttons' }"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap"
          active-class="bg-primary text-grey-950"
          :class="
            $route.name === 'Buttons'
              ? 'bg-primary text-grey-950'
              : 'text-grey-700 hover:bg-grey-100'
          "
        >
          Button
        </RouterLink>
        <RouterLink
          :to="{ name: 'Inputs' }"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap"
          active-class="bg-primary text-grey-950"
          :class="
            $route.name === 'Inputs'
              ? 'bg-primary text-grey-950'
              : 'text-grey-700 hover:bg-grey-100'
          "
        >
          Input
        </RouterLink>
        <RouterLink
          :to="{ name: 'Slots' }"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 whitespace-nowrap"
          active-class="bg-primary text-grey-950"
          :class="
            $route.name === 'Slots' ? 'bg-primary text-grey-950' : 'text-grey-700 hover:bg-grey-100'
          "
        >
          Slots
        </RouterLink>
      </nav>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-auto p-6">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
