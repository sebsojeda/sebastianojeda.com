import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Heart from "./icons/heart";
import HeartFill from "./icons/heart-fill";

type LikesProps = {
  slug: string;
};

const Styles = {
  container: css`
    position: fixed;
    width: 100%;
    border: 1px solid red;
    left: 0;
    top: 50vh;
  `,
  wrapper: css`
    max-width: 58rem;
    margin: auto;
    padding: 0 1.25rem;
    border: 1px solid green;
  `,
  likes: css`
    border: 1px solid blue;
  `,
};

export default function Likes(props: LikesProps) {
  const [state, setState] = useState<any>({
    error: null,
    loading: true,
    likes: 0,
    hasLiked: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/post-likes?slug=${props.slug}`, {
          method: "GET",
          credentials: "same-origin",
        });
        const data = await res.json();
        setState((prevState: any) => ({ ...prevState, ...data.data }));
      } catch (error) {
        setState((prevState: any) => ({ ...prevState, error }));
      } finally {
        setState((prevState: any) => ({ ...prevState, loading: false }));
      }
    };
    fetchData();
  }, [props.slug]);

  if (state.loading) {
    return null;
  }

  const handleLike = async () => {
    if (!state.hasLiked) {
      await fetch("/api/like-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: props.slug }),
        credentials: "same-origin",
      });
      setState((prevState) => ({
        ...prevState,
        likes: prevState.likes + 1,
        hasLiked: true,
      }));
    }
  };

  return null;

  return (
    <div css={Styles.container}>
      <div css={Styles.wrapper}>
        <div css={Styles.likes}>
          <button onClick={handleLike}>
            {state.hasLiked ? <HeartFill /> : <Heart />}
          </button>
          <div>{state.likes}</div>
        </div>
      </div>
    </div>
  );
}
