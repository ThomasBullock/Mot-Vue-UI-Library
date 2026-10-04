import { STEP_STATUS, type Step, type StepId, type StepStatus } from '@/constants/ux-blocks';
import { stepProgressPercent } from '@/utils/stepper';
import { computed, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

type UseStepperOptions = {
  linear?: MaybeRefOrGetter<boolean>;
  finished?: MaybeRefOrGetter<boolean>;
};

// Position + status logic shared by every stepper. `model` holds the current
// step id; status is derived from position, never stored per step.
export function useStepper(
  steps: MaybeRefOrGetter<readonly Step[]>,
  model: Ref<StepId | null | undefined>,
  { linear = true, finished = false }: UseStepperOptions = {},
) {
  const total = computed(() => toValue(steps).length);
  const activeIndex = computed(() => toValue(steps).findIndex((step) => step.id === model.value));
  const isFirst = computed(() => activeIndex.value <= 0);
  const isLast = computed(() => activeIndex.value === total.value - 1);

  function statusOf(index: number): StepStatus {
    if (toValue(finished) || index < activeIndex.value) {
      return STEP_STATUS.complete;
    }
    return index === activeIndex.value ? STEP_STATUS.current : STEP_STATUS.upcoming;
  }

  // undefined, not null: Vue's aria-current typing rejects null.
  function ariaCurrentOf(index: number): 'step' | undefined {
    return statusOf(index) === STEP_STATUS.current ? 'step' : undefined;
  }

  function canGoTo(index: number): boolean {
    if (index < 0 || index >= total.value) {
      return false;
    }
    return !toValue(linear) || index <= activeIndex.value;
  }

  function setIndex(index: number) {
    const step = toValue(steps)[index];
    if (step) {
      model.value = step.id;
    }
  }

  function goTo(index: number) {
    if (canGoTo(index)) {
      setIndex(index);
    }
  }

  function next() {
    setIndex(activeIndex.value + 1);
  }

  function prev() {
    if (!isFirst.value) {
      setIndex(activeIndex.value - 1);
    }
  }

  function progressPercent(partialFill: number): number {
    return stepProgressPercent(
      toValue(steps).map((_, index) => ({
        completed: statusOf(index) === STEP_STATUS.complete,
        active: statusOf(index) === STEP_STATUS.current,
      })),
      partialFill,
    );
  }

  return {
    total,
    activeIndex,
    isFirst,
    isLast,
    statusOf,
    ariaCurrentOf,
    canGoTo,
    goTo,
    next,
    prev,
    progressPercent,
  };
}
