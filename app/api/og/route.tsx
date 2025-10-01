import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const title = searchParams.get("title") || "Sebastian Ojeda";

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#09090b",
				fontSize: 60,
				fontWeight: 700,
			}}
		>
			<div
				style={{
					color: "#fafafa",
					marginBottom: 30,
					textAlign: "center",
					maxWidth: "80%",
					lineHeight: 1.2,
				}}
			>
				{title}
			</div>
			<div
				style={{
					color: "#a1a1aa",
					fontSize: 30,
					fontWeight: 400,
				}}
			>
				sebastianojeda.com
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
}
