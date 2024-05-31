import type { PostDetail } from './types';

export async function getPost(slug: string): Promise<PostDetail> {
	const module = await import(`../content/${slug}.md`);
	return {
		component: module.default,
		metadata: module.metadata,
		slug
	};
}
