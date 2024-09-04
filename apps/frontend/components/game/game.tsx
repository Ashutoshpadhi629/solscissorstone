import * as React from "react";
import { Moves } from "./moves";
import { OpponentCard } from "./opponent-card";
import { PlayerCard } from "./player-card";

export function Game() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-3/4 h-3/4 bg-slate-200 dark:bg-slate-950 rounded-lg bg-opacity-60 dark:bg-opacity-60 text-center">
        <h1 className="pt-4">SOL SCISSORS STONE</h1>
        <div className="sm:flex max-sm:flex-col sm:justify-between pl-2 pr-2 sm:p-10 space-y-4">
          <PlayerCard />
          <Moves />
          <OpponentCard />
        </div>
      </div>
    </div>
  );
}
