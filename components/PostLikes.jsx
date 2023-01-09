"use client";

import useSWR from "swr";
import fetcher from "../lib/swr";
import Heart from "./icons/heart";
import HeartFill from "./icons/heart-fill";

/**
 *
 * @typedef PostLikeProps
 * @property {string} slug
 */

/**
 * @param {PostLikeProps} props
 */
export default function PostLikes({ slug }) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/get-article-likes?slug=${slug}`,
    fetcher
  );

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
    return null;
  }

  return (
    <>
      {" "}
      •{" "}
      <span>
        <button onClick={handleLike}>
          {data.hasLiked ? <HeartFill size={18} /> : <Heart size={18} />}
        </button>{" "}
        {data.likes} {data.likes === 1 ? "like" : "likes"}
      </span>
    </>
  );
}
