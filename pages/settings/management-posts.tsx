import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  Pencil,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { NewButton } from "@/components/buttons/new-button";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { GlassCardMain } from "@/components/main/main";
import { GetPostListQuery, PostStatus } from "@/gql/graphql";
import {
  useDeletePost,
  useGetAllPostList,
  useGetCategoryCounts,
  useTogglePostStatus,
} from "@/hooks/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateShort } from "@/utils/utils";
import { useRouter } from "next/router";
import { POST_STATUS_OBJECTS } from "@/common/constants";

const tableColumns = [
  { title: "제목", className: "px-6 py-4 text-left" },
  { title: "카테고리", className: "px-6 py-4 text-left" },
  { title: "날짜", className: "px-6 py-4 text-left" },
  { title: "조회수", className: "px-6 py-4 text-center" },
  { title: "댓글", className: "px-6 py-4 text-center" },
  { title: "상태", className: "px-6 py-4 text-center" },
  { title: "관리", className: "px-6 py-4 text-center" },
];

const ManagementPosts = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<String>();
  const [selectedPostId, setSelectedPostId] = useState<number>();

  const { isDarkMode } = useDarkModeStore();
  const posts = useGetAllPostList();
  const { countsData, countsLoading } = useGetCategoryCounts();
  const { togglePostStatusMutation, postStatusToggleLoading } =
    useTogglePostStatus();

  const { deletePostMutation, postDeleteLoading } = useDeletePost();

  const handleDeletePost = () => {
    deletePostMutation({ variables: { postId: selectedPostId! } });
    setIsDeleteDialogOpen(false);
  };

  const togglePostStatus = (postId: number) => {
    togglePostStatusMutation({ variables: { postId } });
  };

  const openDeleteDialog = (postTitle: string, postId: number) => {
    setSelectedPost(postTitle);
    setSelectedPostId(postId);
    setIsDeleteDialogOpen(true);
  };

  // Filter posts
  const filteredPosts = posts?.filter((post) => {
    const matchesSearch = post?.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      post?.postStatus.toLowerCase() === filterStatus.toLowerCase();
    const matchesCategory =
      filterCategory === "all" ||
      post?.category?.parentCategoryTitle?.toLowerCase() ===
        filterCategory.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6 mb-6">
        <div>
          <button
            //   onClick={onBack}
            className={`flex items-center space-x-2 mb-4 transition-colors ${
              isDarkMode
                ? "text-white/70 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>뒤로가기</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1
                className={`mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                포스트 관리
              </h1>
              <p className={isDarkMode ? "text-white/60" : "text-gray-600"}>
                총 {posts?.length}개의 포스트 ({" "}
                <span className="text-green-400">
                  공개{" "}
                  {posts?.filter((p) => p.postStatus === "PUBLISHED").length}
                </span>
                개,{" "}
                <span className="text-purple-400">
                  비공개{" "}
                  {posts?.filter((p) => p.postStatus === "PRIVATE").length}
                </span>
                개,{" "}
                <span className="text-yellow-400">
                  임시저장{" "}
                  {posts?.filter((p) => p.postStatus === "DRAFT").length}
                </span>
                개,{" "}
                <span className="text-red-400">
                  삭제됨{" "}
                  {posts?.filter((p) => p.postStatus === "DELETED").length}
                </span>
                개 )
              </p>
            </div>
            <NewButton
              className={`
                cursor-pointer
                ${
                  isDarkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              `}
              onClick={() => router.push("/post-write")}
            >
              <Plus className="w-4 h-4" />새 글쓰기
            </NewButton>
          </div>
        </div>
      </GlassCardMain>

      {/* Filters */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? "text-white/40" : "text-gray-400"
              }`}
            />
            <Input
              placeholder="포스트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }`}
            />
          </div>

          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white"
                  : "bg-white border-gray-200"
              }
            >
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              {Object.entries(PostStatus)
                .reverse()
                .map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {POST_STATUS_OBJECTS[value].statusName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white"
                  : "bg-white border-gray-200"
              }
            >
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 카테고리</SelectItem>
              {!countsLoading && (
                <>
                  {countsData?.map((category) => (
                    <SelectItem
                      key={category.categoryTitle}
                      value={category.categoryTitle}
                    >
                      {category.categoryTitle}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </GlassCardMain>

      {/* Posts Table */}
      <GlassCardMain
        $isDarkMode={isDarkMode}
        className="rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`border-b ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
            >
              <tr>
                {tableColumns.map((column) => (
                  <th
                    key={column.title}
                    className={`${column.className} ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPosts?.map((post) => (
                <tr
                  key={post.id}
                  className={`border-b ${isDarkMode ? "border-white/5 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"} transition-colors`}
                >
                  <td
                    className={`px-6 py-4 cursor-pointer ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    onClick={() =>
                      router.push(
                        `/post/${post.category.parentCategoryTitle}/${post.category.categoryTitle}/@Post-${post.id}`
                      )
                    }
                  >
                    <div className="max-w-md">{post.title}</div>
                  </td>
                  <td
                    className={`px-6 py-4 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                  >
                    <div className="text-sm">
                      <div>{post.category.parentCategoryTitle}</div>
                      <div
                        className={
                          isDarkMode ? "text-white/50" : "text-gray-500"
                        }
                      >
                        {post.category.categoryTitle}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                  >
                    {formatDateShort(post.createdAt)}
                  </td>
                  <td
                    className={`px-6 py-4 text-center ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                  >
                    {post.hits}
                  </td>
                  <td
                    className={`px-6 py-4 text-center ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                  >
                    {post?.comments?.length}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge
                      variant={
                        POST_STATUS_OBJECTS[post.postStatus].buttonStatus
                      }
                      className={
                        POST_STATUS_OBJECTS[post.postStatus].buttonColor
                      }
                    >
                      {POST_STATUS_OBJECTS[post.postStatus].statusName}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <NewButton
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePostStatus(post.id)}
                        className={`cursor-pointer ${
                          isDarkMode
                            ? "text-white/70 hover:text-white hover:bg-white/10"
                            : ""
                        }`}
                        title={
                          post.postStatus === "PUBLISHED"
                            ? "비공개로 전환"
                            : "공개로 전환"
                        }
                      >
                        {post.postStatus === "PUBLISHED" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : post.postStatus === "DRAFT" ? (
                          <Upload className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </NewButton>

                      <NewButton
                        variant="ghost"
                        size="sm"
                        className={`cursor-pointer ${
                          isDarkMode
                            ? "text-white/70 hover:text-white hover:bg-white/10"
                            : ""
                        }`}
                        title="수정"
                        // onClick={() => onEdit && onEdit(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </NewButton>
                      <NewButton
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(post.title, post.id)}
                        className={`cursor-pointer ${
                          isDarkMode
                            ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            : "text-red-600"
                        }`}
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </NewButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPosts?.length === 0 && (
            <div
              className={`text-center py-12 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </GlassCardMain>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent
          className={`max-w-md ${
            isDarkMode
              ? "bg-white/10 backdrop-blur-xs border-white/20"
              : "backdrop-blur-xs border-gray-200"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              포스트 삭제
            </DialogTitle>
            <DialogDescription
              className={isDarkMode ? "text-white/60" : "text-gray-600"}
            >
              정말로 {selectedPost} 포스트를 삭제하시겠습니까?
              <span className="block mt-2 text-red-400">
                ⚠️ 이 작업은 되돌릴 수 없습니다.
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-3 pt-4">
            <NewButton
              onClick={handleDeletePost}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            >
              삭제
            </NewButton>
            <NewButton
              variant="default"
              onClick={() => setIsDeleteDialogOpen(false)}
              className={`flex-1 cursor-pointer ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  : "border-gray-300"
              }`}
            >
              취소
            </NewButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagementPosts;
