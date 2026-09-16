import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { renderWithPlugins } from '@/test-utils';
import BaseCurrencyInput from '@/components/ui/BaseCurrencyInput.vue';
import { CURRENCY_ADORNMENT_CLASSES, CURRENCY_INPUT_CLASSES } from '@/constants/ui';

// BaseCurrencyInput composes BaseInput. v-model is the raw Number (or null);
// the field shows a display string: digits-only while focused, grouped on blur.
// A "$" adornment sits inside the field. Non-digits are stripped live. Paste of
// a decimal drops the cents (1,250.99 → 1250), it does not concatenate them.
const GROUPED_AMOUNT = 1_250_000;
const GROUPED_DISPLAY = '1,250,000';
const UNGROUPED_DISPLAY = '1250000';
const FIELD_TESTID = 'calculator.loan-form.amount-input';

describe('BaseCurrencyInput', () => {
  // Untyped: the stub has no public props yet. The spec names the intended API.
  const render = (options = {}) => renderWithPlugins(BaseCurrencyInput, options);

  it('renders a "$" adornment', () => {
    const { getByText } = render();

    expect(getByText('$').getAttribute('class')).toContain(CURRENCY_ADORNMENT_CLASSES);
  });

  it('shows a pre-filled model value grouped', () => {
    const { getByRole } = render({ props: { modelValue: GROUPED_AMOUNT } });

    expect(getByRole('textbox')).toHaveValue(GROUPED_DISPLAY);
  });

  it('shows an empty field when the model is null', () => {
    const { getByRole } = render({ props: { modelValue: null } });

    expect(getByRole('textbox')).toHaveValue('');
  });

  it('reflects a new modelValue on re-render (v-model in)', async () => {
    const { getByRole, rerender } = render({ props: { modelValue: 5 } });

    await rerender({ modelValue: GROUPED_AMOUNT });

    expect(getByRole('textbox')).toHaveValue(GROUPED_DISPLAY);
  });

  it('emits a Number and keeps digits ungrouped while typing', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render();
    const input = getByRole('textbox');

    await user.type(input, UNGROUPED_DISPLAY);

    expect(emitted()['update:modelValue']?.at(-1)).toEqual([GROUPED_AMOUNT]);
    expect(input).toHaveValue(UNGROUPED_DISPLAY);
  });

  it('rejects non-digit characters from the field', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render();
    const input = getByRole('textbox');

    await user.type(input, '12a3');

    expect(input).toHaveValue('123');
    expect(emitted()['update:modelValue']?.at(-1)).toEqual([123]);
  });

  it('drops cents on paste rather than concatenating them', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render();
    const input = getByRole('textbox');

    await user.click(input);
    await user.paste('1,250.99');

    expect(input).toHaveValue('1250');
    expect(emitted()['update:modelValue']?.at(-1)).toEqual([1250]);
  });

  it('groups the value with separators on blur', async () => {
    const user = userEvent.setup();
    const { getByRole } = render();
    const input = getByRole('textbox');

    await user.type(input, UNGROUPED_DISPLAY);
    await user.tab();

    expect(input).toHaveValue(GROUPED_DISPLAY);
  });

  it('emits a blur event so a parent can trigger validation', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render();

    await user.click(getByRole('textbox'));
    await user.tab();

    expect(emitted().blur ?? []).toHaveLength(1);
  });

  it('emits null when the field is cleared', async () => {
    const user = userEvent.setup();
    const { getByRole, emitted } = render({ props: { modelValue: GROUPED_AMOUNT } });
    const input = getByRole('textbox');

    await user.clear(input);

    expect(emitted()['update:modelValue']?.at(-1)).toEqual([null]);
    expect(input).toHaveValue('');
  });

  it('accumulates a Number through v-model (round-trip)', async () => {
    const user = userEvent.setup();
    // Harness closes the v-model loop the way a real parent does.
    const Harness = {
      components: { BaseCurrencyInput },
      data: () => ({ amount: null as number | null }),
      template: `
        <div>
          <BaseCurrencyInput v-model="amount" />
          <span data-testid="harness.currency-input.model">{{ amount === null ? 'null' : amount }}</span>
        </div>
      `,
    };
    const { getByRole, getByTestId } = renderWithPlugins(Harness);

    await user.type(getByRole('textbox'), '5000');

    expect(getByTestId('harness.currency-input.model')).toHaveTextContent('5000');
    expect(getByRole('textbox')).toHaveValue('5000');
  });

  it('applies the currency input layout classes to the field', () => {
    const { getByRole } = render();

    expect(getByRole('textbox').getAttribute('class')).toContain(CURRENCY_INPUT_CLASSES);
  });

  it('falls aria-invalid through to the field', () => {
    const { getByRole } = render({ props: { 'aria-invalid': 'true' } });

    expect(getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when the disabled attr is passed', () => {
    const { getByRole } = render({ props: { disabled: true } });

    expect(getByRole('textbox')).toBeDisabled();
  });

  it('falls the data-testid through to the field', () => {
    const { getByTestId } = render({
      props: { 'data-testid': FIELD_TESTID },
    });

    expect(getByTestId(FIELD_TESTID).tagName).toBe('INPUT');
  });
});
