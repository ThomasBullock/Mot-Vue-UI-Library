import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import HorizontalPanels from '@/components/ux-blocks/steppers/HorizontalPanels.vue';
import { STEP_ACTIVE_BORDER } from '@/constants/ux-blocks';

describe('HorizontalPanels', () => {
  it('renders each step title', () => {
    const { getByText } = renderWithPlugins(HorizontalPanels);

    expect(getByText('Account Setup')).toBeTruthy();
    expect(getByText('Billing')).toBeTruthy();
    expect(getByText('Activation')).toBeTruthy();
  });

  it('shows a completed check on the finished step', () => {
    const { getByRole } = renderWithPlugins(HorizontalPanels);

    expect(getByRole('img', { name: 'Completed' })).toBeTruthy();
  });

  it('applies the success border on the active card', () => {
    const { getByText } = renderWithPlugins(HorizontalPanels);

    const card = getByText('Billing').closest('div.rounded-2xl');
    expect(card?.getAttribute('class')).toContain(STEP_ACTIVE_BORDER);
  });
});
