"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Props for the `ActiveLink` component.
 *
 * @typedef {object} ActiveLinkProps
 * @property {string} href - The `href` for the link.
 * @property {string} text - Link text to render.
 */

/**
 * Emphasizes a link if it is currently active on the page.
 *
 * @param {ActiveLinkProps} props - {@link ActiveLinkProps}
 */
export default function ActiveLink({ href, text, ...rest }) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        path === href
          ? "text-neutral-900 dark:text-neutral-50"
          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50"
      }
      {...rest}
    >
      {text}
    </Link>
  );
}
