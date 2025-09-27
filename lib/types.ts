export type FrontMatter = {
  title: string;
  description: string;
  date: Date;
};

export type PostDetail = {
  component: React.FC<{ post: PostDetail }>;
  metadata: FrontMatter;
  slug: string;
};

export type PostList = {
  metadata: FrontMatter;
  slug: string;
}[];
