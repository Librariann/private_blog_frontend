import { NewButton } from "@/components/buttons/new-button";
import { GlassCardMain } from "@/components/main/main";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  X,
  Plus,
  ArrowLeftIcon,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  commands,
  ICommand,
  TextAreaTextApi,
  TextState,
} from "@uiw/react-md-editor";
import { uploadImageToServer } from "@/utils/utils";
import { toast } from "react-toastify";
import { useCreatePost, useEditPost, useGetCategories } from "@/hooks/hooks";
import { Category, PostStatus } from "@/gql/graphql";
import CreateCategoryModal from "@/components/posts/modal/create-category-modal";
import WritingAnimation from "@/components/loading/writing-animation";
import { useRouter } from "next/router";
import { usePostEditStore } from "@/stores/usePostEditStore";

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

const PostWrite = () => {
  const { back } = useRouter();
  const { categories } = useGetCategories();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<PostStatus>();
  const [step, setStep] = useState<1 | 2>(1); // 1: 기본 작성, 2: 부가 정보
  const [parentCategory, setParentCategory] = useState<Category>();
  const [subCategory, setSubCategory] = useState<string>("");
  const [md, setMd] = useState<string>("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const { isDarkMode } = useDarkModeStore();
  const { editingPost, editingMode } = usePostEditStore();
  const { createPostMutation } = useCreatePost();
  const { editPostMutation } = useEditPost({ postId });
  useEffect(() => {
    //수정 모드 일때
    if (editingMode && editingPost) {
      setPostId(editingPost.id);
      setTitle(editingPost.title);
      setExcerpt(editingPost?.excerpt || "");
      setMd(editingPost?.contents || "");
      setThumbnailUrl(editingPost?.thumbnailUrl || "");
      setTags(editingPost?.hashtags?.map((tag) => tag.hashtag) || []);
      if (editingPost.category?.parentCategory) {
        setParentCategory(editingPost.category?.parentCategory);
      }
      setSubCategory(String(editingPost.category?.id));
      setStatus(editingPost?.postStatus);
      setStep(1);
    }
  }, [editingPost, categories, editingMode]);

  const handleAddCategoryOpen = (open: boolean) => {
    setIsAddCategoryOpen(open);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput("");
      } else {
        toast.error("이미 추가된 태그입니다.");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveDraft = async () => {
    try {
      setIsSubmitting(true);
      let uploadThumbnailUrl: File | string = thumbnailUrl;
      if (thumbnailFile) {
        uploadThumbnailUrl = await uploadImageToServer(thumbnailFile);
      }
      const postResult = await createPostMutation({
        variables: {
          input: {
            title,
            excerpt,
            contents: md || "",
            categoryId: +subCategory,
            postStatus: PostStatus.Draft,
            thumbnailUrl: uploadThumbnailUrl,
          },
          hashtags: tags,
        },
      });

      if (postResult.data?.createPost.ok) {
        toast.info("포스트가 임시저장 됐습니다");
        // setPostConfirmModal(true);
      } else {
        toast.error(postResult.data?.createPost.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsSubmitting(true);
      let uploadThumbnailUrl: File | string = thumbnailUrl;
      if (thumbnailFile) {
        uploadThumbnailUrl = await uploadImageToServer(thumbnailFile);
      }
      const postResult = await createPostMutation({
        variables: {
          input: {
            title,
            excerpt,
            contents: md || "",
            categoryId: +subCategory,
            postStatus: status,
            thumbnailUrl: uploadThumbnailUrl,
          },
          hashtags: tags,
        },
      });

      if (postResult.data?.createPost.ok) {
        toast.success("포스트가 성공적으로 생성되었습니다.");
        // setPostConfirmModal(true);
      } else {
        toast.error(postResult.data?.createPost.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
    back();
  };

  const handleEditPost = async () => {
    try {
      setIsSubmitting(true);
      let uploadThumbnailUrl: File | string = thumbnailUrl;
      if (thumbnailFile) {
        uploadThumbnailUrl = await uploadImageToServer(thumbnailFile);
      }
      const postResult = await editPostMutation({
        variables: {
          input: {
            id: postId,
            title,
            excerpt,
            contents: md || "",
            categoryId: +subCategory,
            postStatus: status,
            thumbnailUrl: uploadThumbnailUrl,
          },
          hashtags: tags,
        },
      });

      if (postResult.data?.editPost.ok) {
        toast.success("포스트가 성공적으로 수정되었습니다.");
        // setPostConfirmModal(true);
        back();
      } else {
        toast.error(postResult.data?.editPost.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!excerpt.trim()) {
      toast.error("요약을 입력해주세요.");
      return;
    }
    if (!md.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    setStep(2);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  // Step 1: 기본 작성 (제목, 태그, 내용)
  if (step === 1) {
    return (
      <div className="min-h-screen pb-8">
        <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-16 py-4 sm:py-8">
          {/* Simple Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => back()}
              className={`cursor-pointer flex items-center space-x-2 transition-colors ${
                isDarkMode
                  ? "text-white/70 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>나가기</span>
            </button>

            <div className="flex gap-2">
              <NewButton
                onClick={handleNextStep}
                className={`
                  cursor-pointer
                  ${
                    isDarkMode
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                `}
              >
                다음 단계
                <ArrowRight className="w-4 h-4 ml-2" />
              </NewButton>
            </div>
          </div>

          {/* Title Input */}
          <div className="mb-6 w-[50%]">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className={`border-0 border-b rounded-none px-0 !text-5xl font-bold py-4 h-auto dark:bg-input/0 ${
                isDarkMode
                  ? "bg-transparent border-white/50 text-white placeholder:text-white/80 focus-visible:ring-0 focus-visible:border-white/80"
                  : "bg-transparent border-gray-200 focus-visible:ring-0 focus-visible:border-gray-400"
              }`}
            />
          </div>
          {/* Excerpt */}
          <div className={`rounded-2xl w-[50%] mb-6`}>
            <Label
              className={`mb-3 block ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              요약{" "}
              <span
                className={`text-xs ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
              >
                {excerpt.length}/200자
              </span>
            </Label>
            <Input
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="포스트의 간략한 요약을 작성하면 사람들이 보기 편해져요"
              className={
                isDarkMode
                  ? "bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Tags Input */}
          <div className="mb-8">
            <div className="flex gap-2 mb-3 w-[50%]">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="태그를 입력해주세요 (엔터로 입력할 수 있어요)"
                className={
                  isDarkMode
                    ? "bg-transparent border-white/10 text-white placeholder:text-white/40"
                    : "bg-transparent border-gray-200"
                }
              />
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 backdrop-blur-sm w-fit">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`${
                      isDarkMode
                        ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    } pl-3 pr-1 py-1`}
                  >
                    #{tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Content Editor with Split View */}
          <div className="mb-8">
            {/* Editor */}
            <MDEditor
              value={md}
              onChange={(val) => setMd(val || "")}
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
          </div>
        </div>
      </div>
    );
  }

  // Step 2: 부가 정보 (요약, 썸네일, 카테고리 등)
  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <NewButton
            variant="ghost"
            onClick={() => setStep(1)}
            className={
              isDarkMode
                ? "text-white/70 hover:text-white hover:bg-white/10"
                : ""
            }
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            이전 단계
          </NewButton>

          <div className="flex gap-2">
            <NewButton
              variant="default"
              onClick={handleSaveDraft}
              className={`cursor-pointer
                ${isDarkMode ? "bg-black/70 hover:border-white hover:border-1 text-white hover:bg-black/80" : ""}
              `}
            >
              <Save className="w-4 h-4 mr-2" />
              임시저장
            </NewButton>
            <NewButton
              onClick={editingMode ? handleEditPost : handlePublish}
              className={`cursor-pointer
                ${
                  isDarkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              `}
            >
              <Send className="w-4 h-4 mr-2" />
              {editingMode ? "수정하기" : "발행하기"}
            </NewButton>
          </div>
        </div>

        <h2
          className={`text-2xl mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          {editingMode ? "수정" : "발행"} 설정
        </h2>

        <div className="space-y-6">
          {/* Categories */}
          <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
            <h3
              className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              카테고리
            </h3>

            <div className="space-y-4">
              <div>
                <Label
                  className={`mb-2 block ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
                >
                  상위 카테고리 *
                </Label>
                <Select
                  value={parentCategory?.categoryTitle}
                  onValueChange={(value: string) => {
                    const category = categories?.find(
                      (category) => category.categoryTitle === value
                    );
                    setParentCategory(category as Category);
                  }}
                >
                  <SelectTrigger
                    className={
                      isDarkMode
                        ? "bg-white/5 border-white/20 text-white"
                        : "bg-white border-gray-200"
                    }
                  >
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.categoryTitle}
                        value={category.categoryTitle}
                      >
                        {category.categoryTitle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <NewButton
                variant="outline"
                onClick={() => setIsAddCategoryOpen(true)}
                className={`w-full ${
                  isDarkMode
                    ? "border-white/20 text-white hover:bg-white/10"
                    : ""
                }`}
              >
                <Plus className="w-4 h-4 mr-2" />새 카테고리 만들기
              </NewButton>

              {parentCategory && (
                <div>
                  <Label
                    className={`mb-2 block ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
                  >
                    하위 카테고리 *
                  </Label>
                  <Select value={subCategory} onValueChange={setSubCategory}>
                    <SelectTrigger
                      className={
                        isDarkMode
                          ? "bg-white/5 border-white/20 text-white"
                          : "bg-white border-gray-200"
                      }
                    >
                      <SelectValue placeholder="하위 카테고리를 선택해주세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentCategory?.subCategories?.map((subCategory) => (
                        <SelectItem
                          key={subCategory.categoryTitle}
                          value={subCategory.id.toString()}
                        >
                          {subCategory.categoryTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </GlassCardMain>

          {/* Thumbnail */}
          <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
            <h3
              className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              썸네일
            </h3>

            <div className="space-y-3">
              <div>
                <Input
                  value={thumbnailUrl}
                  onChange={(e) => {
                    setThumbnailUrl(e.target.value);
                    if (e.target.value.trim()) {
                      setThumbnailFile(null);
                    }
                  }}
                  placeholder="이미지 URL을 입력하세요"
                  className={`
                  ${
                    isDarkMode
                      ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      : "bg-white border-gray-200"
                  }`}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                <NewButton
                  className="cursor-pointer mt-4 hover:bg-gray-400"
                  variant={"default"}
                  onClick={() => fileInputRef.current?.click()}
                >
                  업로드
                </NewButton>
              </div>

              {thumbnailUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400";
                    }}
                  />
                </div>
              )}

              {!thumbnailUrl && (
                <div
                  className={`aspect-video rounded-lg border-2 border-dashed flex items-center justify-center ${
                    isDarkMode ? "border-white/20" : "border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <ImageIcon
                      className={`w-12 h-12 mx-auto mb-2 ${
                        isDarkMode ? "text-white/30" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                    >
                      썸네일 미리보기
                    </p>
                  </div>
                </div>
              )}
            </div>
          </GlassCardMain>

          {/* Status */}
          <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
            <h3
              className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              공개 설정
            </h3>

            <Select
              value={status}
              onValueChange={(val: PostStatus) => setStatus(val)}
            >
              <SelectTrigger
                className={
                  isDarkMode
                    ? "bg-white/5 border-white/20 text-white"
                    : "bg-white border-gray-200"
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PostStatus.Published}>공개</SelectItem>
                <SelectItem value={PostStatus.Private}>비공개</SelectItem>
                <SelectItem value={PostStatus.Draft}>임시저장</SelectItem>
              </SelectContent>
            </Select>

            <p
              className={`text-sm mt-2 ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
            >
              {status === PostStatus.Draft
                ? "임시저장된 글은 나만 볼 수 있습니다"
                : "공개된 글은 모두가 볼 수 있습니다"}
            </p>
          </GlassCardMain>

          {/* Preview Summary */}
          <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
            <h3
              className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              📝 작성 내용 요약
            </h3>
            <div
              className={`space-y-2 text-sm ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
            >
              <p>• 제목: {title || "(미입력)"}</p>
              <p>• 태그: {tags.length > 0 ? tags.join(", ") : "(없음)"}</p>
              <p>
                • 카테고리:{" "}
                {/* {parentCategory && subCategory
                  ? `${parentCategory} > ${subCategory}`
                  : "(미선택)"} */}
              </p>
              <p>• 내용: {md ? `${md.length}자` : "(미입력)"}</p>
            </div>
          </GlassCardMain>
        </div>

        {/* Add Category Dialog */}
        <CreateCategoryModal
          isAddCategoryOpen={isAddCategoryOpen}
          handleAddCategoryOpen={handleAddCategoryOpen}
        />
      </div>
      {/* 로딩 애니메이션 */}
      {isSubmitting && <WritingAnimation />}
    </div>
  );
};

export default PostWrite;
