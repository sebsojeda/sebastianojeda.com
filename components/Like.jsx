"use client";

import { useState } from "react";
import Heart from "./icons/heart";
import HeartFill from "./icons/heart-fill";

export default function Like({ likes, slug }) {
  const [hasLiked, setHasLiked] = useState(likes);

  async function handleLike() {
    if (hasLiked) {
      await fetch("/api/unlikePost", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHasLiked(false);
    } else {
      await fetch("/api/likePost", {
        method: "POST",
        body: JSON.stringify({ slug }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHasLiked(true);
    }
  }

  return (
    <button onClick={handleLike}>{hasLiked ? <HeartFill /> : <Heart />}</button>
  );
}
