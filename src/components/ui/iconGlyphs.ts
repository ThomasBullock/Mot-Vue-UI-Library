import type { Component } from 'vue';

type GlyphModules = Record<string, Component>;

// IcoMoon glyphs: palette slots (--color0..3) for colour / mono modes.
const paletteModules = import.meta.glob('../icons/*.vue', {
  eager: true,
  import: 'default',
}) as GlyphModules;

// Lucide glyphs: stroke-only currentColor, no palette slots.
const monoModules = import.meta.glob('../icons/mono/*.vue', {
  eager: true,
  import: 'default',
}) as GlyphModules;

function pathToName(path: string): string {
  const file =
    path
      .split('/')
      .pop()
      ?.replace(/\.vue$/, '') ?? '';
  return file
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function globToGlyphs(modules: GlyphModules): Record<string, Component> {
  return Object.fromEntries(
    Object.entries(modules).map(([path, component]) => [pathToName(path), component]),
  );
}

const PALETTE_GLYPHS = globToGlyphs(paletteModules);
const MONO_GLYPHS = globToGlyphs(monoModules);

if (import.meta.env.DEV) {
  const collisions = Object.keys(MONO_GLYPHS).filter((name) => name in PALETTE_GLYPHS);
  if (collisions.length) {
    console.warn(`[iconGlyphs] mono icons shadow palette icons: ${collisions.join(', ')}`);
  }
}

export const ICON_GLYPHS: Record<string, Component> = { ...PALETTE_GLYPHS, ...MONO_GLYPHS };

export const ICON_NAMES = Object.keys(PALETTE_GLYPHS).sort();
export const ICON_MONO_NAMES = Object.keys(MONO_GLYPHS).sort();

export function getIconGlyph(name: string): Component | null {
  return ICON_GLYPHS[name] ?? null;
}

export function isMonoOnlyIcon(name: string): boolean {
  return name in MONO_GLYPHS;
}
