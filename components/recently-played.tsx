import Image from "next/image";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function RecentlyPlayed() {
  const { data, error } = useSWR("/api/recently-played", fetcher);
  const loader = ({ src, width }: any) => `${src}/${width}x${width}bb.jpg`;

  if (error) {
    <div>Unable to fetch recently played</div>;
  }

  return (
    <a
      href={data?.data?.url ?? "#"}
      className="inline-grid grid-cols-[52px_1fr] gap-2"
    >
      <Image
        height={52}
        width={52}
        loader={data?.data ? loader : undefined}
        src={data?.data?.artwork ?? "/images/apple-music-icon.svg"}
        alt={data?.data ? `${data.data.name} by ${data.data.artistName}` : ""}
        className="rounded-lg"
      />
      <div className="overflow-hidden">
        <div className="font-bold text-sm">Recently Played</div>
        <div className="text-xs">{data?.data?.name ?? "Not Playing"}</div>
        <div className="text-xs text-accent-5 whitespace-nowrap overflow-hidden text-ellipsis">
          {data?.data
            ? `${data.data.artistName} - ${data.data.albumName}`
            : "..."}
        </div>
      </div>
    </a>
  );
}
