import { PostsProps } from "@/pages/[contents]";

const Posts = (post: PostsProps) => {
  console.log(post);
  return <div>Hello Posts!</div>;
};

export default Posts;
