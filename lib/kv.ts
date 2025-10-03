import type { VercelKV } from "@vercel/kv";
import { createClient } from "@vercel/kv";

let kvInstance: VercelKV | null = null;

function getKV(): VercelKV {
	if (kvInstance) {
		return kvInstance;
	}

	const kvRestApiUrl = process.env.KV_REST_API_URL;
	const kvRestApiToken = process.env.KV_REST_API_TOKEN;

	if (!kvRestApiUrl || !kvRestApiToken) {
		throw new Error(
			"Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variable",
		);
	}

	kvInstance = createClient({
		url: kvRestApiUrl,
		token: kvRestApiToken,
	});

	return kvInstance;
}

export const kv = new Proxy({} as VercelKV, {
	get(_target, prop) {
		return getKV()[prop as keyof VercelKV];
	},
});
