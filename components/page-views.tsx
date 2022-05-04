import { useEffect } from "react";
import useSWR from "swr";

type PageViewProps = {
  slug: string;
};

export default function PageViews(props: PageViewProps) {
  const { data, error } = useSWR(`/api/post-views?slug=${props.slug}`, (url) =>
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Error while fetching data.");
      }
      return res.json();
    })
  );

  useEffect(() => {
    const addView = async () => {
      await fetch("/api/view-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: props.slug }),
        credentials: "same-origin",
      });
    };
    addView();
  }, [props.slug]);

  return <span>{data && !error ? data.data.views : "---"} views</span>;
}
