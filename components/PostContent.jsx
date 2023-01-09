"use client";

import { MDXRemote } from "next-mdx-remote";
import Mdx from "../components/mdx";

/**
 * @typedef {object} PostContentProps
 * @property {any} source
 */

/**
 *
 * @param {PostContentProps} props
 */
export default function PostContent({ source }) {
  return <MDXRemote {...source} components={Mdx} />;
}
