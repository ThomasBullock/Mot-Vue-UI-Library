<template>
  <div :class="STEPPER_FRAME">
    <ul
      class="m-0 flex list-none flex-col gap-8 p-0 lg:flex-row lg:justify-between lg:gap-12 xl:gap-20"
    >
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="relative flex-1 basis-0"
        :class="{ 'mr-0 lg:mr-5': index < steps.length - 1 }"
      >
        <div
          class="z-10 flex items-center gap-4 rounded-2xl border bg-white p-4 dark:bg-grey-900"
          :class="step.active ? STEP_ACTIVE_BORDER : CARD_IDLE"
        >
          <div :class="ICON_WELL">
            <BaseIcon
              :name="step.icon"
              mode="mono"
              :size="STEP_ICON_SIZE"
              class="text-grey-600 dark:text-grey-200"
            />
          </div>
          <div class="flex flex-1 flex-col gap-1">
            <div class="leading-tight font-medium text-grey-900 dark:text-white">
              {{ step.title }}
            </div>
            <span class="text-base leading-tight text-grey-500 dark:text-grey-300">
              {{ step.subtitle }}
            </span>
          </div>
          <BaseIcon
            v-if="step.completed"
            name="check"
            mode="mono"
            :size="CHECK_SIZE"
            :class="STEP_CHECK"
            label="Completed"
          />
        </div>
        <div
          v-if="index < steps.length - 1"
          class="absolute top-1/2 left-full hidden h-px w-full -translate-y-1/2 bg-grey-200 lg:block dark:bg-grey-500"
        />
        <div
          v-if="index < steps.length - 1"
          class="absolute top-full left-1/2 block h-8 w-px bg-grey-200 lg:hidden dark:bg-grey-700"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/ui/BaseIcon.vue';
import { ICON_SIZE_DEFAULT, ICON_SIZE_PRESETS } from '@/constants/icons';
import {
  STEPPER_FRAME,
  STEP_ACTIVE_BORDER,
  STEP_CHECK,
  type PanelStep,
} from '@/constants/ux-blocks';

const STEP_ICON_SIZE = ICON_SIZE_DEFAULT;
const CHECK_SIZE = ICON_SIZE_PRESETS[0];

const CARD_IDLE = 'border-grey-200 dark:border-grey-700';
const ICON_WELL =
  'flex size-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-grey-100 bg-grey-50 dark:border-grey-700 dark:bg-grey-800';

const steps: PanelStep[] = [
  {
    title: 'Account Setup',
    subtitle: 'Set up your account',
    icon: 'user',
    active: false,
    completed: true,
  },
  {
    title: 'Billing',
    subtitle: 'Add Payment',
    icon: 'id-card',
    active: true,
    completed: false,
  },
  {
    title: 'Activation',
    subtitle: 'Start using the platform',
    icon: 'bolt',
    active: false,
    completed: false,
  },
];
</script>
