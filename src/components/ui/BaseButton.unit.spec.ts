import { describe, it, expect } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import BaseButton from '@/components/ui/BaseButton.vue';
import {
  BUTTON_BASE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  BUTTON_VARIANT_DEFAULT,
} from '@/constants/ui';

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

  it('applies the raised/pressed dual-inset shadow stack', () => {
    const { getByRole } = renderWithPlugins(BaseButton, {
      slots: { default: 'Save' },
    });

    const className = getByRole('button', { name: 'Save' }).getAttribute('class') ?? '';
    expect(className).toContain('shadow-btn-raised');
    expect(className).toContain('inset-shadow-btn-raised');
    expect(className).toContain('active:shadow-none');
    expect(className).toContain('active:inset-shadow-btn-pressed');
    expect(BUTTON_BASE_CLASSES).toContain(
      'shadow-btn-raised inset-shadow-btn-raised active:shadow-none active:inset-shadow-btn-pressed',
    );
  });
});
