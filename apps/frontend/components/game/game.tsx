import * as React from "react";

import { Card } from "@/components/ui/card";
import { Moves } from "./moves";

export function Game() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-3/4 h-3/4 bg-slate-200 dark:bg-slate-950 rounded-lg bg-opacity-60 dark:bg-opacity-60 text-center">
        <h1 className="pt-4">SOL SCISSORS STONE</h1>
        <div className="sm:flex max-sm:flex-col sm:justify-between pl-2 pr-2 sm:p-10 space-y-4">
          <div className="mt-4">
            <h2> YOU</h2>
            <Card className="flex min-w-56 min-h-56 bg-slate-300 dark:bg-slate-950"></Card>
          </div>
          <div>
            <Moves />
            <p className="font-thin p-2"> Select your Move</p>
          </div>
          <div>
            <h2> OPPONENT</h2>
            <Card className="flex min-w-56 min-h-56 bg-slate-300 dark:bg-slate-950"></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
