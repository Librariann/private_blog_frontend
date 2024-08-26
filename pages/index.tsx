import { client } from "@/apollo";
import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import {
  GetPostListQuery,
  GetPostListQueryVariables,
} from "../src/gql/graphql";
import Posts from "@/components/posts";

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

export type postsProps = {
  id: number;
  title: string;
  contents: string;
  hits: number;
  category: {
    categoryTitle: string;
  };
  comments: {
    comment: string;
  };
  hashtags: {
    hashtag: string;
  };
};

const Home = () => {
  const { data, loading } = useQuery<GetPostListQuery>(GET_POST_LIST_QUERY, {
    ssr: false,
  });
  if (loading) return <div>Loading...</div>;
  return (
    <div className="p-10">
      <ul className="flex flex-wrap justify-start">
        {data?.getPostList?.posts?.map((post) => {
          return <Posts key={post.id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = client;
    await apolloClient.query({
      query: GET_POST_LIST_QUERY,
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default Home;
