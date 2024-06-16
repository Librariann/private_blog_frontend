import { client } from "@/apollo";
import { GET_CATEGORIES_COUNTS_QUERY } from "@/components/left-navigator";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "../gql/graphql";
import { gql } from "@apollo/client";

export const GET_POST_BY_CATEGORYID_QUERY = gql`
  query getCategoriesCounts {
    getCategoriesCounts {
      ok
      categoryCounts {
        id
        categoryTitle
        count
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

// const fetchSomeDataById = async (categoryId:number) => {
//     const {data} = await client.query({
//         query:
//     })
// }

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
    fallback: false, // 없는 경로에 대해 404 반환
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { contents } = params!;
  console.log(params);

  const categories = await fetchCategories();
  const category = categories?.find(
    (category) => category.categoryTitle === contents
  );

  if (!category) {
    return {
      notFound: true,
    };
  }

  // 유효한 콘텐츠를 불러오는 로직
  const content = `Content for ${contents}`;

  return {
    props: {
      content,
    },
  };
};

const Contents = ({ content }: { content: string }) => {
  return <div className="">{content}</div>;
};

export default Contents;
