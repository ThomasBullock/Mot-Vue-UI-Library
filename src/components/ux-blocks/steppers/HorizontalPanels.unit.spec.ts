import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import HorizontalPanels from '@/components/ux-blocks/steppers/HorizontalPanels.vue';
import { STEP_ACTIVE_BORDER, STEPPER_DEMO_STEPS as STEPS } from '@/constants/ux-blocks';
import { describeStepperContract } from '@/test-utils/stepperContract';

describe('HorizontalPanels', () => {
  describeStepperContract(HorizontalPanels);

  const render = () =>
    renderWithPlugins(HorizontalPanels, { props: { steps: STEPS, modelValue: STEPS[1]!.id } });

  it('renders each step title', () => {
    const { getByText } = render();

    for (const step of STEPS) {
      expect(getByText(step.title)).toBeTruthy();
    }
  });

  it('shows a completed check on finished steps only', () => {
    const { getAllByRole } = render();

    expect(getAllByRole('img', { name: 'Completed' })).toHaveLength(1);
  });

  it('applies the success border on the current card', () => {
    const { getByText } = render();

    const card = getByText(STEPS[1]!.title).closest('.rounded-2xl');
    expect(card?.getAttribute('class')).toContain(STEP_ACTIVE_BORDER);
  });
});
