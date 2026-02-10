export interface ArticleBlock {
  type: 'intro' | 'h2' | 'paragraph' | 'quote' | 'callout';
  text: string;
  author?: string;
  title?: string;
}

export interface ArticleData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  heroImage: string;
  content: ArticleBlock[];
  relatedListingsCount: number;
}
