import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderWithPlugins } from '@/test-utils';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import {
  ICON_COLOR_PALETTE,
  ICON_MONO_CURRENT,
  ICON_MONO_UNUSED,
  ICON_SIZE_DEFAULT,
} from '@/constants/icons';

function host(container: Element): HTMLElement | null {
  return container.firstElementChild as HTMLElement | null;
}

describe('BaseIcon', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it(`defaults size to ${ICON_SIZE_DEFAULT}px`, () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart' },
    });

    const el = host(container);
    expect(el).toBeTruthy();
    expect(el?.style.width).toBe(`${ICON_SIZE_DEFAULT}px`);
    expect(el?.style.height).toBe(`${ICON_SIZE_DEFAULT}px`);
  });

  it('sets host width and height from size', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart', size: 16 },
    });

    const el = host(container);
    expect(el?.style.width).toBe('16px');
    expect(el?.style.height).toBe('16px');
  });

  it('applies brand palette CSS vars in colour mode', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart' },
    });

    const el = host(container);
    expect(el?.style.color).toBe(ICON_COLOR_PALETTE.color);
    expect(el?.style.getPropertyValue('--color0')).toBe(ICON_COLOR_PALETTE.color0);
    expect(el?.style.getPropertyValue('--color1')).toBe(ICON_COLOR_PALETTE.color1);
    expect(el?.style.getPropertyValue('--color2')).toBe(ICON_COLOR_PALETTE.color2);
    expect(el?.style.getPropertyValue('--color3')).toBe(ICON_COLOR_PALETTE.color3);
  });

  it('collapses stroke slots onto currentColor and leaves fills unused in mono', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart', mode: 'mono' },
    });

    const el = host(container);
    expect(el?.style.color).toBe('');
    expect(el?.style.getPropertyValue('--color1')).toBe(ICON_MONO_CURRENT);
    expect(el?.style.getPropertyValue('--color2')).toBe(ICON_MONO_CURRENT);
    expect(el?.style.getPropertyValue('--color0')).toBe(ICON_MONO_UNUSED);
    expect(el?.style.getPropertyValue('--color3')).toBe(ICON_MONO_UNUSED);
  });

  it('overrides host color from the color prop', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart', mode: 'mono', color: 'rgb(30, 33, 212)' },
    });

    expect(host(container)?.style.color).toBe('rgb(30, 33, 212)');
  });

  it('overrides a palette slot', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart', color1: 'var(--color-danger-500)' },
    });

    expect(host(container)?.style.getPropertyValue('--color1')).toBe('var(--color-danger-500)');
  });

  it('leaves mono-only icons uncoloured and palette-free by default', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'chevron-right' },
    });

    const el = host(container);
    expect(el).toBeTruthy();
    expect(el?.style.color).toBe('');
    expect(el?.style.getPropertyValue('--color1')).toBe('');
  });

  it('applies the color prop to mono-only icons', () => {
    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'chevron-right', color: 'rgb(30, 33, 212)' },
    });

    expect(host(container)?.style.color).toBe('rgb(30, 33, 212)');
  });

  it('renders nothing for an unknown name', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { container } = renderWithPlugins(BaseIcon, {
      props: { name: 'not-an-icon' },
    });

    expect(host(container)).toBeNull();
    expect(warn).toHaveBeenCalled();
  });

  it('exposes a label as an image role', () => {
    const { getByRole } = renderWithPlugins(BaseIcon, {
      props: { name: 'heart', label: 'Favourite' },
    });

    expect(getByRole('img', { name: 'Favourite' })).toBeTruthy();
  });
});
