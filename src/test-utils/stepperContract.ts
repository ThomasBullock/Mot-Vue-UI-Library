import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { within } from '@testing-library/vue';
import type { Component } from 'vue';

import { renderWithPlugins } from './render';
import {
  STEPPER_ARIA_LABEL_DEFAULT,
  STEPPER_DEMO_STEPS,
  STEP_STATUS,
  type Step,
} from '@/constants/ux-blocks';
import { stepSrLabel } from '@/utils/stepper';

type ContractOptions = {
  steps?: readonly Step[];
  // Progress stepper navigates by window, not by step buttons.
  clickable?: boolean;
};

// Behaviour every stepper shares: semantics, current-step marking, SR status,
// and (when supported) clickable steps driving the v-model.
export function describeStepperContract(
  component: Component,
  { steps = STEPPER_DEMO_STEPS, clickable = true }: ContractOptions = {},
) {
  const currentIndex = 1;
  const current = steps[currentIndex]!;
  const render = (props: Record<string, unknown> = {}) =>
    renderWithPlugins(component, { props: { steps, modelValue: current.id, ...props } });
  const nav = (result: ReturnType<typeof render>) =>
    result.getByRole('navigation', { name: STEPPER_ARIA_LABEL_DEFAULT });

  describe('stepper contract', () => {
    it('renders an ordered list of steps inside a labelled nav', () => {
      const result = render();
      const list = within(nav(result)).getByRole('list');

      expect(list.tagName).toBe('OL');
      expect(within(list).getAllByRole('listitem')).toHaveLength(steps.length);
    });

    it('accepts a custom nav label', () => {
      const { getByRole } = render({ ariaLabel: 'Checkout' });

      expect(getByRole('navigation', { name: 'Checkout' })).toBeInTheDocument();
    });

    it('marks only the current step with aria-current', () => {
      const result = render();
      const items = within(nav(result)).getAllByRole('listitem');

      expect(items.map((item) => item.getAttribute('aria-current'))).toEqual(
        steps.map((_, index) => (index === currentIndex ? 'step' : null)),
      );
    });

    it('announces position and status to screen readers', () => {
      const { getByText } = render();

      expect(getByText(stepSrLabel(STEP_STATUS.complete, 0, steps.length))).toBeInTheDocument();
      expect(
        getByText(stepSrLabel(STEP_STATUS.current, currentIndex, steps.length)),
      ).toBeInTheDocument();
      expect(
        getByText(stepSrLabel(STEP_STATUS.upcoming, currentIndex + 1, steps.length)),
      ).toBeInTheDocument();
    });

    it('announces every step complete when finished', () => {
      const { getAllByText } = render({ finished: true });

      expect(getAllByText(/, Completed$/)).toHaveLength(steps.length);
    });

    it('renders no step buttons by default', () => {
      const result = render();

      expect(
        within(nav(result))
          .queryAllByRole('listitem')
          .flatMap((item) => within(item).queryAllByRole('button')),
      ).toHaveLength(0);
    });

    if (!clickable) {
      return;
    }

    const stepButton = (result: ReturnType<typeof render>, step: Step) =>
      within(nav(result)).getByRole('button', { name: new RegExp(step.title) });

    it('clickable: selecting an earlier step updates the model', async () => {
      const user = userEvent.setup();
      const result = render({ clickable: true });

      await user.click(stepButton(result, steps[0]!));

      expect(result.emitted()['update:modelValue']?.at(-1)).toEqual([steps[0]!.id]);
    });

    it('clickable + linear: later steps are disabled', () => {
      const result = render({ clickable: true });

      expect(stepButton(result, steps[currentIndex + 1]!)).toBeDisabled();
    });

    it('clickable + non-linear: later steps update the model', async () => {
      const user = userEvent.setup();
      const result = render({ clickable: true, linear: false });
      const later = steps[currentIndex + 1]!;

      await user.click(stepButton(result, later));

      expect(result.emitted()['update:modelValue']?.at(-1)).toEqual([later.id]);
    });
  });
}
