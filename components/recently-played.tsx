import { css } from "@emotion/react";
import Image from "next/image";
import useSWR from "swr";

const Styles = {
  wrapper: css`
    background-color: var(--color-accent-1);
  `,
  image: css`
    border-radius: 10px;
  `,
  sectionName: css`
    font-weight: 900;
    margin-bottom: 0.225rem;
  `,
  song: css`
    font-size: 0.75rem;
  `,
  artist: css`
    font-size: 0.75rem;
    color: var(--color-accent-5);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  gridContainer: css`
    text-decoration: none;
    color: var(--color-foreground);
    font-size: 1rem;
    :hover {
      cursor: pointer;
    }
    display: inline-grid;
    grid-template-columns: 50px 1fr;
  `,
  songInfo: css`
    margin-left: 0.5rem;
    overflow: hidden;
  `,
};

export default function RecentlyPlayed() {
  const { data, error } = useSWR("/api/recently-played", (url) =>
    fetch(url, { method: "GET", credentials: "same-origin" }).then((res) =>
      res.json()
    )
  );

  const artworkLoader = ({ src, width }: { src: string; width: number }) => {
    return `${src}/${width}x${width}bb.jpg`;
  };

  if (error) {
    <div>Unable to fetch recently played</div>;
  }

  return (
    <div css={Styles.wrapper}>
      <a href={data?.data.url ?? "#"} css={Styles.gridContainer}>
        <Image
          height={50}
          width={50}
          loader={data?.data ? artworkLoader : undefined}
          src={data?.data.artwork ?? "/images/apple-music-icon.svg"}
          alt={data?.data ? `${data.data.name} by ${data.data.artistName}` : ""}
          css={Styles.image}
        />
        <div css={Styles.songInfo}>
          <div css={Styles.sectionName}>Recently Played</div>
          <div css={Styles.song}>{data?.data.name ?? "Not Playing"}</div>
          <div css={Styles.artist}>
            {data?.data
              ? `${data.data.artistName} - ${data.data.albumName}`
              : "..."}
          </div>
        </div>
      </a>
    </div>
  );
}
