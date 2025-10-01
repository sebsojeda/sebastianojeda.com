import { createClient } from "@vercel/kv";

const kvRestApiUrl = process.env.KV_REST_API_URL;
const kvRestApiToken = process.env.KV_REST_API_TOKEN;

if (!kvRestApiUrl || !kvRestApiToken) {
	throw new Error(
		"Missing KV_REST_API_URL or KV_REST_API_TOKEN environment variable",
	);
}

export const kv = createClient({
	url: kvRestApiUrl,
	token: kvRestApiToken,
});
