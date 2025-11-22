"use client";

import { FixedNameProps } from "../types";

export default function FixedName({ firstName, lastName }: FixedNameProps) {
  return (
    <>
      <div className="uppercase fixed top-24 right-0 text-4xl md:text-8xl font-medium z-50 pointer-events-none select-none dark:text-white">
        {firstName}
      </div>
      <div className="uppercase fixed left-0 top-1/2 -translate-y-1/2 text-4xl md:text-8xl font-bold z-50 pointer-events-none select-none dark:text-white">
        {lastName}
      </div>
    </>
  );
}
