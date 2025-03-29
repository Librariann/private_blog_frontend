import { GetServerSideProps } from "next";
import {
  getCategories,
  getPostById,
  getPostsByCategoryId,
  getPostsByParentCategoryId,
} from "@/lib/posts";
import PostDetail from "@/components/posts/post-detail";
import CategoryDetails from "@/components/category/category-details";
import { GetPostByIdQuery, Post } from "@/gql/graphql";

type DetailProps = {
  type: "detail";
  post: GetPostByIdQuery["getPostById"];
};

type ListProps = {
  type?: undefined;
  posts: Post[];
  categoryId: number;
};

export type ContentsProps = DetailProps | ListProps;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slugLength = params?.slug?.length || 0;
  const slug = params?.slug || [];

  try {
    let category;
    let postsData;
    const categories = await getCategories();

    // 블로그 상세페이지
    if (slugLength > 0 && slug[slugLength - 1]?.startsWith("@Post-")) {
      const lastSlug = slug[slugLength - 1];
      const postIdPart = lastSlug.split("-")[1];
      if (postIdPart) {
        postsData = await getPostById(+postIdPart);
        return { props: { type: "detail", post: postsData } };
      }
    } else if (slugLength > 0 && slug[slugLength - 1]) {
      // 하위 카테고리
      category = categories
        ?.find((category) => category.categoryTitle === slug[slugLength - 2])
        ?.subCategories?.find(
          (subCategory) => subCategory.categoryTitle === slug[slugLength - 1]
        );
    }

    if (!category) {
      return {
        notFound: true,
      };
    }

    // 최상위 카테고리
    if (slugLength === 1) {
      postsData = await getPostsByParentCategoryId(category.id || 0);
    } else if (slugLength === 2) {
      postsData = await getPostsByCategoryId(category.id);
    }

    return {
      props: {
        posts: postsData || [],
        categoryId: category.id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Contents = (props: ContentsProps) => {
  if (props.type === "detail") {
    return <PostDetail post={props.post} />;
  }
  return <CategoryDetails posts={props.posts} categoryId={props.categoryId} />;
};

export default Contents;
