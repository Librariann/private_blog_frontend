import { client } from "@/apollo";
import { GET_CATEGORIES_COUNTS_QUERY } from "@/components/left-navigator";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
  GetPostListByCategoryIdQuery,
  GetPostListByCategoryIdQueryVariables,
} from "../gql/graphql";
import { gql } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

type Posts = {
  id: number;
  title: string;
  contents: string;
  category: {
    id: number;
  };
};

export const GET_POST_BY_CATEGORYID_QUERY = gql`
  query getPostListByCategoryId($categoryId: Int!) {
    getPostListByCategoryId(categoryId: $categoryId) {
      ok
      error
      posts {
        id
        title
        contents
        category {
          id
        }
      }
    }
  }
`;

const fetchCategories = async () => {
  const { data } = await client.query<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >({
    query: GET_CATEGORIES_COUNTS_QUERY,
  });
  return data.getCategoriesCounts.categoryCounts;
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

  const content = await fetchSomeDataById(category.id);

  return {
    props: {
      content,
    },
  };
};

const Contents = ({ content }: { content: Posts[] }) => {
  const router = useRouter();
  const { query } = router;

  if (content.length === 0) {
    return <p>No posts available.</p>;
  }
  return (
    <>
      {content.map((post) => {
        return (
          <Link key={post.id} href={`/${query.contents}/${post.id}`}>
            {post.title}
            {post.contents}
            {post.category.id}
          </Link>
        );
      })}
    </>
  );
};

export default Contents;
