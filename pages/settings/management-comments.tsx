import { NewButton } from "@/components/buttons/new-button";
import DeleteConfirmModal from "@/components/comments/modal/delete-confirm-modal";
import { GlassCardMain } from "@/components/main/main";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { GetCommentsQuery } from "@/gql/graphql";
import { useGetComments } from "@/hooks/hooks";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { formatDateHHMMSS, formatDateShort } from "@/utils/utils";
import { ArrowLeft, Trash2, Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export type CommentType = NonNullable<
  GetCommentsQuery["getComments"]["comments"]
>[number];

const ManagementComments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType | null>(
    null
  );
  const [replyContent, setReplyContent] = useState("");
  const { isDarkMode } = useDarkModeStore();
  const { back } = useRouter();
  const data = useGetComments();

  const memoizedComments = React.useMemo(() => data || [], [data]);
  const handleDeleteComment = () => {
    // TODO: 실제 삭제 로직
    console.log("Deleting comment:", selectedComment);
    setIsDeleteDialogOpen(false);
  };

  //대댓글 기능은 추후 추가
  //   const handleReplyComment = () => {
  //     console.log('Replying to comment:', selectedComment, 'with:', replyContent);
  //     setIsReplyDialogOpen(false);
  //     setReplyContent('');
  //   };

  const openDeleteDialog = (comment: CommentType) => {
    setSelectedComment(comment);
    setIsDeleteDialogOpen(true);
  };

  const openReplyDialog = (comment: CommentType) => {
    setSelectedComment(comment);
    setIsReplyDialogOpen(true);
  };

  // Filter comments
  const filteredComments = memoizedComments.filter((comment) => {
    const matchesSearch =
      comment.annonymousId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.comment.toLowerCase().includes(searchQuery.toLowerCase());
    // comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            승인됨
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            대기중
          </Badge>
        );
      case "spam":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            스팸
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => back()}
          className={`flex items-center space-x-2 mb-4 transition-colors ${
            isDarkMode
              ? "text-white/70 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <span>뒤로가기</span>
        </button>

        <div>
          <h1 className={`mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            댓글 관리
          </h1>
          <p className={isDarkMode ? "text-white/60" : "text-gray-600"}>
            총 {memoizedComments.length}개의 댓글
            {/* {memoizedComments.filter((c) => c.status === "approved").length}개 승인됨,{" "}
            {memoizedComments.filter((c) => c.status === "pending").length}개 대기중,{" "}
            {memoizedComments.filter((c) => c.status === "spam").length}개 스팸) */}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`rounded-2xl p-4 mb-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDarkMode ? "text-white/40" : "text-gray-400"
              }`}
            />
            <Input
              placeholder="댓글 검색 (작성자, 내용, 포스트명)..."
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
          {/* <Select value={filterStatus} onValueChange={setFilterStatus}>
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
              <SelectItem value="approved">승인됨</SelectItem>
              <SelectItem value="pending">대기중</SelectItem>
              <SelectItem value="spam">스팸</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <GlassCardMain
            key={comment.id}
            $isDarkMode={isDarkMode}
            className="rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.annonymousId}`}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {/* {memoizedComments.author.charAt(0)} */}
                </AvatarFallback>
              </Avatar>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className={isDarkMode ? "text-white" : "text-gray-900"}
                      >
                        {comment.annonymousId}
                      </span>
                      {getStatusBadge("approved")}
                    </div>
                    <div
                      className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                    >
                      {comment.annonymousId} ·{" "}
                      {formatDateHHMMSS(comment.createdAt)}
                    </div>
                  </div>
                </div>

                <p
                  className={`mb-3 ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
                >
                  {comment.comment}
                </p>

                <div
                  className={`text-sm mb-4 ${isDarkMode ? "text-white/60" : "text-gray-600"}`}
                >
                  포스트:{" "}
                  <span
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                  >
                    {comment.post?.title}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  <NewButton
                    size="sm"
                    variant="outline"
                    onClick={() => openDeleteDialog(comment)}
                    className={`
                      cursor-pointer
                      ${
                        isDarkMode
                          ? "border-white/20 text-red-400 hover:bg-red-500/10"
                          : "text-red-600"
                      }`}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    삭제
                  </NewButton>
                </div>
              </div>
            </div>
          </GlassCardMain>
        ))}

        {filteredComments.length === 0 && (
          <div
            className={`text-center py-12 rounded-2xl ${
              isDarkMode
                ? "glass-card text-white/60"
                : "glass-card-light text-gray-500"
            }`}
          >
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedComment={selectedComment}
      />
    </div>
  );
};

export default ManagementComments;
