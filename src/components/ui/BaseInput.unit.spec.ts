import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import type { RenderOptions } from '@testing-library/vue';

import { renderWithPlugins } from '@/test-utils';
import BaseInput from '@/components/ui/BaseInput.vue';
import { INPUT_BASE_CLASSES } from '@/constants/ui';

// BaseInput is a thin styled native <input type="text">: `modelValue` drives the
// value (v-model), everything else (placeholder/disabled/aria-*/data-testid)
// falls through as an attr. It is a controlled component — the parent owns the
// value; the input only emits `update:modelValue`.
describe('BaseInput', () => {
  const render = (options: RenderOptions<typeof BaseInput> = {}) =>
    renderWithPlugins(BaseInput, options);

  it('renders a text input', () => {
    const { getByRole } = render();

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('defaults to type="text"', () => {
    const { getByRole } = render();

    expect(getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('lets the caller override the type', () => {
    const { getByRole } = render({ props: { type: 'email' } });

    expect(getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('renders the modelValue as its value', () => {
    const { getByRole } = render({ props: { modelValue: 'hello' } });

    expect(getByRole('textbox')).toHaveValue('hello');
  });

  it('reflects a new modelValue on re-render (v-model in)', async () => {
    const { getByRole, rerender } = render({ props: { modelValue: 'a' } });

    await rerender({ modelValue: 'b' });

    expect(getByRole('textbox')).toHaveValue('b');
  });

  it('emits update:modelValue on input (v-model out)', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render();

    await user.type(getByRole('textbox'), 'x');

    expect(emitted()['update:modelValue'].at(-1)).toEqual(['x']);
  });

  it('accumulates typed text through v-model (round-trip)', async () => {
    const user = userEvent.setup();
    // Harness closes the v-model loop the way a real parent does.
    const Harness = {
      components: { BaseInput },
      data: () => ({ text: '' }),
      template: '<BaseInput v-model="text" data-testid="harness.input.text-input" />',
    };
    const { getByTestId } = renderWithPlugins(Harness);

    await user.type(getByTestId('harness.input.text-input'), 'abc');

    expect(getByTestId('harness.input.text-input')).toHaveValue('abc');
  });

  it('is disabled when the disabled attr is passed', () => {
    const { getByRole } = render({ props: { disabled: true } });

    expect(getByRole('textbox')).toBeDisabled();
  });

  it('carries the aria-invalid styling classes and reflects the attr', () => {
    const { getByRole } = render({ props: { 'aria-invalid': 'true' } });
    const input = getByRole('textbox');

    expect(input.getAttribute('class')).toContain('aria-invalid:border-danger-600');
    expect(input.getAttribute('class')).toContain('aria-invalid:ring-danger-600/20');
    expect(input.getAttribute('class')).toContain('focus-visible:aria-invalid:border-danger-600');
    expect(input.getAttribute('class')).toContain('focus-visible:aria-invalid:ring-danger-600/20');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('appends a caller class alongside the base classes', () => {
    const { getByRole } = render({ props: { class: 'mt-4' } });
    const cls = getByRole('textbox').getAttribute('class');

    expect(cls).toContain('mt-4');
    expect(cls).toContain(INPUT_BASE_CLASSES);
  });

  it('includes the focus-visible ring and placeholder-tone classes', () => {
    const { getByRole } = render();
    const cls = getByRole('textbox').getAttribute('class');

    expect(cls).toContain('focus-visible:ring-3');
    expect(cls).toContain('placeholder:text-grey-500');
  });

  it('falls the placeholder through', () => {
    const { getByPlaceholderText } = render({ props: { placeholder: 'e.g. 25000' } });

    expect(getByPlaceholderText('e.g. 25000')).toBeInTheDocument();
  });

  it('falls the data-testid through to the native input', () => {
    const { getByTestId } = render({
      props: { 'data-testid': 'calculator.loan-form.amount-input' },
    });

    expect(getByTestId('calculator.loan-form.amount-input').tagName).toBe('INPUT');
  });
});
