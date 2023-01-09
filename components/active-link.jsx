"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ActiveLink({ href, text, ...rest }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-neutral-900 dark:text-neutral-50"
          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
      }
      {...rest}
    >
      {text}
    </Link>
  );
}
