/*******************************************************************
 * Copyright Z. Lyu (Fairydewstz). Licensed under the MIT License. *
 *******************************************************************/

/**
 * Specifies why an actor is being deleted/removed from a level
 */
export namespace EEndPlayReason {
  export enum Type {
    /** When the Actor or Component is explicitly destroyed. */
    Destroyed,
    /** When the world is being unloaded for a level transition. */
    LevelTransition,
    /** When the world is being unloaded because PIE is ending. */
    EndPlayInEditor,
    /** When the level it is a member of is streamed out. */
    RemovedFromWorld,
    /** When the application is being exited. */
    Quit,
  }
}
