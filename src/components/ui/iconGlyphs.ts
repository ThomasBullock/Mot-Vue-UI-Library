import type { Component } from 'vue';

const modules = import.meta.glob('../icons/*.vue', {
  eager: true,
  import: 'default',
}) as Record<string, Component>;

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

export const ICON_GLYPHS: Record<string, Component> = Object.fromEntries(
  Object.entries(modules).map(([path, component]) => [pathToName(path), component]),
);

export const ICON_NAMES = Object.keys(ICON_GLYPHS).sort();

export function getIconGlyph(name: string): Component | null {
  return ICON_GLYPHS[name] ?? null;
}
