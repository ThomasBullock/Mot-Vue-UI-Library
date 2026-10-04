import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import type { RenderOptions } from '@testing-library/vue';

import { renderWithPlugins } from '@/test-utils';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
import { CHECKBOX_BASE_CLASSES, INPUT_INVALID_CLASSES } from '@/constants/ui';

// BaseCheckbox is a styled native checkbox: `modelValue` drives checked
// (v-model), everything else (disabled/aria-*/class/data-testid) falls through
// onto the input. Controlled — the parent owns the value.
describe('BaseCheckbox', () => {
  const render = (options: RenderOptions<typeof BaseCheckbox> = {}) =>
    renderWithPlugins(BaseCheckbox, options);

  it('renders an unchecked checkbox', () => {
    const { getByRole } = render();

    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('renders the modelValue as its checked state', () => {
    const { getByRole } = render({ props: { modelValue: true } });

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('reflects a new modelValue on re-render (v-model in)', async () => {
    const { getByRole, rerender } = render({ props: { modelValue: false } });

    await rerender({ modelValue: true });

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('emits update:modelValue on click (v-model out)', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render();

    await user.click(getByRole('checkbox'));

    expect(emitted('update:modelValue').at(-1)).toEqual([true]);
  });

  it('toggles with Space when focused', async () => {
    const user = userEvent.setup();
    const Harness = {
      components: { BaseCheckbox },
      data: () => ({ on: false }),
      template: '<BaseCheckbox v-model="on" data-testid="harness.checkbox" />',
    };
    const { getByTestId } = renderWithPlugins(Harness);
    const checkbox = getByTestId('harness.checkbox');

    checkbox.focus();
    await user.keyboard('[Space]');

    expect(checkbox).toBeChecked();
  });

  it('accumulates clicks through v-model (round-trip)', async () => {
    const user = userEvent.setup();
    const Harness = {
      components: { BaseCheckbox },
      data: () => ({ on: false }),
      template: '<BaseCheckbox v-model="on" data-testid="harness.checkbox" />',
    };
    const { getByTestId } = renderWithPlugins(Harness);
    const checkbox = getByTestId('harness.checkbox');

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('takes its accessible name from a wrapping label', () => {
    const Harness = {
      components: { BaseCheckbox },
      template: '<label>Accept terms <BaseCheckbox /></label>',
    };
    const { getByRole } = renderWithPlugins(Harness);

    expect(getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('is disabled when the disabled attr is passed', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render({ attrs: { disabled: true } });
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeDisabled();

    await user.click(checkbox);

    expect(emitted('update:modelValue')).toBeUndefined();
  });

  it('carries the aria-invalid styling classes and reflects the attr', () => {
    const { getByRole } = render({ attrs: { 'aria-invalid': 'true' } });
    const checkbox = getByRole('checkbox');

    expect(checkbox.getAttribute('class')).toContain(INPUT_INVALID_CLASSES);
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('appends a caller class alongside the base classes', () => {
    const { getByRole } = render({ props: { class: 'mt-4' } });
    const cls = getByRole('checkbox').getAttribute('class');

    expect(cls).toContain('mt-4');
    expect(cls).toContain(CHECKBOX_BASE_CLASSES);
  });

  it('falls the data-testid through to the native input', () => {
    const { getByTestId } = render({
      attrs: { 'data-testid': 'library.ux-blocks.clickable-checkbox' },
    });

    expect(getByTestId('library.ux-blocks.clickable-checkbox').tagName).toBe('INPUT');
  });
});
