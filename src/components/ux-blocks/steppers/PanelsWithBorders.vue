<template>
  <nav :aria-label="ariaLabel" class="relative rounded-lg bg-white dark:bg-grey-950">
    <div
      class="absolute bottom-0 left-0 z-20 hidden h-0.5 lg:block"
      :class="fillClass(PROGRESS_PARTIAL_X)"
      :style="{ width: progressWidth }"
      :data-testid="UX_BLOCKS_TESTID.progressFill"
    />
    <div
      class="absolute bottom-0 left-0 hidden h-0.5 w-full lg:block"
      :class="STEP_PENDING_TRACK"
    />

    <div
      class="absolute top-0 bottom-0 left-4 z-20 w-0.5 lg:hidden"
      :class="fillClass(PROGRESS_PARTIAL_Y)"
      :style="{ height: progressWidth }"
      :data-testid="UX_BLOCKS_TESTID.progressFill"
    />
    <div class="absolute top-0 bottom-0 left-4 w-0.5 lg:hidden" :class="STEP_PENDING_TRACK" />

    <ol class="m-0 flex list-none flex-col p-0 lg:flex-row">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="flex flex-1"
        :aria-current="ariaCurrentOf(index)"
      >
        <StepTrigger
          :clickable="clickable"
          :disabled="!canGoTo(index)"
          :sr-label="stepSrLabel(statusOf(index), index, steps.length)"
          class="flex flex-1 items-center gap-4 p-4 pl-8 lg:pl-4"
          @select="goTo(index)"
        >
          <span
            :class="[
              STEP_ICON_WELL,
              isHighlighted(index) ? STEP_COMPLETED_SURFACE : STEP_ICON_WELL_IDLE,
            ]"
          >
            <BaseIcon
              v-if="step.icon"
              :name="step.icon"
              mode="mono"
              :size="STEP_ICON_SIZE"
              :class="isHighlighted(index) ? ICON_HIGHLIGHT : ICON_IDLE"
            />
          </span>
          <span class="flex flex-1 flex-col gap-1">
            <span class="leading-tight font-medium" :class="STEP_TITLE_BY_STATUS[statusOf(index)]">
              {{ step.title }}
            </span>
            <span
              v-if="step.description"
              class="text-base leading-tight text-grey-500 dark:text-grey-300"
            >
              {{ step.description }}
            </span>
          </span>
        </StepTrigger>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue';
import StepTrigger from '@/components/ux-blocks/steppers/StepTrigger.vue';
import { useStepper } from '@/composables/useStepper';
import {
  STEPPER_ARIA_LABEL_DEFAULT,
  STEP_COMPLETED_SURFACE,
  STEP_COMPLETED_TRACK,
  STEP_ICON_SIZE,
  STEP_ICON_WELL,
  STEP_ICON_WELL_IDLE,
  STEP_PENDING_TRACK,
  STEP_PROGRESS_PARTIAL,
  STEP_STATUS,
  STEP_TITLE_BY_STATUS,
  UX_BLOCKS_TESTID,
  type StepId,
  type StepperProps,
} from '@/constants/ux-blocks';
import { stepSrLabel } from '@/utils/stepper';
import { computed } from 'vue';

const {
  steps,
  clickable = false,
  linear = true,
  finished = false,
  ariaLabel = STEPPER_ARIA_LABEL_DEFAULT,
} = defineProps<StepperProps>();

const model = defineModel<StepId | null>({ default: null });

const { statusOf, ariaCurrentOf, canGoTo, goTo, progressPercent } = useStepper(() => steps, model, {
  linear: () => linear,
  finished: () => finished,
});

const PROGRESS_PARTIAL_X = 'bg-linear-to-r from-success-500 from-70% to-transparent';
const PROGRESS_PARTIAL_Y = 'bg-linear-to-b from-success-500 from-70% to-transparent';
const ICON_HIGHLIGHT = 'text-white';
const ICON_IDLE = 'text-grey-600 dark:text-grey-400';

const progress = computed(() => progressPercent(STEP_PROGRESS_PARTIAL));
const progressWidth = computed(() => `${progress.value}%`);

// Solid once every step is done; otherwise fade out past the current step.
function fillClass(partial: string): string {
  return progress.value === 100 ? STEP_COMPLETED_TRACK : partial;
}

function isHighlighted(index: number): boolean {
  return statusOf(index) !== STEP_STATUS.upcoming;
}
</script>
