"use client";

import useSWR from "swr";
import fetcher from "../lib/swr";
import HeartFillIcon from "./icons/HeartFillIcon";
import HeartIcon from "./icons/HeartIcon";

/**
 * Props for the `PostLikes` component.
 *
 * @typedef PostLikesProps
 * @property {string} slug - The article slug.
 */

/**
 * The number of likes given to an article.
 *
 * @param {PostLikesProps} props - {@link PostLikesProps}
 */
export default function PostLikes({ slug }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-article-likes?slug=${slug}`,
    fetcher
  );

  /**
   * Makes an API call to like the article and updates the UI if successful.
   */
  async function handleLike() {
    if (!data.hasLiked) {
      await fetch("/api/like-article", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate({ likes: data.likes + 1, hasLiked: true });
    }
  }

  if (error || isLoading) {
    // If unable to get number of likes for whatever reason, do not render the component.
    return null;
  }

  return (
    <>
      {" "}
      •{" "}
      <span>
        <button onClick={handleLike}>
          {data.hasLiked ? (
            <HeartFillIcon size={18} />
          ) : (
            <HeartIcon size={18} />
          )}
        </button>{" "}
        {data.likes} {data.likes === 1 ? "like" : "likes"}
      </span>
    </>
  );
}
