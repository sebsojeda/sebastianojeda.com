"use client";

import useSWR from "swr";
import fetcher from "../lib/swr";

/**
 * @typedef {object} PageViewsProps
 * @property {string} slug
 */

/**
 *
 * @param {PageViewsProps} props
 */
export default function PageViews({ slug }) {
  const { data, isLoading, error } = useSWR(
    `/api/get-article-hits?slug=${slug}`,
    fetcher
  );
  if (isLoading || error) {
    return <span>&mdash; views</span>;
  }

  return <span>{data.hits} views</span>;
}
