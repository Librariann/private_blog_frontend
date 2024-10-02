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
import ConfirmModal from "@/components/modal/confirm-modal";
import MDEditor from "@uiw/react-md-editor";

const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!, $hashtags: [String!]!) {
    createPost(input: $input, hashtags: $hashtags) {
      ok
      error
      postId
    }
  }
`;

type postingProps = {
  title: string;
  categoryId: number;
};

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
//   ssr: false,
// });

function PostWrite() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState();
  const router = useRouter();
  const [createPostMutation, { loading: postLoading }] = useMutation<
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
            getCategoriesCounts(existing = {}) {
              cache.evict({ fieldName: "getCategoriesCounts" });
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
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");

  const handleHashtagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hashtagInput.trim()) {
      e.preventDefault();
      if (!hashtags.includes(hashtagInput.trim())) {
        setHashtags([...hashtags, hashtagInput.trim()]);
      }
      setHashtagInput("");
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data: postingProps) => {
    setOpen(true);
    try {
      const { title } = data;
      const postResult = await createPostMutation({
        variables: {
          input: {
            title,
            contents: md || "",
            categoryId: selectedCategory,
          },
          hashtags,
        },
      });

      if (postResult.data?.createPost.ok) {
        alert("게시물이 성공적으로 작성되었습니다.");
        router.push("/");
      } else {
        alert(postResult.data?.createPost.error);
      }
    } catch (error) {
      alert("게시물 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <input
            {...register("title", { required: "제목을 입력해주세요" })}
            className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>프로그래밍</option>
            <option value={2}>일상</option>
            <option value={3}>취미</option>
          </select>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagInput}
              className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="해시태그를 입력하고 Enter를 누르세요"
            />
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeHashtag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div
            className="rounded-lg shadow-md overflow-hidden"
            data-color-mode="dark"
          >
            {typeof window !== "undefined" && (
              <MDEditor
                value={md}
                onChange={setMd}
                autoFocus={false}
                height={
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 400
                    : 800
                }
                className="border-0"
                preview="live"
              />
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              canClick={isValid && !postLoading}
              loading={postLoading}
              actionText="게시물 생성"
            />
          </div>
        </form>
      </div>
      <ConfirmModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          handleSubmit(onSubmit)();
        }}
        title="게시물 작성"
        message="게시물을 작성하시겠습니까?"
      />
    </div>
  );
}

export default PostWrite;
