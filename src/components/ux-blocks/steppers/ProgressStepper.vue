<template>
  <div :class="STEPPER_FRAME">
    <div class="mx-auto flex max-w-4xl items-center gap-8">
      <BaseButton
        variant="secondary"
        aria-label="Previous steps"
        :disabled="!canPrev"
        @click="navigatePrev"
      >
        <BaseIcon name="backward" mode="mono" :size="NAV_ICON_SIZE" />
      </BaseButton>

      <div class="flex flex-1 flex-col gap-4">
        <div class="flex items-center justify-center md:hidden">
          <div class="flex-1 text-center font-medium" :class="titleClass(visibleSteps[0] ?? null)">
            {{ visibleSteps[0]?.title }}
          </div>
        </div>

        <div class="hidden items-center justify-between md:flex">
          <div
            v-for="step in visibleSteps"
            :key="step.id"
            class="flex-1 text-center font-medium"
            :class="titleClass(step)"
          >
            {{ step.title }}
          </div>
        </div>

        <div class="h-1.5 overflow-hidden rounded-lg bg-grey-200 dark:bg-grey-700">
          <div
            class="h-full rounded-lg"
            :class="STEP_COMPLETED_TRACK"
            :style="{ width: `${progressPercentage}%` }"
            :data-testid="UX_BLOCKS_TESTID.progressFill"
          />
        </div>
      </div>

      <BaseButton
        variant="secondary"
        aria-label="Next steps"
        :disabled="!canNext"
        @click="navigateNext"
      >
        <BaseIcon name="forward" mode="mono" :size="NAV_ICON_SIZE" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import { ICON_SIZE_PRESETS } from '@/constants/icons';
import {
  STEPPER_FRAME,
  STEPPER_VISIBLE_COUNT,
  STEP_COMPLETED_TRACK,
  STEP_PROGRESS_PARTIAL,
  STEP_TITLE_ACTIVE,
  STEP_TITLE_COMPLETED,
  STEP_TITLE_PENDING,
  UX_BLOCKS_TESTID,
  type ProgressStep,
} from '@/constants/ux-blocks';
import { canShiftWindow, stepProgressPercent, windowStartForActive } from '@/utils/stepper';
import { computed, ref } from 'vue';

const NAV_ICON_SIZE = ICON_SIZE_PRESETS[0];

const steps: ProgressStep[] = [
  { id: 1, title: 'Account Setup', completed: true, active: false },
  { id: 2, title: 'Sign Up', completed: true, active: false },
  { id: 3, title: 'Plan Selection', completed: false, active: true },
  { id: 4, title: 'Billing', completed: false, active: false },
  { id: 5, title: 'Payment', completed: false, active: false },
  { id: 6, title: 'Activation', completed: false, active: false },
];

const currentIndex = ref(
  windowStartForActive(
    steps.findIndex((step) => step.active),
    steps.length,
    STEPPER_VISIBLE_COUNT,
  ),
);

const visibleSteps = computed(() =>
  steps.slice(currentIndex.value, currentIndex.value + STEPPER_VISIBLE_COUNT),
);

const progressPercentage = computed(() => stepProgressPercent(steps, STEP_PROGRESS_PARTIAL));

const canPrev = computed(() =>
  canShiftWindow(currentIndex.value, -1, steps.length, STEPPER_VISIBLE_COUNT),
);

const canNext = computed(() =>
  canShiftWindow(currentIndex.value, 1, steps.length, STEPPER_VISIBLE_COUNT),
);

function titleClass(step: ProgressStep | null): string {
  if (!step) {
    return '';
  }
  if (step.completed) {
    return STEP_TITLE_COMPLETED;
  }
  if (step.active) {
    return STEP_TITLE_ACTIVE;
  }
  return STEP_TITLE_PENDING;
}

function navigateNext() {
  if (canNext.value) {
    currentIndex.value += 1;
  }
}

function navigatePrev() {
  if (canPrev.value) {
    currentIndex.value -= 1;
  }
}
</script>
