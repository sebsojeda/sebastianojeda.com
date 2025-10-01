export type FrontMatter = {
	title: string;
	description: string;
	date: Date;
};

export type PostDetail = {
	content: string;
	metadata: FrontMatter;
	slug: string;
};

export type PostList = {
	metadata: FrontMatter;
	slug: string;
}[];
