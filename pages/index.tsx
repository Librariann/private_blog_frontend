import { client } from "@/apollo";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
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

const Home = ({ posts }: { posts: PostsProps[] }) => {
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
    const apolloClient = client;
    const { data } = await apolloClient.query({
      query: GET_POST_LIST_QUERY,
    });
    return {
      props: {
        posts: data.getPostList.posts,
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
