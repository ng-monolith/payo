export interface Post {
  id?: string;
  title: string;
  description: string;
  author: string;
  content: ContentDetail[];
}

export interface ContentDetail {
  title: string;
  description: string;
}
