"use client";

import { FixedNameProps } from "../types";

export default function FixedName({ firstName, lastName }: FixedNameProps) {
  return (
    <h1>
      <div className="uppercase text-gray-400 dark:text-gray-600 font-doto fixed top-24 right-0 text-4xl md:text-8xl font-medium z-20 pointer-events-none select-none dark:text-white">
        {firstName}
      </div>
      <div className="uppercase text-gray-400 dark:text-gray-600 font-doto fixed left-0 top-1/2 -translate-y-1/2 text-4xl md:text-8xl font-bold z-20 pointer-events-none select-none dark:text-white">
        {lastName}
      </div>
    </h1>
  );
}
