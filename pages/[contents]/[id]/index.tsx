import { GetServerSideProps } from "next";
import { client } from "@/apollo"; // Apollo Client 설정 파일
import { gql } from "@apollo/client";
import { GetPostByIdQuery, GetPostByIdQueryVariables } from "@/src/gql/graphql";

export type PostProps = {
  post: {
    id: number;
    title: string;
    contents: string;
    hits: number;
    comments: {
      comment: string;
    };
    category: {
      categoryTitle: string;
    };
    hashtags: {
      hashtag: string;
    };
  };
};

export const GET_POST_BY_ID_QUERY = gql`
  query getPostById($postId: Int!) {
    getPostById(postId: $postId) {
      ok
      post {
        id
        title
        contents
        hits
      }
    }
  }
`;

const PostDetail = ({ post }: PostProps) => {
  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.contents}</h1>
      <h1>{post.hits}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const postId = Number(params?.id); // URL에서 postId를 추출합니다.

  try {
    const { data } = await client.query<
      GetPostByIdQuery,
      GetPostByIdQueryVariables
    >({
      query: GET_POST_BY_ID_QUERY,
      variables: { postId },
    });
    if (!data.getPostById?.ok) {
      return {
        notFound: true, // 포스트가 없으면 404 페이지로 리디렉션합니다.
      };
    }

    return {
      props: {
        post: data.getPostById.post,
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default PostDetail;
