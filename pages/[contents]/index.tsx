import { createApolloClient } from "@/apollo";
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetCategoriesCountsQuery,
      GetCategoriesCountsQueryVariables
    >({
      query: GET_CATEGORIES_COUNTS_QUERY,
      fetchPolicy: "network-only",
    });

    const categories = data?.getCategoriesCounts?.categoryCounts || [];
    const paths = categories.map((category) => ({
      params: { contents: category.categoryTitle },
    }));

    return {
      paths,
      fallback: "blocking", // 새 카테고리는 on-demand로 생성
    };
  } catch (error) {
    console.error("getStaticPaths Error:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { contents } = params!;

  try {
    const apolloClient = createApolloClient();

    const { data: categoryData } = await apolloClient.query<
      GetCategoriesCountsQuery,
      GetCategoriesCountsQueryVariables
    >({
      query: GET_CATEGORIES_COUNTS_QUERY,
      fetchPolicy: "network-only",
    });

    const categories = categoryData?.getCategoriesCounts?.categoryCounts;
    const category = categories?.find(
      (category) => category.categoryTitle === contents
    );

    if (!category) {
      return {
        notFound: true,
      };
    }

    const { data: postsData } = await apolloClient.query<
      GetPostListByCategoryIdQuery,
      GetPostListByCategoryIdQueryVariables
    >({
      query: GET_POST_BY_CATEGORYID_QUERY,
      variables: { categoryId: category.id },
      fetchPolicy: "network-only",
    });

    return {
      props: {
        posts: postsData.getPostListByCategoryId?.posts || [],
        categoryId: category.id,
      },
      revalidate: 60, // 60초마다 재생성
    };
  } catch (error) {
    console.error("getStaticProps Error:", error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

const Contents = ({ posts }: { posts: PostsProps[] }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="p-10 text-center">
        해당 카테고리에 게시물이 없습니다.
      </div>
    );
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

export default Contents;
