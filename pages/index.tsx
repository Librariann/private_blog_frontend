import { createApolloClient } from "@/apollo";
import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
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
        category {
          categoryTitle
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
  category: {
    categoryTitle: string;
  };
  comments: {
    comment: string;
  }[]; // 배열 타입으로 수정
  hashtags: {
    hashtag: string;
  }[]; // 배열 타입으로 수정
};

const Home = ({ initialPosts }: { initialPosts: PostsProps[] }) => {
  const { data, loading, error, networkStatus } = useQuery<
    GetPostListQuery,
    GetPostListQueryVariables
  >(GET_POST_LIST_QUERY, {
    errorPolicy: "all",
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  const posts = data?.getPostList?.posts || initialPosts;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        게시물을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="p-10 text-center">게시물이 없습니다.</div>;
  }

  return (
    <div className="p-10">
      <ul className="flex flex-wrap justify-start">
        {posts?.map((post) => {
          return <Posts key={post.id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // 서버에서 새로운 Apollo Client 인스턴스 생성
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query({
      query: GET_POST_LIST_QUERY,
      fetchPolicy: "network-only", // 항상 최신 데이터
    });
    return {
      props: {
        initialPosts: data.getPostList.posts,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (error) {
    console.error("SSR Error:", error);
    return {
      props: {
        initialPosts: [],
        initialApolloState: {},
      },
    };
  }
};

export default Home;
