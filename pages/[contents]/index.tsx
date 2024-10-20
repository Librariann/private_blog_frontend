import { client } from "@/apollo";
import { GET_CATEGORIES_COUNTS_QUERY } from "@/components/left-navigator";
import { GetStaticPaths, GetStaticProps } from "next";
import { gql } from "@apollo/client";
import Posts from "@/components/posts";
import { PostsProps } from "@/pages";
import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
  GetPostListByCategoryIdQuery,
  GetPostListByCategoryIdQueryVariables,
} from "@/gql/graphql";

export const GET_POST_BY_CATEGORYID_QUERY = gql`
  query getPostListByCategoryId($categoryId: Int!) {
    getPostListByCategoryId(categoryId: $categoryId) {
      ok
      error
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

const fetchCategories = async () => {
  try {
    const { data } = await client.query<
      GetCategoriesCountsQuery,
      GetCategoriesCountsQueryVariables
    >({
      query: GET_CATEGORIES_COUNTS_QUERY,
      fetchPolicy: "cache-first", // 캐시 우선 정책 적용
    });

    if (!data?.getCategoriesCounts?.categoryCounts) {
      throw new Error("카테고리 데이터를 가져오는데 실패했습니다.");
    }

    return data.getCategoriesCounts.categoryCounts;
  } catch (error) {
    console.error("카테고리 조회 중 오류 발생:", error);
    return [];
  }
};

const fetchSomeDataById = async (categoryId: number) => {
  const { data } = await client.query<
    GetPostListByCategoryIdQuery,
    GetPostListByCategoryIdQueryVariables
  >({
    query: GET_POST_BY_CATEGORYID_QUERY,
    variables: { categoryId },
  });

  return data.getPostListByCategoryId?.posts;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // 데이터 소스에서 모든 카테고리 가져오기
  const categories = await fetchCategories();
  if (!categories) {
    throw new Error("category error!");
  }

  // 카테고리마다 경로 생성
  const paths = categories.map((category) => ({
    params: { contents: category.categoryTitle },
  }));

  return {
    paths,
    fallback: true, // 없는 경로에 대해 404 반환
  };
};

//TODO: 현재 데이터 불러오는 부분 index.tsx처럼 맞춰서 진행할것
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { contents } = params!;
  const categories = await fetchCategories();
  const category = categories?.find(
    (category) => category.categoryTitle === contents
  );

  if (!category) {
    return {
      notFound: true,
    };
  }

  const posts = await fetchSomeDataById(category.id);
  return {
    props: {
      posts,
    },
  };
};

const Contents = ({ posts }: { posts: PostsProps[] }) => {
  if (posts !== undefined && posts.length === 0) {
    return <p>No posts available.</p>;
  }
  return (
    <>
      <div className="p-10">
        <ul className="flex flex-wrap justify-start">
          {posts !== undefined &&
            posts.map((post) => {
              return <Posts key={post.id} post={post} />;
            })}
        </ul>
      </div>
    </>
  );
};

export default Contents;
