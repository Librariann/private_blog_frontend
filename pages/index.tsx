import { createApolloClient } from "@/apollo";
import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Posts from "@/components/posts";
import PostListSkeleton from "@/components/skeleton/post-list-skeleton";
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
  thumbnailUrl?: string | null;
  category: {
    categoryTitle: string;
  };
  comments: {
    comment?: string | null;
  }[]; // 배열 타입으로 수정
  hashtags: {
    hashtag?: string | null;
  }[]; // 배열 타입으로 수정
};

const Home = ({ initialPosts }: { initialPosts: PostsProps[] }) => {
  const { data, error } = useQuery<
    GetPostListQuery,
    GetPostListQueryVariables
  >(GET_POST_LIST_QUERY, {
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  const posts = data?.getPostList?.posts || initialPosts;

  if (error) {
    return (
      <div className="p-10 text-center">
        게시물을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (posts.length === 0 || !posts) {
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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set cache headers
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

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
