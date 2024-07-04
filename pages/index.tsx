import { client } from "@/apollo";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { GetPostListQuery, GetPostListQueryVariables } from "./gql/graphql";

const GET_POST_LIST_QUERY = gql`
  query getPostList {
    getPostList {
      posts {
        id
        title
        contents
        hits
        category {
          id
          categoryTitle
        }
        hashtags {
          id
          hashtag
        }
      }
    }
  }
`;

const Home = () => {
  return <>Hello Home!</>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.query<
      GetPostListQuery,
      GetPostListQueryVariables
    >({
      query: GET_POST_LIST_QUERY,
    });
    console.log(data);
    return {
      props: {
        posts: "TEST",
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default Home;
