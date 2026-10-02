import { STEP_STATUS_LABEL, type StepStatus } from '@/constants/ux-blocks';

export type StepProgressInput = {
  completed: boolean;
  active?: boolean;
};

export function stepProgressPercent(
  steps: readonly StepProgressInput[],
  partialFill: number,
): number {
  const totalSteps = steps.length;
  if (totalSteps === 0) {
    return 0;
  }

  const completedCount = steps.filter((step) => step.completed).length;
  if (completedCount === totalSteps) {
    return 100;
  }

  const activeIndex = steps.findIndex((step) => step.active);
  const activeStep = activeIndex === -1 ? null : steps[activeIndex];
  if (activeStep && !activeStep.completed) {
    const stepWidth = 100 / totalSteps;
    return completedCount * stepWidth + stepWidth * partialFill;
  }

  return (completedCount / totalSteps) * 100;
}

export function windowStartForActive(
  activeIndex: number,
  total: number,
  visibleCount: number,
): number {
  if (activeIndex < 0) {
    return 0;
  }

  const middleOffset = Math.floor(visibleCount / 2);
  const centeredIndex = Math.max(0, activeIndex - middleOffset);
  const maxStartIndex = Math.max(0, total - visibleCount);
  return Math.min(centeredIndex, maxStartIndex);
}

export function canShiftWindow(
  start: number,
  delta: number,
  total: number,
  visibleCount: number,
): boolean {
  const next = start + delta;
  return next >= 0 && next + visibleCount <= total;
}

export function stepPosition(index: number, total: number): string {
  return `Step ${index + 1} of ${total}`;
}

export function stepSrLabel(status: StepStatus, index: number, total: number): string {
  return `${stepPosition(index, total)}, ${STEP_STATUS_LABEL[status]}`;
}
