import { createApolloClient } from "@/apollo";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import Posts from "@/components/posts";
import { GetPostListQuery, GetPostListQueryVariables } from "@/gql/graphql";

export const GET_POST_LIST_QUERY = gql`
  query getPostList {
    getPostList {
      posts {
        id
        title
        contents
        hits
        thumbnailUrl
        category {
          id
          categoryTitle
          parentCategoryId
        }
        comments {
          comment
        }
        hashtags {
          hashtag
        }
      }
    }
  }
`;

export type PostsProps = {
  id: number;
  title: string;
  contents: string;
  hits: number;
  thumbnailUrl?: string | null;
  category: {
    categoryTitle: string;
    parentCategoryTitle: string;
  };
  comments: {
    comment?: string | null;
  }[]; // 배열 타입으로 수정
  hashtags: {
    hashtag?: string | null;
  }[]; // 배열 타입으로 수정
};

const Home = ({ posts }: { posts: PostsProps[] }) => {
  if (!posts || posts.length === 0) {
    return <div className="p-10 text-center">게시물이 없습니다.</div>;
  }

  return (
    <div className="p-10">
      <ul className="flex flex-wrap justify-start">
        {posts.map((post) => {
          return <Posts key={post.id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetPostListQuery,
      GetPostListQueryVariables
    >({
      query: GET_POST_LIST_QUERY,
      fetchPolicy: "network-only",
    });

    return {
      props: {
        posts: data.getPostList.posts || [],
      },
      revalidate: 60, // 60초마다 재생성
    };
  } catch (error) {
    console.error("ISR Error:", error);
    return {
      props: {
        posts: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;
