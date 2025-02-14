import { createApolloClient } from "@/apollo";
import { GET_CATEGORIES_COUNTS_QUERY } from "@/components/left-navigator";
import { GetServerSideProps } from "next";
import { gql, useQuery } from "@apollo/client";
import Posts from "@/components/posts";
import { PostsProps } from "@/pages";
import { useRouter } from "next/router";
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { contents } = params!;

  try {
    // 서버에서 새로운 Apollo Client 인스턴스 생성
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
        initialPosts: postsData.getPostListByCategoryId?.posts || [],
        categoryId: category.id,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } catch (error) {
    console.error("SSR Error (Category):", error);
    return {
      notFound: true,
    };
  }
};

const Contents = ({
  initialPosts,
  categoryId,
}: {
  initialPosts: PostsProps[];
  categoryId: number;
}) => {
  const { data, loading, error } = useQuery<
    GetPostListByCategoryIdQuery,
    GetPostListByCategoryIdQueryVariables
  >(GET_POST_BY_CATEGORYID_QUERY, {
    variables: { categoryId },
    fetchPolicy: "cache-first",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      console.error("❌ Query error:", error);
    },
  });
  const posts = data?.getPostListByCategoryId?.posts || initialPosts;

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

  if (posts !== undefined && posts.length === 0) {
    return <p>해당 카테고리에 게시물이 없습니다.</p>;
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
