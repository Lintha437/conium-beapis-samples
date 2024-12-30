/*******************************************************************
 * Copyright Z. Lyu (Fairydewstz). Licensed under the MIT License. *
 *******************************************************************/

import { NObject } from "../../../CoreNObject/NObject/Object";
import { ELevelTick } from "./FrameworkBaseTypes";

export class NWorld extends NObject {
  /**
   * Update the level after a variable amount of time, DeltaSeconds, has passed.
   * All child actors are ticked after their owners have been ticked.
   */
  public tick(tickType: ELevelTick, deltaSeconds: number): void {}
}
