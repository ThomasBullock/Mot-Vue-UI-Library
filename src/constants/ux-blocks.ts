import { ICON_SIZE_DEFAULT } from '@/constants/icons';

// Success fill for completed / active stepper surfaces (not idle).

export const STEP_COMPLETED_SURFACE =
  'border-success-600 bg-success-500 dark:border-success-400 dark:bg-success-600';
export const STEP_COMPLETED_TRACK = 'bg-success-500 dark:bg-success-400';
export const STEP_PENDING_TRACK = 'bg-grey-200 dark:bg-grey-700';
export const STEP_ACTIVE_BORDER = 'border-success-600 dark:border-success-400';
export const STEP_CHECK = 'text-success-500 dark:text-success-400';

export const STEP_TITLE_ACTIVE = 'text-success-600 dark:text-success-300';
export const STEP_TITLE_COMPLETED = 'text-grey-900 dark:text-grey-100';
export const STEP_TITLE_PENDING = 'text-grey-500 dark:text-grey-400';

// Square icon tile used by the panel steppers; idle = no status highlight.
export const STEP_ICON_WELL =
  'flex size-11 min-w-11 shrink-0 items-center justify-center rounded-lg border leading-none';
export const STEP_ICON_WELL_IDLE =
  'border-grey-100 bg-grey-50 dark:border-grey-700 dark:bg-grey-800';
export const STEP_ICON_SIZE = ICON_SIZE_DEFAULT;

// Clickable step reset: native <button> styling off, focus ring matches controls.
export const STEP_TRIGGER_BUTTON =
  'cursor-pointer text-left disabled:cursor-default focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50';

export const STEPPER_FRAME = 'bg-white p-8 dark:bg-grey-950 md:p-12 lg:p-20';

export const STEPPER_VISIBLE_COUNT = 3;
export const STEP_PROGRESS_PARTIAL = 0.66;
export const STEPPER_ARIA_LABEL_DEFAULT = 'Progress';

export const STEP_STATUS = {
  complete: 'complete',
  current: 'current',
  upcoming: 'upcoming',
} as const;
export type StepStatus = (typeof STEP_STATUS)[keyof typeof STEP_STATUS];

// Screen-reader text; status is otherwise conveyed by colour / icon only.
export const STEP_STATUS_LABEL: Record<StepStatus, string> = {
  complete: 'Completed',
  current: 'Current',
  upcoming: 'Not started',
};

export const STEP_TITLE_BY_STATUS: Record<StepStatus, string> = {
  complete: STEP_TITLE_COMPLETED,
  current: STEP_TITLE_ACTIVE,
  upcoming: STEP_TITLE_PENDING,
};

export const UX_BLOCKS_TESTID = {
  progressFill: 'ux-blocks.stepper.progress-fill',
} as const;

export type StepId = string | number;

export type Step = {
  id: StepId;
  title: string;
  description?: string | null;
  icon?: string | null;
};

// Shared by every stepper. Current step is the v-model (a Step id).
export type StepperProps = {
  steps: readonly Step[];
  // Render steps as buttons that set the v-model.
  clickable?: boolean;
  // When clickable: only current + earlier steps are reachable.
  linear?: boolean;
  // Whole flow done: every step reads as complete.
  finished?: boolean;
  ariaLabel?: string;
};

export const STEPPER_DEMO_STEPS: readonly Step[] = [
  { id: 'sign-up', title: 'Sign Up', description: 'Create account', icon: 'user' },
  { id: 'plan', title: 'Plan Selection', description: 'Choose your plan', icon: 'clipboard' },
  { id: 'billing', title: 'Billing', description: 'Add payment', icon: 'id-card' },
  {
    id: 'activation',
    title: 'Activation',
    description: 'Start using the platform',
    icon: 'sparkles',
  },
];

// Longer flow for the windowed ProgressStepper.
export const STEPPER_DEMO_STEPS_LONG: readonly Step[] = [
  { id: 'account', title: 'Account Setup' },
  { id: 'sign-up', title: 'Sign Up' },
  { id: 'plan', title: 'Plan Selection' },
  { id: 'billing', title: 'Billing' },
  { id: 'payment', title: 'Payment' },
  { id: 'activation', title: 'Activation' },
];
