# mot-vue-ui-lib

Vue 3 component library: primitives, design tokens, and a live showcase. Tailwind CSS 4, Vue Router, Vitest.

Shared control tokens live in `src/constants/ui.ts`. Base components (`BaseButton`, `BaseInput`, `BaseCurrencyInput`, `BaseLabel`) compose those tokens. Run the app and open `/library` to browse colours, buttons, inputs, and slot patterns.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Type-Check Only

```sh
npm run type-check
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [oxlint](https://oxc.rs/docs/guide/usage/linter) and [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [oxfmt](https://oxc.rs/docs/guide/usage/formatter)

```sh
npm run format
```
