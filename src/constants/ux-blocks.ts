// Success fill for completed / active stepper surfaces (not idle).

export const STEP_COMPLETED_SURFACE =
  'border-success-600 bg-success-500 dark:border-success-400 dark:bg-success-600';
export const STEP_COMPLETED_TRACK = 'bg-success-500 dark:bg-success-400';
export const STEP_ACTIVE_BORDER = 'border-success-600 dark:border-success-400';
export const STEP_CHECK = 'text-success-500 dark:text-success-400';

export const STEP_TITLE_ACTIVE = 'text-success-600 dark:text-success-300';
export const STEP_TITLE_IDLE = 'text-grey-900 dark:text-white';
export const STEP_TITLE_COMPLETED = 'text-grey-900 dark:text-grey-100';
export const STEP_TITLE_PENDING = 'text-grey-500 dark:text-grey-400';

export const STEPPER_FRAME = 'bg-white p-8 dark:bg-grey-950 md:p-12 lg:p-20';

export const STEPPER_VISIBLE_COUNT = 3;
export const STEP_PROGRESS_PARTIAL = 0.66;

export const UX_BLOCKS_TESTID = {
  progressFill: 'ux-blocks.stepper.progress-fill',
} as const;

export type PanelStep = {
  title: string;
  subtitle: string;
  icon: string;
  active: boolean;
  completed: boolean;
};

export type ProgressStep = {
  id: number;
  title: string;
  completed: boolean;
  active: boolean;
};
