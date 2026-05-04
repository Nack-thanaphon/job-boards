import * as React from "react";

import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border border-zinc-200 bg-white", className)}
      {...props}
    />
  );
}
