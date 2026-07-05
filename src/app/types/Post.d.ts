export type Post = {
  id: number;
  gid?: number;
  user: string;
  init: string;
  body: string;
  time: string;
  likes: number;
  liked: boolean;
  replies: number;
  color: string;
};
