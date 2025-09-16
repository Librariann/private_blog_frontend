import { GetStaticPaths, GetStaticProps } from "next";
import {
  getCategories,
  getCategoriesCounts,
  getPostById,
  getPostsByCategoryId,
  getPostsByParentCategoryId,
} from "@/lib/posts";
import PostList from "@/components/post-list";
import PostDetail from "@/components/post-detail";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const data = await getCategoriesCounts();

    const categories = data;
    const paths = categories.map((category) => ({
      params: { slug: [category.categoryTitle] },
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
  const slugLength = params?.slug?.length || 0;
  const slug = params?.slug || [];

  try {
    let category;
    let postsData;
    const categories = await getCategories();

    //블로그 상세페이지
    if (slug[slugLength - 1].startsWith("@Post-")) {
      const getPostId = slug[slugLength - 1].split("-")[1];
      postsData = await getPostById(+getPostId);
      return { props: { type: "detail", post: postsData } };
      //그 외 리스트 페이지
    } else {
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
    console.error("getStaticProps Error:", error);
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
