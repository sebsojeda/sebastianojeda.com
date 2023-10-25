import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';

/** @type {import('mdsvex').MDSvexOptions */
const mdsvexConfig = {
	extensions: ['.md'],
	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeKatexSvelte]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter()
	}
};

export default config;
