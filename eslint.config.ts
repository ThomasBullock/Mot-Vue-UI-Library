import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import pluginOxlint from 'eslint-plugin-oxlint';
import skipFormatting from 'eslint-config-prettier/flat';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

const A11Y_LABEL_COMPONENTS = ['BaseLabel'];
const A11Y_CONTROL_COMPONENTS = ['BaseInput', 'BaseCurrencyInput'];

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    // IcoMoon dumps: single-word names, not app components.
    'src/components/icons/**',
  ]),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,

  ...pluginVueA11y.configs['flat/recommended'],

  // Primitives can't associate label↔control in their own SFC; callers do.
  // Register them so usage sites are what these two rules check.
  {
    name: 'app/a11y-custom-components',
    files: ['**/*.vue'],
    rules: {
      'vuejs-accessibility/form-control-has-label': [
        'error',
        {
          labelComponents: A11Y_LABEL_COMPONENTS,
          controlComponents: A11Y_CONTROL_COMPONENTS,
        },
      ],
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          components: A11Y_LABEL_COMPONENTS,
          controlComponents: A11Y_CONTROL_COMPONENTS,
          // Sibling <BaseLabel for> + <BaseInput id>, or wrapping. Not both.
          required: { some: ['nesting', 'id'] },
        },
      ],
    },
  },
  {
    name: 'app/library-pages',
    files: ['src/views/library/*.vue'],
    rules: {
      // Showcase pages are named after the thing they show (Buttons, Icons).
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    name: 'app/a11y-primitives',
    files: [
      'src/components/ui/BaseInput.vue',
      'src/components/ui/BaseLabel.vue',
      'src/components/ui/BaseCurrencyInput.vue',
    ],
    rules: {
      'vuejs-accessibility/form-control-has-label': 'off',
      'vuejs-accessibility/label-has-for': 'off',
    },
  },
);
