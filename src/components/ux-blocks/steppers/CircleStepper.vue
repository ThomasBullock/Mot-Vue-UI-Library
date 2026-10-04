<template>
  <nav :aria-label="ariaLabel">
    <ol class="m-0 mx-auto flex max-w-xs list-none flex-col p-0 md:max-w-none md:flex-row">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="group relative flex items-start gap-4 pb-12 last:pb-0 md:flex-1 md:flex-col md:pb-0"
        :aria-current="ariaCurrentOf(index)"
      >
        <div class="flex items-center md:w-full">
          <CircleStepMarker
            :completed="statusOf(index) === STEP_STATUS.complete"
            :icon="step.icon ?? null"
          />
          <div
            class="hidden h-0.5 flex-1 group-last:invisible md:block"
            :class="connectorClass(index)"
          />
        </div>
        <div
          class="absolute top-10 bottom-0 left-5 w-px group-last:invisible md:hidden"
          :class="connectorClass(index)"
        />
        <StepTrigger
          :clickable="clickable"
          :disabled="!canGoTo(index)"
          :sr-label="stepSrLabel(statusOf(index), index, steps.length)"
          class="flex flex-1 flex-col gap-1 md:w-full"
          @select="goTo(index)"
        >
          <span class="text-base leading-normal font-medium text-grey-900 dark:text-white">
            {{ step.title }}
          </span>
          <span
            v-if="step.description"
            class="text-base leading-normal text-grey-500 dark:text-grey-400"
          >
            {{ step.description }}
          </span>
        </StepTrigger>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import CircleStepMarker from '@/components/ux-blocks/steppers/CircleStepMarker.vue';
import StepTrigger from '@/components/ux-blocks/steppers/StepTrigger.vue';
import { useStepper } from '@/composables/useStepper';
import {
  STEPPER_ARIA_LABEL_DEFAULT,
  STEP_COMPLETED_TRACK,
  STEP_PENDING_TRACK,
  STEP_STATUS,
  type StepId,
  type StepperProps,
} from '@/constants/ux-blocks';
import { stepSrLabel } from '@/utils/stepper';

const {
  steps,
  clickable = false,
  linear = true,
  finished = false,
  ariaLabel = STEPPER_ARIA_LABEL_DEFAULT,
} = defineProps<StepperProps>();

const model = defineModel<StepId | null>({ default: null });

const { statusOf, ariaCurrentOf, canGoTo, goTo } = useStepper(() => steps, model, {
  linear: () => linear,
  finished: () => finished,
});

function connectorClass(index: number): string {
  return statusOf(index) === STEP_STATUS.complete ? STEP_COMPLETED_TRACK : STEP_PENDING_TRACK;
}
</script>
