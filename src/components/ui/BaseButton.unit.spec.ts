import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import BaseButton from '@/components/ui/BaseButton.vue';
import { BUTTON_VARIANT_CLASSES, BUTTON_VARIANT_DEFAULT } from '@/constants/ui';

describe('BaseButton', () => {
  it('renders the slot', () => {
    const { getByRole } = renderWithPlugins(BaseButton, {
      slots: { default: 'Save' },
    });

    expect(getByRole('button', { name: 'Save' })).toBeTruthy();
  });

  it('defaults to type="button"', () => {
    const { getByRole } = renderWithPlugins(BaseButton, {
      slots: { default: 'Save' },
    });

    expect(getByRole('button', { name: 'Save' }).getAttribute('type')).toBe('button');
  });

  it('applies the default variant when none is given', () => {
    const { getByRole } = renderWithPlugins(BaseButton, {
      slots: { default: 'Save' },
    });

    expect(getByRole('button', { name: 'Save' }).getAttribute('class')).toContain(
      BUTTON_VARIANT_CLASSES[BUTTON_VARIANT_DEFAULT],
    );
  });
});
