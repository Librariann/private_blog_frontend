"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Button from "@/components/buttons/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ConfirmModal from "@/components/modal/confirm-modal";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
} from "@/gql/graphql";
import {
  commands,
  ICommand,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor";
import { uploadImageToServer } from "@/utils/utils";
import WritingAnimation from "@/components/loading/writing-animation";
import { GET_CATEGORIES } from "@/lib/queries";
import { toast } from "react-toastify";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!, $hashtags: [String!]) {
    createPost(input: $input, hashtags: $hashtags) {
      ok
      error
      postId
    }
  }
`;

export type postingProps = {
  title: string;
  categoryId: number;
};

function insertAtSelection(
  state: TextState,
  api: TextAreaTextApi,
  text: string
) {
  api.replaceSelection(text);
  const pos = state.selection.start + text.length;
  api.setSelectionRange({ start: pos, end: pos });
}

export const imageUploadCommand: ICommand = {
  name: "image-upload",
  keyCommand: "image-upload",
  buttonProps: { "aria-label": "Upload image" },
  // 아이콘은 취향껏
  icon: <span style={{ fontWeight: 700 }}>IMG</span>,
  execute: async (state, api) => {
    // 숨은 input 만들어 클릭
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = false;
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      // 로딩 표시(임시 텍스트)
      const placeholder = `![uploading ${file.name}...]()`;
      insertAtSelection(state, api, placeholder);

      try {
        const url = await uploadImageToServer(file);
        // 플레이스홀더를 실제 마크다운으로 교체
        const alt = file.name.replace(/\.(png|jpe?g|gif|webp|svg)$/i, "");
        const md = `![${alt}](${url})`;
        // 마지막에 삽입한 플레이스홀더 길이만큼 되돌아가 교체
        const start = state.selection.start;
        const end = start + placeholder.length;
        api.setSelectionRange({ start, end });
        api.replaceSelection(md);
      } catch (e) {
        console.log(e);
        // 실패 시 플레이스홀더 제거
        const start = state.selection.start;
        const end = start + placeholder.length;
        api.setSelectionRange({ start, end });
        api.replaceSelection("");
        alert("이미지 업로드 실패");
      }
    };
    // 파일 선택창 열기
    input.click();
  },
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

function PostWrite() {
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
        cache.gc();
      } else {
        console.log(
          "❌ Post creation failed:",
          mutationResult?.createPost.error
        );
      }
    },
  });

  const { data } = useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<postingProps>({
    mode: "onChange",
  });
  const [open, setOpen] = useState(false);
  const [md, setMd] = useState<string | undefined>("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [postConfirmModal, setPostConfirmModal] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHashtagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      hashtagInput.trim() &&
      !e.nativeEvent.isComposing
    ) {
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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const onSubmit = async (data: postingProps) => {
    try {
      setIsSubmitting(true);
      setOpen(false);

      const { title } = data;
      let thumbnailUrl = "";
      if (thumbnailFile) {
        thumbnailUrl = await uploadImageToServer(thumbnailFile);
      }

      const postResult = await createPostMutation({
        variables: {
          input: {
            title,
            contents: md || "",
            categoryId: selectedCategory,
            thumbnailUrl,
          },
          hashtags,
        },
      });

      if (postResult.data?.createPost.ok) {
        setPostConfirmModal(true);
      } else {
        toast.error(postResult.data?.createPost.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirect = () => {
    // if (process.env.NODE_ENV === "production") {
    // window.location.href = "/";
    // } else {
    router.push("/");
    // }
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <input
            {...register("title", { required: "제목을 입력해주세요" })}
            className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            {data?.getCategories?.categories?.map((value) => {
              return (
                <option key={value.id} value={value.id}>
                  {value.categoryTitle}
                </option>
              );
            })}
          </select>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={handleHashtagInput}
              className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
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
                commands={[...commands.getCommands(), imageUploadCommand]}
              />
            )}
          </div>

          {/* 썸네일 업로드 섹션 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              썸네일 이미지
            </label>
            <div className="flex items-center space-x-4">
              <label
                htmlFor="fileInput"
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 cursor-pointer"
              >
                썸네일 추가
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
              {thumbnailPreview && (
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50"
                >
                  제거
                </button>
              )}
            </div>

            {/* 썸네일 미리보기 */}
            {thumbnailPreview && (
              <div className="mt-3">
                <div className="relative inline-block">
                  <img
                    src={thumbnailPreview}
                    alt="썸네일 미리보기"
                    className="w-48 h-32 object-cover rounded-lg border shadow-xs"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <div onClick={() => isValid && !postLoading && setOpen(true)}>
              <Button
                canClick={isValid && !postLoading}
                loading={postLoading}
                actionText="게시물 생성"
              />
            </div>
          </div>
        </div>
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
        isCancel={false}
        loading={postLoading}
      />

      <ConfirmModal
        isOpen={postConfirmModal}
        onClose={() => {
          setPostConfirmModal(false);
        }}
        onConfirm={() => {
          redirect();
        }}
        title="작성 완료"
        message="게시물이 작성되었습니다."
        isCancel={true}
      />

      {/* 로딩 애니메이션 */}
      {isSubmitting && <WritingAnimation />}
    </div>
  );
}

export default PostWrite;
