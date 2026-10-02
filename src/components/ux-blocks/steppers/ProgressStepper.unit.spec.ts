import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import ProgressStepper from '@/components/ux-blocks/steppers/ProgressStepper.vue';
import {
  STEP_PROGRESS_PARTIAL,
  STEP_STATUS_LABEL,
  STEPPER_DEMO_STEPS_LONG as STEPS,
  UX_BLOCKS_TESTID,
} from '@/constants/ux-blocks';
import { stepPosition, stepProgressPercent } from '@/utils/stepper';
import { describeStepperContract } from '@/test-utils/stepperContract';

const CURRENT = 2;
const titleOf = (index: number) => STEPS[index]!.title;

describe('ProgressStepper', () => {
  describeStepperContract(ProgressStepper, { steps: STEPS, clickable: false });

  const render = (modelValue = STEPS[CURRENT]!.id) =>
    renderWithPlugins(ProgressStepper, { props: { steps: STEPS, modelValue } });

  // Windowed titles are visual only (aria-hidden); the SR list holds every step.
  const visibleTitles = (container: Element) =>
    [...container.querySelectorAll('[aria-hidden="true"] > div')].map((el) =>
      el.textContent?.trim(),
    );

  it('centers the window on the current step', () => {
    const { container } = render();

    expect(visibleTitles(container)).toEqual([titleOf(1), titleOf(2), titleOf(3)]);
  });

  it('shifts titles on next and prev', async () => {
    const user = userEvent.setup();
    const { getByRole, container } = render();

    await user.click(getByRole('button', { name: 'Next steps' }));
    expect(visibleTitles(container)).toEqual([titleOf(2), titleOf(3), titleOf(4)]);

    await user.click(getByRole('button', { name: 'Previous steps' }));
    expect(visibleTitles(container)).toEqual([titleOf(1), titleOf(2), titleOf(3)]);
  });

  it('disables prev at the start of the window', async () => {
    const user = userEvent.setup();
    const { getByRole } = render();

    const prev = getByRole('button', { name: 'Previous steps' });
    await user.click(prev);

    expect(prev).toBeDisabled();
  });

  it('re-centres the window when the model changes', async () => {
    const { rerender, container } = render();

    await rerender({ modelValue: STEPS.at(-1)!.id });

    expect(visibleTitles(container)).toEqual([titleOf(3), titleOf(4), titleOf(5)]);
  });

  it('reads Completed on the bar when finished', () => {
    const { getByRole } = renderWithPlugins(ProgressStepper, {
      props: { steps: STEPS, modelValue: STEPS[CURRENT]!.id, finished: true },
    });

    expect(getByRole('progressbar')).toHaveAttribute('aria-valuetext', STEP_STATUS_LABEL.complete);
  });

  it('exposes the bar as a progressbar', () => {
    const { getByRole, getByTestId } = render();
    const expected = stepProgressPercent(
      STEPS.map((_, index) => ({ completed: index < CURRENT, active: index === CURRENT })),
      STEP_PROGRESS_PARTIAL,
    );
    const bar = getByRole('progressbar');

    expect(bar).toHaveAttribute('aria-valuenow', String(Math.round(expected)));
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar).toHaveAttribute('aria-valuetext', stepPosition(CURRENT, STEPS.length));
    expect(getByTestId(UX_BLOCKS_TESTID.progressFill).getAttribute('style')).toContain(
      `width: ${expected}%`,
    );
  });
});
