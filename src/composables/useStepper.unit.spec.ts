import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useStepper } from '@/composables/useStepper';
import {
  STEP_PROGRESS_PARTIAL,
  STEPPER_DEMO_STEPS as STEPS,
  type StepId,
} from '@/constants/ux-blocks';
import { stepProgressPercent } from '@/utils/stepper';

const [FIRST, SECOND, THIRD, LAST] = STEPS.map((step) => step.id);

function setup(current: StepId | null, options: { linear?: boolean; finished?: boolean } = {}) {
  const model = ref<StepId | null>(current);
  return { model, ...useStepper(() => STEPS, model, options) };
}

describe('useStepper', () => {
  it('derives status from the current step position', () => {
    const { statusOf } = setup(THIRD!);

    expect(STEPS.map((_, index) => statusOf(index))).toEqual([
      'complete',
      'complete',
      'current',
      'upcoming',
    ]);
  });

  it('ariaCurrentOf marks only the current step', () => {
    const { ariaCurrentOf } = setup(SECOND!);

    expect(STEPS.map((_, index) => ariaCurrentOf(index))).toEqual([
      undefined,
      'step',
      undefined,
      undefined,
    ]);
  });

  it('marks every step upcoming when the model matches no step', () => {
    const { statusOf, activeIndex } = setup(null);

    expect(activeIndex.value).toBe(-1);
    expect(STEPS.map((_, index) => statusOf(index))).toEqual(Array(STEPS.length).fill('upcoming'));
  });

  it('marks every step complete when finished', () => {
    const { statusOf } = setup(THIRD!, { finished: true });

    expect(STEPS.map((_, index) => statusOf(index))).toEqual(Array(STEPS.length).fill('complete'));
  });

  it('next / prev move the model and stop at the ends', () => {
    const { model, next, prev } = setup(FIRST!);

    prev();
    expect(model.value).toBe(FIRST);

    next();
    expect(model.value).toBe(SECOND);

    next();
    next();
    next();
    expect(model.value).toBe(LAST);
  });

  it('reports isFirst / isLast', () => {
    const { model, isFirst, isLast } = setup(FIRST!);

    expect(isFirst.value).toBe(true);
    expect(isLast.value).toBe(false);

    model.value = LAST!;
    expect(isFirst.value).toBe(false);
    expect(isLast.value).toBe(true);
  });

  it('linear: only current and earlier steps are reachable', () => {
    const { canGoTo } = setup(SECOND!, { linear: true });

    expect([0, 1, 2, 3].map(canGoTo)).toEqual([true, true, false, false]);
  });

  it('non-linear: any step is reachable', () => {
    const { canGoTo } = setup(FIRST!, { linear: false });

    expect([0, 1, 2, 3].map(canGoTo)).toEqual([true, true, true, true]);
  });

  it('goTo sets the model only for reachable steps', () => {
    const { model, goTo } = setup(SECOND!, { linear: true });

    goTo(3);
    expect(model.value).toBe(SECOND);

    goTo(0);
    expect(model.value).toBe(FIRST);
  });

  it('progressPercent feeds derived status into stepProgressPercent', () => {
    const { progressPercent } = setup(THIRD!);

    expect(progressPercent(STEP_PROGRESS_PARTIAL)).toBe(
      stepProgressPercent(
        [
          { completed: true, active: false },
          { completed: true, active: false },
          { completed: false, active: true },
          { completed: false, active: false },
        ],
        STEP_PROGRESS_PARTIAL,
      ),
    );
  });

  it('progressPercent is 100 when finished', () => {
    const { progressPercent } = setup(THIRD!, { finished: true });

    expect(progressPercent(STEP_PROGRESS_PARTIAL)).toBe(100);
  });
});
