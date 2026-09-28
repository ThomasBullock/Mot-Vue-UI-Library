<template>
  <div :class="STEPPER_FRAME">
    <div class="relative flex flex-col rounded-lg bg-white lg:flex-row dark:bg-grey-950">
      <div
        class="absolute bottom-0 left-0 z-20 hidden h-0.5 lg:block"
        :class="allCompleted ? STEP_COMPLETED_TRACK : PROGRESS_PARTIAL_X"
        :style="{ width: progressPercent }"
      />
      <div
        class="absolute bottom-0 left-0 hidden h-0.5 w-full bg-grey-200 lg:block dark:bg-grey-700"
      />

      <div
        class="absolute top-0 bottom-0 left-4 z-20 w-0.5 lg:hidden"
        :class="allCompleted ? STEP_COMPLETED_TRACK : PROGRESS_PARTIAL_Y"
        :style="{ height: progressPercent }"
      />
      <div class="absolute top-0 bottom-0 left-4 w-0.5 bg-grey-200 lg:hidden dark:bg-grey-700" />

      <div
        v-for="step in steps"
        :key="step.title"
        class="flex flex-1 items-center gap-4 p-4 pl-8 lg:pl-4"
      >
        <div :class="[PANEL_BASE, isHighlighted(step) ? STEP_COMPLETED_SURFACE : PANEL_IDLE]">
          <BaseIcon
            :name="step.icon"
            mode="mono"
            :size="STEP_ICON_SIZE"
            :class="isHighlighted(step) ? ICON_HIGHLIGHT : ICON_IDLE"
          />
        </div>
        <div class="flex flex-1 flex-col gap-1">
          <span
            class="leading-tight font-medium"
            :class="step.active ? STEP_TITLE_ACTIVE : STEP_TITLE_IDLE"
          >
            {{ step.title }}
          </span>
          <span class="text-base leading-tight text-grey-500 dark:text-grey-300">
            {{ step.subtitle }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue';
import { ICON_SIZE_DEFAULT } from '@/constants/icons';
import {
  STEPPER_FRAME,
  STEP_COMPLETED_SURFACE,
  STEP_COMPLETED_TRACK,
  STEP_TITLE_ACTIVE,
  STEP_TITLE_IDLE,
  type PanelStep,
} from '@/constants/ux-blocks';
import { computed } from 'vue';

const STEP_ICON_SIZE = ICON_SIZE_DEFAULT;

const PANEL_BASE =
  'flex size-11 min-w-11 items-center justify-center rounded-lg border leading-none';
const PANEL_IDLE = 'border-grey-100 bg-grey-50 dark:border-grey-700 dark:bg-grey-800';
const PROGRESS_PARTIAL_X = 'bg-linear-to-r from-success-500 from-70% to-transparent';
const PROGRESS_PARTIAL_Y = 'bg-linear-to-b from-success-500 from-70% to-transparent';
const ICON_HIGHLIGHT = 'text-white';
const ICON_IDLE = 'text-grey-600 dark:text-grey-400';

function isHighlighted(step: PanelStep): boolean {
  return step.completed || step.active;
}

const steps: PanelStep[] = [
  {
    title: 'Sign Up',
    subtitle: 'Create Account',
    icon: 'id-card',
    active: false,
    completed: true,
  },
  {
    title: 'Plan Selection',
    subtitle: 'Choose your plan',
    icon: 'bolt',
    active: false,
    completed: true,
  },
  {
    title: 'Billing',
    subtitle: 'Add payment',
    icon: 'calculator',
    active: true,
    completed: false,
  },
  {
    title: 'Activation',
    subtitle: 'Start using the platform',
    icon: 'sparkles',
    active: false,
    completed: false,
  },
];

const progressPercent = computed(() => {
  const totalSteps = steps.length;
  const completedCount = steps.filter((step) => step.completed).length;
  let percentage = (completedCount / totalSteps) * 100;

  const activeStep = steps.find((step) => step.active);
  if (activeStep && !activeStep.completed) {
    percentage += (0.5 / totalSteps) * 100 + 10;
  }

  return `${percentage}%`;
});

const allCompleted = computed(() => steps.every((step) => step.completed));
</script>
