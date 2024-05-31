import type { ComponentType } from 'svelte';

export type FrontMatter = {
	title: string;
	description: string;
	date: string;
};

export type PostDetail = {
	component: ComponentType;
	metadata: FrontMatter;
	slug: string;
};

export type PostList = {
	metadata: FrontMatter;
	slug: string;
}[];
