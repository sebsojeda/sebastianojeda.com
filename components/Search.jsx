"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "../lib/useQuery";
import MagnifyingGlassIcon from "./icons/MagnifyingGlassIcon";

/**
 * An simple input used for search.
 */
export default function Search() {
  /** @type {import("react").MutableRefObject<HTMLInputElement | null>} */
  const inputRef = useRef(null);
  const setQuery = useQuery((state) => state.setQuery);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef?.current?.focus();
      }
    });

    return () => document.removeEventListener("keypress", () => {});
  }, []);

  return (
    <div className="my-16 flex">
      <div className="group flex border border-neutral-200 dark:border-neutral-700 rounded-lg dark:focus-within:border-neutral-50 focus-within:border-neutral-900">
        <div className="flex items-center justify-center text-neutral-200 dark:text-neutral-700 m-1 dark:group-focus-within:text-neutral-50 group-focus-within:text-neutral-900">
          <MagnifyingGlassIcon />
        </div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          className="bg-transparent outline-none placeholder:text-neutral-500"
        />
        <div className="select-none bg-neutral-100 dark:bg-neutral-800 py-1 px-2 m-1 rounded-lg text-neutral-200 dark:text-neutral-700 border dark:border-neutral-700 border-neutral-200">
          &#47;
        </div>
      </div>
    </div>
  );
}
