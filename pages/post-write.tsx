"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Button from "@/components/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CreatePostMutation, CreatePostMutationVariables } from "./gql/graphql";

const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      error
    }
  }
`;

type postingProps = {
  title: string;
  categoryId: number;
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

function PostWrite() {
  const router = useRouter();
  const [createPostMutation, { loading }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CREATE_POST_MUTATION, {
    update(cache, { data: mutationResult }) {
      if (mutationResult?.createPost.ok) {
        cache.modify({
          fields: {
            getPostList(existing = {}) {
              cache.evict({ fieldName: "getPostList" });
              return existing;
            },
          },
        });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<postingProps>({
    mode: "onChange",
  });

  const [md, setMd] = useState<string | undefined>("");
  const [selectedCategory, setSelectedCategory] = useState(1);

  const onSubmit = async (data: postingProps) => {
    try {
      const { title } = data;
      console.log("전송할 데이터:", {
        title,
        contents: md,
        categoryId: selectedCategory,
      });

      const result = await createPostMutation({
        variables: {
          input: {
            title,
            contents: md || "",
            categoryId: selectedCategory,
          },
        },
      });

      console.log("응답 결과:", result);

      if (result.data?.createPost.ok) {
        alert("게시물이 성공적으로 작성되었습니다.");
        router.push("/");
      } else {
        alert(result.data?.createPost.error);
      }
    } catch (error) {
      alert("게시물 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          {...register("title", { required: "제목을 입력해주세요" })}
          className="w-full p-2 border rounded-lg mb-4"
          placeholder="제목을 입력하세요"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className="w-full p-2 border rounded-lg mb-4"
        >
          <option value={1}>프로그래밍</option>
          <option value={2}>일상</option>
          <option value={3}>취미</option>
        </select>
        <div className="rounded-lg shadow-md overflow-hidden">
          <MDEditor
            value={md}
            onChange={setMd}
            autoFocus={true}
            height={800}
            className="border-0"
          />
        </div>
        <div className="flex justify-end">
          <Button
            canClick={isValid && !loading}
            loading={loading}
            actionText="게시물 생성"
          />
        </div>
      </form>
    </div>
  );
}

export default PostWrite;
