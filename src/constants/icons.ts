// Icon tokens: size, colour/mono modes, and the IcoMoon palette0 → brand map.
// CSS values are theme vars (not hex) so they track @theme.

export const ICON_SIZE_DEFAULT = 24;
export const ICON_SIZE_PRESETS = [16, 24, 32] as const;

export const ICON_MODES = ['color', 'mono'] as const;
export type IconMode = (typeof ICON_MODES)[number];
export const ICON_MODE_DEFAULT = 'color' satisfies IconMode;

// IcoMoon .palette0 nearest brand equivalents. color0/color3 stay a dark pair
// even though both nearest-match grey-700 by RGB.
export const ICON_COLOR_PALETTE = {
  color: 'var(--color-primary-300)',
  color0: 'var(--color-grey-700)',
  color1: 'var(--color-danger-300)',
  color2: 'var(--color-success-400)',
  color3: 'var(--color-grey-800)',
} as const;

export const ICON_MONO_CURRENT = 'currentColor';
// color0 / color3 are the IcoMoon fill slots — unused in mono so strokes
// (color / color1 / color2) stay visible instead of filling black.
export const ICON_MONO_UNUSED = 'transparent';
