import { describe } from 'vitest';
import CircleStepper from '@/components/ux-blocks/steppers/CircleStepper.vue';
import { describeStepperContract } from '@/test-utils/stepperContract';

describe('CircleStepper', () => {
  describeStepperContract(CircleStepper);
});
