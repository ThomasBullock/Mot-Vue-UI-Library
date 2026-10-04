import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { within } from '@testing-library/vue';

import { renderWithPlugins } from '@/test-utils';
import UxBlocks from '@/views/library/UxBlocks.vue';
import { STEPPER_ARIA_LABEL_DEFAULT, STEPPER_DEMO_STEPS } from '@/constants/ux-blocks';

describe('UxBlocks', () => {
  it('checking clickable steps lets an earlier step become current', async () => {
    const user = userEvent.setup();
    const result = renderWithPlugins(UxBlocks);
    const navs = () => result.getAllByRole('navigation', { name: STEPPER_ARIA_LABEL_DEFAULT });
    const stepButtons = () =>
      navs().flatMap((nav) =>
        within(nav)
          .queryAllByRole('listitem')
          .flatMap((item) => within(item).queryAllByRole('button')),
      );

    await user.click(result.getByRole('button', { name: 'Next' }));

    expect(stepButtons()).toHaveLength(0);

    await user.click(result.getByRole('checkbox', { name: 'Clickable steps (linear)' }));

    const signUp = stepButtons().find((button) =>
      button.textContent?.includes(STEPPER_DEMO_STEPS[0]!.title),
    );
    expect(signUp).toBeTruthy();
    await user.click(signUp!);

    expect(within(navs()[0]!).getAllByRole('listitem')[0]).toHaveAttribute('aria-current', 'step');
  });
});
