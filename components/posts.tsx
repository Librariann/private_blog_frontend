import { client } from "@/apollo";
import { GET_POST_LIST_QUERY } from "@/pages";
import { PostsProps } from "@/pages/[contents]";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";

const Posts = (post: PostsProps) => {
  console.log(post);
  return <div>Hello Posts!</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await client.query({
      query: GET_POST_LIST_QUERY,
    });

    return {
      props: {
        post: data,
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default Posts;
