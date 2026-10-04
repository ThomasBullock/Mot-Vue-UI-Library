<template>
  <nav :aria-label="ariaLabel">
    <ol
      class="m-0 flex list-none flex-col gap-8 p-0 lg:flex-row lg:justify-between lg:gap-12 xl:gap-20"
    >
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="group relative flex flex-1 basis-0 lg:mr-5 lg:last:mr-0"
        :aria-current="ariaCurrentOf(index)"
      >
        <StepTrigger
          :clickable="clickable"
          :disabled="!canGoTo(index)"
          :sr-label="stepSrLabel(statusOf(index), index, steps.length)"
          class="z-10 flex flex-1 items-center gap-4 rounded-2xl border bg-white p-4 dark:bg-grey-900"
          :class="statusOf(index) === STEP_STATUS.current ? STEP_ACTIVE_BORDER : CARD_IDLE"
          @select="goTo(index)"
        >
          <span :class="[STEP_ICON_WELL, STEP_ICON_WELL_IDLE]">
            <BaseIcon
              v-if="step.icon"
              :name="step.icon"
              mode="mono"
              :size="STEP_ICON_SIZE"
              class="text-grey-600 dark:text-grey-200"
            />
          </span>
          <span class="flex flex-1 flex-col gap-1">
            <span class="leading-tight font-medium text-grey-900 dark:text-white">
              {{ step.title }}
            </span>
            <span
              v-if="step.description"
              class="text-base leading-tight text-grey-500 dark:text-grey-300"
            >
              {{ step.description }}
            </span>
          </span>
          <BaseIcon
            v-if="statusOf(index) === STEP_STATUS.complete"
            name="check"
            mode="mono"
            :size="CHECK_SIZE"
            :class="STEP_CHECK"
            label="Completed"
          />
        </StepTrigger>
        <div
          class="absolute top-1/2 left-full hidden h-px w-full -translate-y-1/2 group-last:invisible lg:block"
          :class="STEP_PENDING_TRACK"
        />
        <div
          class="absolute top-full left-1/2 block h-8 w-px group-last:invisible lg:hidden"
          :class="STEP_PENDING_TRACK"
        />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue';
import StepTrigger from '@/components/ux-blocks/steppers/StepTrigger.vue';
import { useStepper } from '@/composables/useStepper';
import { ICON_SIZE_PRESETS } from '@/constants/icons';
import {
  STEPPER_ARIA_LABEL_DEFAULT,
  STEP_ACTIVE_BORDER,
  STEP_CHECK,
  STEP_ICON_SIZE,
  STEP_ICON_WELL,
  STEP_ICON_WELL_IDLE,
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

const CHECK_SIZE = ICON_SIZE_PRESETS[0];
const CARD_IDLE = 'border-grey-200 dark:border-grey-700';
</script>
