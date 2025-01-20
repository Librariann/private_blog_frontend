import { GetStaticPaths, GetStaticProps } from "next";
import {
  getCategories,
  getCategoriesCounts,
  getPostById,
  getPostsByCategoryId,
  getPostsByParentCategoryId,
} from "@/lib/posts";
import PostList from "@/components/post-list";
import PostDetail from "@/components/posts/post-detail";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await getCategoriesCounts();

    // 데이터가 없거나 배열이 아닌 경우 빈 배열로 처리
    const categories = Array.isArray(data) ? data : [];

    const paths = categories
      .filter((category) => category && category.categoryTitle) // null/undefined 필터링
      .map((category) => ({
        params: { slug: [category.categoryTitle] },
      }));

    // 빌드 시점에 경로 생성 완료

    return {
      paths,
      fallback: "blocking", // 새 카테고리는 on-demand로 생성
    };
  } catch (error) {
    // 빌드 시점에는 GraphQL 서버가 없는 것이 정상이므로 에러 로그 제거
    // 에러 발생 시 빈 경로로 fallback 처리
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugLength = params?.slug?.length || 0;
  const slug = params?.slug || [];

  try {
    let category;
    let postsData;
    const categories = await getCategories();

    //블로그 상세페이지
    if (slugLength > 0 && slug[slugLength - 1]?.startsWith("@Post-")) {
      const lastSlug = slug[slugLength - 1];
      const postIdPart = lastSlug.split("-")[1];
      if (postIdPart) {
        postsData = await getPostById(+postIdPart);
        return { props: { type: "detail", post: postsData } };
      }
      //그 외 리스트 페이지
    } else if (slugLength > 0 && slug[slugLength - 1]) {
      category = categories?.find(
        (category) => category.categoryTitle === slug[slugLength - 1]
      );
    }

    if (!category) {
      return {
        notFound: true,
      };
    }

    //최상위 카테고리
    if (slugLength === 1) {
      postsData = await getPostsByParentCategoryId(category.id || 0);
      //하위 카테고리
    } else if (slugLength === 2) {
      postsData = await getPostsByCategoryId(category.id);
    }

    return {
      props: {
        posts: postsData || [],
        categoryId: category.id,
      },
      revalidate: 60, // 60초마다 재생성
    };
  } catch (error) {
    // 빌드 시점에는 GraphQL 서버가 없는 것이 정상이므로 에러 로그 제거
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

const Contents = (props: any) => {
  if (props.type === "detail") {
    return <PostDetail post={props.post} />;
  }
  return <PostList posts={props.posts} />;
};

export default Contents;
