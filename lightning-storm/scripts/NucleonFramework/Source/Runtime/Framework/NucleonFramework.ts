/*******************************************************************
 * Copyright Z. Lyu (Fairydewstz). Licensed under the MIT License. *
 *******************************************************************/

import { system } from "@minecraft/server";

import { NWorld } from "./Classes/Framework/World";
import { ELevelTick } from "./Classes/Framework/FrameworkBaseTypes";

export class NFramework {
  private nWorld: NWorld;

  private lastTickTime: number;
  private currentTime: number;
  private deltaSeconds: number;

  public constructor() {
    this.nWorld = new NWorld();

    this.lastTickTime = Date.now();
    this.currentTime = 0;
    this.deltaSeconds = 0;

    system.runInterval(() => {
      this.currentTime = Date.now();
      this.deltaSeconds = (this.currentTime - this.lastTickTime) / 1000; // Calculate deltaTime in seconds
      this.lastTickTime = this.currentTime;
      this.tick(this.deltaSeconds);
    }, 1);

    return;
  }

  private tick(deltaSeconds: number): void {
    this.nWorld.tick(ELevelTick.LEVELTICK_All, deltaSeconds);

    return;
  }
}
