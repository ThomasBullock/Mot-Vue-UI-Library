<template>
  <nav :aria-label="ariaLabel" class="mx-auto flex max-w-4xl items-center gap-8">
    <BaseButton
      variant="secondary"
      aria-label="Previous steps"
      :disabled="!canPrev"
      @click="shiftWindow(-1)"
    >
      <BaseIcon name="backward" mode="mono" :size="NAV_ICON_SIZE" />
    </BaseButton>

    <div class="flex flex-1 flex-col gap-4">
      <ol class="sr-only">
        <li v-for="(step, index) in steps" :key="step.id" :aria-current="ariaCurrentOf(index)">
          <StepTrigger
            :clickable="false"
            :sr-label="stepSrLabel(statusOf(index), index, steps.length)"
          >
            {{ step.title }}
          </StepTrigger>
        </li>
      </ol>

      <div aria-hidden="true" class="flex items-center justify-between">
        <div
          v-for="(step, offset) in visibleSteps"
          :key="step.id"
          class="flex-1 text-center font-medium"
          :class="[
            STEP_TITLE_BY_STATUS[statusOf(windowStart + offset)],
            { 'hidden md:block': offset > 0 },
          ]"
        >
          {{ step.title }}
        </div>
      </div>

      <div
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="Math.round(progress)"
        :aria-valuetext="progressText"
        class="h-1.5 overflow-hidden rounded-lg"
        :class="STEP_PENDING_TRACK"
      >
        <div
          class="h-full rounded-lg motion-safe:transition-[width]"
          :class="STEP_COMPLETED_TRACK"
          :style="{ width: `${progress}%` }"
          :data-testid="UX_BLOCKS_TESTID.progressFill"
        />
      </div>
    </div>

    <BaseButton
      variant="secondary"
      aria-label="Next steps"
      :disabled="!canNext"
      @click="shiftWindow(1)"
    >
      <BaseIcon name="forward" mode="mono" :size="NAV_ICON_SIZE" />
    </BaseButton>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import StepTrigger from '@/components/ux-blocks/steppers/StepTrigger.vue';
import { useStepper } from '@/composables/useStepper';
import { ICON_SIZE_PRESETS } from '@/constants/icons';
import {
  STEPPER_ARIA_LABEL_DEFAULT,
  STEPPER_VISIBLE_COUNT,
  STEP_COMPLETED_TRACK,
  STEP_PENDING_TRACK,
  STEP_PROGRESS_PARTIAL,
  STEP_STATUS_LABEL,
  STEP_TITLE_BY_STATUS,
  UX_BLOCKS_TESTID,
  type StepId,
  type StepperProps,
} from '@/constants/ux-blocks';
import { canShiftWindow, stepPosition, stepSrLabel, windowStartForActive } from '@/utils/stepper';
import { computed, ref, watch } from 'vue';

// Display-only: the window arrows page the visible titles, not the v-model.
const {
  steps,
  finished = false,
  ariaLabel = STEPPER_ARIA_LABEL_DEFAULT,
  visibleCount = STEPPER_VISIBLE_COUNT,
  partialFill = STEP_PROGRESS_PARTIAL,
} = defineProps<
  Omit<StepperProps, 'clickable' | 'linear'> & {
    visibleCount?: number;
    partialFill?: number;
  }
>();

const model = defineModel<StepId | null>({ default: null });

const { activeIndex, statusOf, ariaCurrentOf, progressPercent } = useStepper(() => steps, model, {
  finished: () => finished,
});

const NAV_ICON_SIZE = ICON_SIZE_PRESETS[0];

const windowStart = ref(0);

watch(
  [activeIndex, () => steps.length, () => visibleCount],
  () => {
    windowStart.value = windowStartForActive(activeIndex.value, steps.length, visibleCount);
  },
  { immediate: true },
);

const visibleSteps = computed(() =>
  steps.slice(windowStart.value, windowStart.value + visibleCount),
);

const progress = computed(() => progressPercent(partialFill));

const progressText = computed(() => {
  if (finished) {
    return STEP_STATUS_LABEL.complete;
  }
  if (activeIndex.value < 0) {
    return STEP_STATUS_LABEL.upcoming;
  }
  return stepPosition(activeIndex.value, steps.length);
});

const canPrev = computed(() => canShiftWindow(windowStart.value, -1, steps.length, visibleCount));
const canNext = computed(() => canShiftWindow(windowStart.value, 1, steps.length, visibleCount));

function shiftWindow(delta: number) {
  if (canShiftWindow(windowStart.value, delta, steps.length, visibleCount)) {
    windowStart.value += delta;
  }
}
</script>
