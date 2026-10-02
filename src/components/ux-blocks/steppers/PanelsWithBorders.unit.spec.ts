import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import PanelsWithBorders from '@/components/ux-blocks/steppers/PanelsWithBorders.vue';
import {
  STEP_PROGRESS_PARTIAL,
  STEPPER_DEMO_STEPS as STEPS,
  UX_BLOCKS_TESTID,
} from '@/constants/ux-blocks';
import { stepProgressPercent } from '@/utils/stepper';
import { describeStepperContract } from '@/test-utils/stepperContract';

describe('PanelsWithBorders', () => {
  describeStepperContract(PanelsWithBorders);

  it('sizes the progress fill from the progress helper', () => {
    const { getAllByTestId } = renderWithPlugins(PanelsWithBorders, {
      props: { steps: STEPS, modelValue: STEPS[2]!.id },
    });
    const expected = stepProgressPercent(
      STEPS.map((_, index) => ({ completed: index < 2, active: index === 2 })),
      STEP_PROGRESS_PARTIAL,
    );

    for (const fill of getAllByTestId(UX_BLOCKS_TESTID.progressFill)) {
      expect(fill.getAttribute('style')).toContain(`${expected}%`);
    }
  });
});
