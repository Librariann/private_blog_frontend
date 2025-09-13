import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { createApolloClient, client } from "@/apollo";
import { gql, useMutation, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Comments from "@/components/comments";
import CommentsWrite from "@/components/comments-write";
import { GET_POST_LIST_QUERY } from "@/pages";
import {
  GetPostListQuery,
  GetPostListQueryVariables,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  UpdatePostHitsMutation,
  UpdatePostHitsMutationVariables,
} from "@/gql/graphql";
import { useMe } from "@/hooks/useMe";
import { useRouter } from "next/router";
import PostDetailSkeleton from "@/components/skeleton/post-detail-skeleton";

export type PostProps = {
  post: {
    id: number;
    title: string;
    contents: string;
    hits: number;
    createdAt: string;
    user: {
      id: number;
    };
    comments: {
      id: number;
      comment: string;
      commentId: string;
      createdAt: string;
    }[];
    category: {
      categoryTitle: string;
    };
    hashtags: {
      hashtag: string;
    }[];
  };
};

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      ok
      categories {
        id
        categoryTitle
      }
    }
  }
`;

export const GET_POST_BY_ID_QUERY = gql`
  query getPostById($postId: Int!) {
    getPostById(postId: $postId) {
      ok
      post {
        id
        title
        contents
        hits
        createdAt
        user {
          id
        }
        category {
          id
          categoryTitle
        }
        hashtags {
          hashtag
        }
        comments {
          id
          commentId
          comment
          createdAt
        }
      }
    }
  }
`;

const UPDATE_POST_HITS_MUTATION = gql`
  mutation updatePostHits($postId: Int!) {
    updatePostHits(postId: $postId) {
      ok
    }
  }
`;

const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

const PostDetail = ({ post }: PostProps) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  
  // useQuery로 실시간 데이터 가져오기
  const { data: postData, loading } = useQuery<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >(GET_POST_BY_ID_QUERY, {
    variables: { postId: Number(id) },
    skip: !id,
  });

  const currentPost = postData?.getPostById?.post || post;
  
  const [updatePostHitsMutation] = useMutation<
    UpdatePostHitsMutation,
    UpdatePostHitsMutationVariables
  >(UPDATE_POST_HITS_MUTATION, {
    update(cache) {
      // 메인 페이지와 카테고리 페이지의 캐시 무효화
      cache.evict({ fieldName: "getPostList" });
      cache.evict({ fieldName: "getPostListByCategoryId" });
      cache.gc();
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    
    const updateHits = async () => {
      //마지막 조회시간 확인
      const lastViewTime = localStorage.getItem(`post-${post?.id}-lastView`);
      const now = new Date().getTime();
      // 마지막 조회시간이 1일 이상 지났으면 조회수 증가
      if (!lastViewTime || now - parseInt(lastViewTime) > 24 * 60 * 60 * 1000) {
        try {
          await updatePostHitsMutation({
            variables: {
              postId: post?.id,
            },
          });
          // 현재 시간을 저장
          localStorage.setItem(`post-${post?.id}-lastView`, now.toString());
        } catch (error) {
          console.error("조회수 업데이트 실패:", error);
        }
      }
    };
    updateHits();
  }, [mounted, updatePostHitsMutation, post?.id]);

  const { data } = useMe();
  const userId = data?.me?.id;
  
  const handleEditPost = () => {
    router.push(`/post-edit?id=${currentPost?.id}`);
  };

  if (loading || !currentPost) {
    return <PostDetailSkeleton />;
  }

  // 포맷팅된 날짜 (클라이언트에서만)
  const formattedDate = mounted
    ? new Date(currentPost.createdAt).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="max-w-4xl mx-auto p-8" data-color-mode="light">
      <div className="mb-6">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold mb-4">{currentPost.title}</h1>
        {/* 조회수, 작성일 */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <span>조회수: {currentPost.hits}</span>
            {mounted && <span>작성일: {formattedDate}</span>}
          </div>
          {mounted && userId === currentPost.user?.id && (
            <div
              className="cursor-pointer text-blue-600 hover:text-blue-800"
              onClick={handleEditPost}
            >
              수정
            </div>
          )}
        </div>
        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {currentPost.hashtags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              #{tag.hashtag}
            </span>
          ))}
        </div>
      </div>
      <div className="prose prose-lg max-w-none mb-36">
        <EditerMarkdown source={currentPost.contents} />
      </div>
      <CommentsWrite />
      <Comments comments={currentPost.comments || []} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetPostListQuery,
      GetPostListQueryVariables
    >({
      query: GET_POST_LIST_QUERY,
      fetchPolicy: "network-only",
    });

    const posts = data.getPostList.posts || [];
    const paths = posts.map((post) => ({
      params: {
        contents: post.category.categoryTitle,
        id: post.id.toString(),
      },
    }));

    return {
      paths,
      fallback: "blocking", // 새 포스트는 on-demand로 생성
    };
  } catch (error) {
    console.error("getStaticPaths Error:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const postId = Number(params?.id);

  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetPostByIdQuery,
      GetPostByIdQueryVariables
    >({
      query: GET_POST_BY_ID_QUERY,
      variables: { postId },
      fetchPolicy: "network-only",
    });

    if (!data.getPostById?.ok) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: data.getPostById.post,
      },
      revalidate: 60, // 60초마다 재생성 (댓글, 조회수 업데이트)
    };
  } catch (error) {
    console.error("getStaticProps Error:", error);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};

export default PostDetail;
