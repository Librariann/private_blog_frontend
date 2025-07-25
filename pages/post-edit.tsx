import { useApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_POST_BY_ID_QUERY } from "./[contents]/[id]";
import { GET_CATEGORIES, imageUploadCommand, postingProps } from "./post-write";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  commands,
} from "@uiw/react-md-editor";
import dynamic from "next/dynamic";
import { uploadImageToServer } from "@/utils/utils";
import ConfirmModal from "@/components/modal/confirm-modal";
import Button from "@/components/button";
import {
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
} from "@/gql/graphql";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const PostEdit = () => {
  const router = useRouter();
  const postId = router.query.id;

  const { data, loading } = useQuery<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >(GET_POST_BY_ID_QUERY, {
    variables: { postId: Number(postId) },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (data) {
      setMd(data?.getPostById?.post?.contents);
      setHashtags(
        data?.getPostById?.post?.hashtags?.map((value: any) => value.hashtag) ||
          []
      );
      setSelectedCategory(data?.getPostById?.post?.category?.id || 1);
    }
  }, [data]);

  const [open, setOpen] = useState(false);
  const [md, setMd] = useState<string | undefined>("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [postConfirmModal, setPostConfirmModal] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

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
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  //   const onSubmit = async (data: postingProps) => {
  //     try {
  //       const { title } = data;
  //       let thumbnailUrl = "";
  //       if (thumbnailFile) {
  //         thumbnailUrl = await uploadImageToServer(thumbnailFile);
  //       }

  //       const postResult = await createPostMutation({
  //         variables: {
  //           input: {
  //             title,
  //             contents: md || "",
  //             categoryId: selectedCategory,
  //             thumbnailUrl,
  //           },
  //           hashtags,
  //         },
  //       });

  //       if (postResult.data?.createPost.ok) {
  //         setPostConfirmModal(true);
  //       } else {
  //         alert(postResult.data?.createPost.error);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       alert("게시물 작성 중 오류가 발생했습니다.");
  //     }
  //   };

  const redirect = () => {
    if (process.env.NODE_ENV === "production") {
      window.location.href = "/";
    } else {
      router.push("/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<postingProps>({
    mode: "onChange",
  });

  const { data: categoriesData } = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GET_CATEGORIES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false, // SSR 비활성화
  });

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-4 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 md:space-y-6">
          <input
            {...register("title", { required: "제목을 입력해주세요" })}
            className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
            defaultValue={data?.getPostById?.post?.title}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="w-full p-3 text-base md:text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categoriesData?.getCategories?.categories?.map((value) => {
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
                    className="w-48 h-32 object-cover rounded-lg border shadow-sm"
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
            <div onClick={() => isValid && !loading && setOpen(true)}>
              <Button
                canClick={isValid && !loading}
                loading={loading}
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
          //   handleSubmit(onSubmit)();
        }}
        title="게시물 작성"
        message="게시물을 작성하시겠습니까?"
        isCancel={false}
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
    </div>
  );
};

export default PostEdit;
