import { describe, it, expect } from 'vitest';
import { STEP_PROGRESS_PARTIAL, STEPPER_VISIBLE_COUNT } from '@/constants/ux-blocks';
import { canShiftWindow, stepProgressPercent, windowStartForActive } from '@/utils/stepper';

describe('stepProgressPercent', () => {
  it('returns 0 for an empty list', () => {
    expect(stepProgressPercent([], STEP_PROGRESS_PARTIAL)).toBe(0);
  });

  it('returns 0 when none are complete and none are active', () => {
    expect(
      stepProgressPercent(
        [
          { completed: false, active: false },
          { completed: false, active: false },
        ],
        STEP_PROGRESS_PARTIAL,
      ),
    ).toBe(0);
  });

  it('returns 100 when every step is complete', () => {
    expect(
      stepProgressPercent(
        [
          { completed: true, active: false },
          { completed: true, active: true },
        ],
        STEP_PROGRESS_PARTIAL,
      ),
    ).toBe(100);
  });

  it('returns the completed-only ratio when there is no incomplete active step', () => {
    expect(
      stepProgressPercent(
        [
          { completed: true, active: false },
          { completed: true, active: false },
          { completed: false, active: false },
          { completed: false, active: false },
        ],
        STEP_PROGRESS_PARTIAL,
      ),
    ).toBe(50);
  });

  it('adds a partial fill of one step width when the active step is incomplete', () => {
    expect(
      stepProgressPercent(
        [
          { completed: true, active: false },
          { completed: true, active: false },
          { completed: false, active: true },
          { completed: false, active: false },
        ],
        STEP_PROGRESS_PARTIAL,
      ),
    ).toBe(2 * 25 + 25 * STEP_PROGRESS_PARTIAL);
  });
});

describe('windowStartForActive', () => {
  const visible = STEPPER_VISIBLE_COUNT;

  it('returns 0 when no step is active', () => {
    expect(windowStartForActive(-1, 6, visible)).toBe(0);
  });

  it('clamps to the start when the active step is first', () => {
    expect(windowStartForActive(0, 6, visible)).toBe(0);
  });

  it('centers the active step in the window', () => {
    expect(windowStartForActive(2, 6, visible)).toBe(1);
  });

  it('clamps to the end so the window stays full', () => {
    expect(windowStartForActive(5, 6, visible)).toBe(3);
  });
});

describe('canShiftWindow', () => {
  const visible = STEPPER_VISIBLE_COUNT;
  const total = 6;

  it('allows next while the window has not reached the end', () => {
    expect(canShiftWindow(0, 1, total, visible)).toBe(true);
    expect(canShiftWindow(2, 1, total, visible)).toBe(true);
  });

  it('blocks next at the last full window', () => {
    expect(canShiftWindow(3, 1, total, visible)).toBe(false);
  });

  it('allows prev while start is past 0', () => {
    expect(canShiftWindow(1, -1, total, visible)).toBe(true);
  });

  it('blocks prev at the start', () => {
    expect(canShiftWindow(0, -1, total, visible)).toBe(false);
  });
});
