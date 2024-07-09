import { client } from "@/apollo";
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { GetPostListQuery, GetPostListQueryVariables } from "./gql/graphql";
import Link from "next/link";

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
        hashtags {
          hashtag
        }
      }
    }
  }
`;

type postsProps = {
  id: number;
  title: string;
  contents: string;
  hits: number;
  category: {
    categoryTitle: string;
  };
  hashtags: {
    hashtag: string;
  };
};

const Home = ({ posts }: { posts: postsProps[] }) => {
  return (
    <div>
      {posts.map((v) => {
        return (
          <div key={v.id}>
            <ul>
              <li>
                <Link href={`/${v.category.categoryTitle}/${v.id}`}>
                  {v.title}&nbsp;{v.hits}
                </Link>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.query<
      GetPostListQuery,
      GetPostListQueryVariables
    >({
      query: GET_POST_LIST_QUERY,
    });
    return {
      props: {
        posts: data.getPostList.posts,
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default Home;
