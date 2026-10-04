import { describe, it, expect } from 'vitest';
import { ICON_MONO_NAMES, ICON_NAMES, getIconGlyph, isMonoOnlyIcon } from './iconGlyphs';

describe('iconGlyphs', () => {
  it('keeps palette and mono names disjoint', () => {
    const palette = new Set(ICON_NAMES);
    expect(ICON_MONO_NAMES.filter((name) => palette.has(name))).toEqual([]);
  });

  it('resolves mono glyphs and flags them mono-only', () => {
    expect(getIconGlyph('chevron-right')).toBeTruthy();
    expect(isMonoOnlyIcon('chevron-right')).toBe(true);
    expect(isMonoOnlyIcon('heart')).toBe(false);
  });
});
