<template>
  <section>
    <h1 class="text-3xl font-bold text-grey-900">UX Blocks</h1>
    <p class="mt-2 max-w-2xl text-grey-600">
      Ported layout examples. Not library primitives yet — reuse
      <code class="font-mono text-grey-800">BaseIcon</code>
      and existing tokens where the original used PrimeIcons / Prime surface colours.
    </p>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Steppers — Circle</h3>
      <p class="mt-1 text-sm text-grey-500">
        Stacked on small screens, row from <code class="font-mono">md</code>.
      </p>
      <div class="mt-4 overflow-hidden rounded-md border border-grey-200">
        <CircleStepper />
      </div>
    </article>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Steppers — Panels with Borders</h3>
      <p class="mt-1 text-sm text-grey-500">
        Stacked on small screens, row from <code class="font-mono">lg</code>. Progress bar follows
        completed + active.
      </p>
      <div class="mt-4 overflow-hidden rounded-md border border-grey-200">
        <PanelsWithBorders />
      </div>
    </article>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Steppers — Horizontal Panels</h3>
      <p class="mt-1 text-sm text-grey-500">
        Stacked on small screens, row from <code class="font-mono">lg</code>. Active card uses the
        success border; completed shows a check.
      </p>
      <div class="mt-4 overflow-hidden rounded-md border border-grey-200">
        <HorizontalPanels />
      </div>
    </article>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Steppers — With Progress</h3>
      <p class="mt-1 text-sm text-grey-500">
        Window of three titles. Arrow buttons shift the window; bar follows completed + active.
      </p>
      <div class="mt-4 overflow-hidden rounded-md border border-grey-200">
        <ProgressStepper />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import CircleStepper from '@/components/ux-blocks/steppers/CircleStepper.vue';
import HorizontalPanels from '@/components/ux-blocks/steppers/HorizontalPanels.vue';
import PanelsWithBorders from '@/components/ux-blocks/steppers/PanelsWithBorders.vue';
import ProgressStepper from '@/components/ux-blocks/steppers/ProgressStepper.vue';
</script>
