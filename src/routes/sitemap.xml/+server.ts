import * as config from '$lib/config';
import { getPosts } from '$lib/getPosts';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();

	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
      <url>
        <loc>${config.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${config.url}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
			${posts
				.map((post) => {
					return `
          <url>
            <loc>${config.url}/${post.slug}</loc>
            <lastmod>${post.date}</lastmod>
          </url>`;
				})
				.join('')}
		</urlset>`.trim(),
		{
			headers: {
				'Cache-Control': 'max-age=0, s-maxage=3600',
				'Content-Type': 'application/xml'
			}
		}
	);
}
