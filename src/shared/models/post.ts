export interface Post {
  id: number;
  title: string;
  description: string;
  author: string;
  content: ContentDetail[];
}

export interface ContentDetail {
  title: string;
  description: string;
}
