<template>
  <div :class="STEPPER_FRAME">
    <div class="mx-auto flex max-w-xs flex-col md:hidden">
      <div v-for="(step, index) in steps" :key="step.title" class="relative flex items-start gap-4">
        <div class="z-10 flex flex-col items-center">
          <CircleStepMarker :completed="step.completed" :icon="step.icon" />
        </div>

        <div
          v-if="index < steps.length - 1"
          class="absolute top-10 bottom-0 left-5 w-px"
          :class="step.completed ? CONNECTOR_COMPLETED : CONNECTOR_PENDING"
        />

        <div
          class="flex flex-1 flex-col gap-1 pb-12"
          :class="{ 'pb-0': index === steps.length - 1 }"
        >
          <div class="text-base leading-normal font-medium text-grey-900 dark:text-white">
            {{ step.title }}
          </div>
          <div class="text-base leading-normal text-grey-500 dark:text-grey-400">
            {{ step.description }}
          </div>
        </div>
      </div>
    </div>

    <div class="hidden flex-row md:flex">
      <div
        v-for="(step, index) in steps"
        :key="step.title"
        class="flex flex-1 flex-col items-center gap-4"
      >
        <div class="flex w-full items-center">
          <CircleStepMarker :completed="step.completed" :icon="step.icon" />
          <div
            v-if="index < steps.length - 1"
            class="h-0.5 flex-1"
            :class="step.completed ? CONNECTOR_COMPLETED : CONNECTOR_PENDING"
          />
        </div>
        <div class="flex w-full flex-col gap-1">
          <div class="text-base leading-normal font-medium text-grey-900 dark:text-white">
            {{ step.title }}
          </div>
          <div class="text-base leading-normal text-grey-500 dark:text-grey-400">
            {{ step.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleStepMarker from '@/components/ux-blocks/steppers/CircleStepMarker.vue';
import { STEPPER_FRAME, STEP_COMPLETED_TRACK } from '@/constants/ux-blocks';

const CONNECTOR_COMPLETED = STEP_COMPLETED_TRACK;
const CONNECTOR_PENDING = 'bg-grey-200 dark:bg-grey-700';

type CircleStep = {
  title: string;
  description: string;
  completed: boolean;
  icon: string;
};

const steps: CircleStep[] = [
  {
    title: 'Sign Up',
    description: 'Create account',
    completed: true,
    icon: 'user',
  },
  {
    title: 'Plan Selection',
    description: 'Choose your plan',
    completed: true,
    icon: 'clipboard',
  },
  {
    title: 'Billing',
    description: 'Add payment',
    completed: false,
    icon: 'id-card',
  },
  {
    title: 'Activation',
    description: 'Start using the platform',
    completed: false,
    icon: 'sparkles',
  },
];
</script>
