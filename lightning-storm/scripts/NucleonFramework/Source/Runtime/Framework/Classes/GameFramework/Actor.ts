/*******************************************************************
 * Copyright Z. Lyu (Fairydewstz). Licensed under the MIT License. *
 *******************************************************************/

import { NObject } from "../../../CoreNObject/NObject/Object";
import { EEndPlayReason } from "../Framework/FrameworkTypes";

export class AActor extends NObject {
  public constructor() {
    super();
    return;
  }

  public tick(deltaSeconds: number): void {
    return;
  };

  protected beginPlay(): void {
    return;
  }

  protected endPlay(endPlayReason: EEndPlayReason.Type): void {
    return;
  }
}
