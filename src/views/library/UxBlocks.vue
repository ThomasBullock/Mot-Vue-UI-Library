<template>
  <section>
    <h1 class="text-3xl font-bold text-grey-900">UX Blocks</h1>
    <p class="mt-2 max-w-2xl text-grey-600">
      Steppers take <code class="font-mono text-grey-800">steps</code> +
      <code class="font-mono text-grey-800">v-model</code> (current step id). Status is derived from
      position. One model drives every demo below.
    </p>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <BaseButton variant="secondary-outline" :disabled="isFirst" @click="prev">Back</BaseButton>
      <BaseButton v-if="!isLast" @click="next">Next</BaseButton>
      <BaseButton v-else variant="success" :disabled="finished" @click="finished = true">
        Finish
      </BaseButton>
      <BaseButton variant="secondary-outline" @click="reset">Reset</BaseButton>
      <label class="flex items-center gap-2 text-sm text-grey-700">
        <input v-model="clickable" type="checkbox" />
        Clickable steps (linear)
      </label>
    </div>

    <article v-for="demo in DEMOS" :key="demo.title" class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Steppers — {{ demo.title }}</h3>
      <p class="mt-1 text-sm text-grey-500">{{ demo.note }}</p>
      <div class="mt-4 overflow-hidden rounded-md border border-grey-200" :class="STEPPER_FRAME">
        <component
          :is="demo.component"
          v-model="current"
          :steps="STEPPER_DEMO_STEPS"
          :clickable="clickable"
          :finished="finished"
        />
      </div>
    </article>

    <article class="mt-10">
      <h3 class="text-lg font-semibold text-grey-900">Steppers — With Progress</h3>
      <p class="mt-1 text-sm text-grey-500">
        Window of three titles. Arrows page the window; it re-centres when the model changes.
      </p>
      <div class="mt-4 overflow-hidden rounded-md border border-grey-200" :class="STEPPER_FRAME">
        <ProgressStepper v-model="currentLong" :steps="STEPPER_DEMO_STEPS_LONG" />
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import CircleStepper from '@/components/ux-blocks/steppers/CircleStepper.vue';
import HorizontalPanels from '@/components/ux-blocks/steppers/HorizontalPanels.vue';
import PanelsWithBorders from '@/components/ux-blocks/steppers/PanelsWithBorders.vue';
import ProgressStepper from '@/components/ux-blocks/steppers/ProgressStepper.vue';
import { useStepper } from '@/composables/useStepper';
import {
  STEPPER_DEMO_STEPS,
  STEPPER_DEMO_STEPS_LONG,
  STEPPER_FRAME,
  type StepId,
} from '@/constants/ux-blocks';
import { ref, watch } from 'vue';

const DEMOS = [
  { title: 'Circle', note: 'Stacked on small screens, row from md.', component: CircleStepper },
  {
    title: 'Panels with Borders',
    note: 'Stacked on small screens, row from lg. Progress bar follows the current step.',
    component: PanelsWithBorders,
  },
  {
    title: 'Horizontal Panels',
    note: 'Stacked on small screens, row from lg. Current card uses the success border.',
    component: HorizontalPanels,
  },
];

const firstId = (steps: readonly { id: StepId }[]) => steps[0]?.id ?? null;

const current = ref<StepId | null>(firstId(STEPPER_DEMO_STEPS));
const finished = ref(false);
const clickable = ref(false);

const { isFirst, isLast, next, prev } = useStepper(STEPPER_DEMO_STEPS, current);

// Mirror the main flow onto the long list where ids overlap.
const currentLong = ref<StepId | null>(current.value);
watch(current, (id) => {
  currentLong.value = id;
});

watch(current, () => {
  finished.value = false;
});

function reset() {
  current.value = firstId(STEPPER_DEMO_STEPS);
  finished.value = false;
}
</script>
