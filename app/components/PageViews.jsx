"use client";

import useSWR from "swr";
import fetcher from "../../lib/swr";

/**
 * Props for the `PageViews` component.
 *
 * @typedef {object} PageViewsProps
 * @property {string} slug - The article `slug`.
 */

/**
 * Fetches the number of views for a given article.
 *
 * @param {PageViewsProps} props - {@link PageViewsProps}
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
