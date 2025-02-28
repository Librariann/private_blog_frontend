import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { GetServerSideProps } from "next";
import { client } from "@/apollo"; // Apollo Client 설정 파일
import { gql, useMutation, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Comments, { CommentProps } from "@/components/comments";
import CommentsWrite from "@/components/comments-write";
import {
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  UpdatePostHitsMutation,
  UpdatePostHitsMutationVariables,
} from "@/gql/graphql";

export type PostProps = {
  post: {
    id: number;
    title: string;
    contents: string;
    hits: number;
    createdAt: string;
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
  const { data: postData } = useQuery<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >(GET_POST_BY_ID_QUERY, {
    variables: { postId: post?.id },
    fetchPolicy: "cache-and-network",
    skip: !post?.id,
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
  }, [updatePostHitsMutation, post?.id]);

  if (!currentPost) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8" data-color-mode="light">
      <div className="mb-6">
        {/* 타이틀 */}
        <h1 className="text-6xl font-bold mb-4">{currentPost.title}</h1>
        {/* 조회수, 작성일 */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <span>조회수: {currentPost.hits}</span>
            {/* <span>작성일: {new Date(currentPost.createdAt).toLocaleDateString()}</span> */}
          </div>
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const postId = Number(params?.id); // URL에서 postId를 추출합니다.

  try {
    const { data } = await client.query<
      GetPostByIdQuery,
      GetPostByIdQueryVariables
    >({
      query: GET_POST_BY_ID_QUERY,
      variables: { postId },
      fetchPolicy: "network-only", // 항상 최신 데이터
    });
    if (!data.getPostById?.ok) {
      return {
        notFound: true, // 포스트가 없으면 404 페이지로 리디렉션합니다.
      };
    }
    return {
      props: {
        post: data.getPostById.post,
        initialApolloState: client.cache.extract(),
      },
    };
  } catch (error) {
    return {
      notFound: true, // 에러 발생 시 404 페이지로 리디렉션
    };
  }
};

export default PostDetail;
