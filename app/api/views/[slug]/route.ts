import { NextResponse } from "next/server";
import { getPosts } from "@/lib/get-posts";
import { kv } from "@/lib/kv";

let validSlugsCache: Set<string> | null = null;

async function getValidSlugs(): Promise<Set<string>> {
	if (!validSlugsCache) {
		const posts = await getPosts();
		validSlugsCache = new Set(posts.map((post) => post.slug));
	}
	return validSlugsCache;
}

async function isValidSlug(slug: string): Promise<boolean> {
	const validSlugs = await getValidSlugs();
	return validSlugs.has(slug);
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;

	if (!(await isValidSlug(slug))) {
		return NextResponse.json({ error: "Invalid slug" }, { status: 404 });
	}

	try {
		if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
			return NextResponse.json({ views: 0 }, { status: 200 });
		}

		const views = (await kv.get<number>(`views:${slug}`)) || 0;
		return NextResponse.json({ views }, { status: 200 });
	} catch (error) {
		console.error("Failed to get views:", error);
		return NextResponse.json({ views: 0 }, { status: 200 });
	}
}

export async function POST(
	_request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params;

	if (!(await isValidSlug(slug))) {
		return NextResponse.json({ error: "Invalid slug" }, { status: 404 });
	}

	try {
		if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
			return NextResponse.json({ views: 1 }, { status: 200 });
		}

		const views = await kv.incr(`views:${slug}`);
		return NextResponse.json({ views }, { status: 200 });
	} catch (error) {
		console.error("Failed to increment views:", error);
		return NextResponse.json({ views: 1 }, { status: 200 });
	}
}
