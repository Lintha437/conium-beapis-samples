/*******************************************************************
 * Copyright Z. Lyu (Fairydewstz). Licensed under the MIT License. *
 *******************************************************************/

/**
 * Type of tick we wish to perform on the level
 */
export enum ELevelTick {
  /** Update the level time only. */
  LEVELTICK_TimeOnly = 0,
  /** Update time and viewports. */
  LEVELTICK_ViewportsOnly = 1,
  /** Update all. */
  LEVELTICK_All = 2,
  /** Delta time is zero, we are paused. Components don't tick. */
  LEVELTICK_PauseTick = 3,
}
