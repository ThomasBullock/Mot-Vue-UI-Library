import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import ProgressStepper from '@/components/ux-blocks/steppers/ProgressStepper.vue';
import {
  STEP_PROGRESS_PARTIAL,
  UX_BLOCKS_TESTID,
  type ProgressStep,
} from '@/constants/ux-blocks';
import { stepProgressPercent } from '@/utils/stepper';

const DEMO_STEPS: ProgressStep[] = [
  { id: 1, title: 'Account Setup', completed: true, active: false },
  { id: 2, title: 'Sign Up', completed: true, active: false },
  { id: 3, title: 'Plan Selection', completed: false, active: true },
  { id: 4, title: 'Billing', completed: false, active: false },
  { id: 5, title: 'Payment', completed: false, active: false },
  { id: 6, title: 'Activation', completed: false, active: false },
];

describe('ProgressStepper', () => {
  it('centers the window on the active step after mount', () => {
    const { getAllByText, queryByText } = renderWithPlugins(ProgressStepper);

    expect(getAllByText('Sign Up').length).toBeGreaterThan(0);
    expect(getAllByText('Plan Selection').length).toBeGreaterThan(0);
    expect(getAllByText('Billing').length).toBeGreaterThan(0);
    expect(queryByText('Account Setup')).toBeNull();
    expect(queryByText('Payment')).toBeNull();
  });

  it('shifts titles on next and prev', async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByText, queryByText } = renderWithPlugins(ProgressStepper);

    await user.click(getByRole('button', { name: 'Next steps' }));

    expect(getAllByText('Plan Selection').length).toBeGreaterThan(0);
    expect(getAllByText('Billing').length).toBeGreaterThan(0);
    expect(getAllByText('Payment').length).toBeGreaterThan(0);
    expect(queryByText('Sign Up')).toBeNull();

    await user.click(getByRole('button', { name: 'Previous steps' }));

    expect(getAllByText('Sign Up').length).toBeGreaterThan(0);
    expect(queryByText('Payment')).toBeNull();
  });

  it('disables prev at the start of the window', async () => {
    const user = userEvent.setup();
    const { getByRole } = renderWithPlugins(ProgressStepper);

    const prev = getByRole('button', { name: 'Previous steps' });
    await user.click(prev);

    expect(prev).toBeDisabled();
  });

  it('sets the fill width from the progress helper', () => {
    const { getByTestId } = renderWithPlugins(ProgressStepper);

    expect(getByTestId(UX_BLOCKS_TESTID.progressFill).getAttribute('style')).toContain(
      `width: ${stepProgressPercent(DEMO_STEPS, STEP_PROGRESS_PARTIAL)}%`,
    );
  });
});
