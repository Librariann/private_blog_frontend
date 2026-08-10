import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CommentsProps, CommentType } from "./comments";
import { Settings } from "lucide-react";
import { useState } from "react";
import UserDeleteConfirmModal from "./modal/user-delete-confirm-modal";
import UserEditConfirmModal from "./modal/user-edit-comfirm-modal";

const CommentsList = ({ comments, postId }: CommentsProps) => {
  const [openMenuId, setOpenMenuId] = useState<number>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>();

  const toggleOpenComment = (id: number) => {
    setOpenMenuId(id);
  };

  return (
    <div className="editorial-comments-list">
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="editorial-comment"
          >
            <div className="flex items-start space-x-3">
              <div className="editorial-comment-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4>{comment.annonymousId}</h4>
                  <div className="flex items-center gap-3">
                    <span className="editorial-comment-date">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                    <span className="relative">
                      <Settings
                        onClick={() => toggleOpenComment(comment.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      {openMenuId === comment.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenMenuId(undefined)}
                          />
                          <AnimatePresence>
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }} // 시작: 투명하고 작고 위쪽
                              animate={{ scale: 1, opacity: 1 }} // 최종: 보이고 정상크기
                              exit={{ scale: 0.8, opacity: 0 }} // 사라질 때
                              className="relative z-50"
                            >
                              <div
                                className="editorial-comment-menu"
                              >
                                <button
                                  className="w-full px-4 py-2 text-sm cursor-pointer"
                                  onClick={() => {
                                    setIsEditDialogOpen(true);
                                    setOpenMenuId(undefined);
                                    setSelectedComment(comment);
                                  }}
                                >
                                  수정
                                </button>{" "}
                                <div
                                  className="h-px bg-current opacity-20"
                                />
                                <button
                                  className="w-full px-4 py-2 text-sm text-red-600 cursor-pointer"
                                  onClick={() => {
                                    setIsDeleteDialogOpen(true);
                                    setOpenMenuId(undefined);
                                    setSelectedComment(comment);
                                  }}
                                >
                                  삭제
                                </button>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <UserDeleteConfirmModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedComment={selectedComment!}
        postId={postId}
      />

      <UserEditConfirmModal
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        selectedComment={selectedComment!}
        postId={postId}
      />
    </div>
  );
};

export default CommentsList;
