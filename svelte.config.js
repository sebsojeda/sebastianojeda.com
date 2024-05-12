import rehypeFigure from '@microflash/rehype-figure';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

/** @type {import('mdsvex').MDSvexOptions */
const mdsvexConfig = {
	extensions: ['.md'],
	remarkPlugins: [remarkMath, remarkToc, relativeImages],
	rehypePlugins: [rehypeFigure, rehypeKatexSvelte]
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
