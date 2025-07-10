export interface Blog{
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string | null;
  author_id: number;
  author_username: string;
  created_at: string;

}