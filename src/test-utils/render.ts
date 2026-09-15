import { render, type RenderOptions, type RenderResult } from '@testing-library/vue';
import type { Plugin } from 'vue';

/**
 * Shared Vue plugins installed on every render. This is the single seam where
 * app-wide wiring slots in without every spec repeating it.
 *
 * The app uses vue-router, but this helper installs no router by default —
 * components under test are rendered in isolation and don't need one. When a
 * component uses `<router-link>`/`<router-view>`, pass a router via
 * `options.global.plugins` (appended, not replaced).
 */
const basePlugins: Plugin[] = [];

/**
 * Thin wrapper over Testing Library's `render` that merges caller-supplied
 * `global` mount options (plugins, provides, stubs, global components) onto a
 * shared baseline. Caller-supplied plugins are appended, not replaced.
 */
export function renderWithPlugins<C>(
  component: C,
  options: RenderOptions<C> = {} as RenderOptions<C>,
): RenderResult {
  const { global: globalOptions = {}, ...rest } = options;
  const { plugins: callerPlugins = [], ...restGlobal } = globalOptions;

  return render(component, {
    global: {
      plugins: [...basePlugins, ...callerPlugins],
      ...restGlobal,
    },
    ...rest,
  });
}
