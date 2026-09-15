// Shared UI-control styling tokens + BaseButton variant config.
//
// Class strings are full static literals so Tailwind's scanner emits them
// (a dynamic `bg-${x}` would be missed). Colour steps are WCAG-AA verified
// against the @theme hex values for every base/hover/active state.

// Tokens shared across form controls (button, input, select). Exported so each
// control can compose the shared base/size rather than restate them.
export const CONTROL_BASE_CLASSES = 'rounded-md border';
// Height + text size are shared; horizontal padding is per-control (buttons sit
// wider than inputs) so it lives in each component's own layout string.
export const CONTROL_SIZE_CLASSES = 'h-9 text-sm';
// shadcn-style focus: a soft, semi-transparent 3px halo (ring, no offset) in a
// neutral tone (--color-ring ≈ grey-400). Neutral, not brand yellow, so it stays
// visible against every variant's fill. The variants keep their own resting
// border on focus (no border-tint) — a deliberate design choice for this palette.
export const CONTROL_FOCUS_CLASSES =
  'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50';
export const CONTROL_DISABLED_CLASSES = 'disabled:opacity-50 disabled:pointer-events-none';

// Button base = shared control tokens + button-specific layout (padding, no-wrap
// label, subtle lift). shadcn rhythm: h-9, px-4, text-sm, font-medium.
export const BUTTON_BASE_CLASSES = [
  'inline-flex items-center justify-center gap-2 whitespace-nowrap px-4 font-medium shadow-xs transition-colors select-none',
  CONTROL_BASE_CLASSES,
  CONTROL_SIZE_CLASSES,
  CONTROL_FOCUS_CLASSES,
  CONTROL_DISABLED_CLASSES,
].join(' ');

// Colour axis. Every variant carries a border (self-coloured where invisible)
// so all variants render at identical height.
export const BUTTON_VARIANT_CLASSES = {
  primary: 'bg-primary-400 text-black border-black hover:bg-primary-500 active:bg-primary-600',
  secondary: 'bg-grey-800 text-white border-grey-800 hover:bg-grey-900 active:bg-grey-950',
  'secondary-outline': 'bg-white text-black border-black hover:bg-grey-100 active:bg-grey-200',
  success:
    'bg-success-400 text-black border-success-400 hover:bg-success-500 active:bg-success-600',
  danger: 'bg-danger-600 text-white border-danger-600 hover:bg-danger-700 active:bg-danger-800',
};

// Single source for the prop validator, the design-page loop, and the tests.
export const BUTTON_VARIANTS = Object.keys(BUTTON_VARIANT_CLASSES);
export const BUTTON_VARIANT_DEFAULT = 'primary' satisfies ButtonVariant;

export type ButtonVariant = keyof typeof BUTTON_VARIANT_CLASSES;

// Invalid state is CSS-only (shadcn-style): Tailwind's aria-invalid: variant
// activates when the consumer sets aria-invalid="true" — no prop, no JS.
// focus-visible:aria-invalid:* outranks CONTROL_FOCUS_CLASSES so a focused
// invalid input keeps the danger ring instead of the neutral grey one.
export const INPUT_INVALID_CLASSES =
  'aria-invalid:border-danger-600 aria-invalid:ring-3 aria-invalid:ring-danger-600/20 focus-visible:aria-invalid:border-danger-600 focus-visible:aria-invalid:ring-danger-600/20';

// Native text input = shared control tokens + input-specific layout (px-3, a
// resting border colour, placeholder tone). Invalid styles compose in last.
export const INPUT_BASE_CLASSES = [
  'flex w-full px-3 bg-white border-grey-300 text-grey-900 placeholder:text-grey-500 transition-colors',
  CONTROL_BASE_CLASSES,
  CONTROL_SIZE_CLASSES,
  CONTROL_FOCUS_CLASSES,
  CONTROL_DISABLED_CLASSES,
  INPUT_INVALID_CLASSES,
].join(' ');

// Native `<input type="…">` values supported by BaseInput.
export const INPUT_TYPES = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;
export const INPUT_TYPE_DEFAULT = 'text' satisfies InputType;

export type InputType = (typeof INPUT_TYPES)[number];

export const LABEL_BASE_CLASSES = 'text-sm font-medium text-grey-900';
