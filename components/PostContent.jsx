"use client";

import { MDXRemote } from "next-mdx-remote";
import Mdx from "./Mdx";

/**
 * Props for the `PostContent` component.
 *
 * @typedef {object} PostContentProps
 * @property {any} source - Mdx raw source.
 */

/**
 * Renders `MDX` content.
 *
 * @param {PostContentProps} props - {@link PostContentProps}
 */
export default function PostContent({ source }) {
  return <MDXRemote {...source} components={Mdx} />;
}
