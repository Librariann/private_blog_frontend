import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CommentsProps, CommentType } from "./comments";
import { Settings } from "lucide-react";
import { useState } from "react";
import UserDeleteConfirmModal from "./modal/user-delete-confirm-modal";

const CommentsList = ({ comments, postId }: CommentsProps) => {
  const { isDarkMode } = useDarkModeStore();
  const [openMenuId, setOpenMenuId] = useState<number>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>();

  const toggleOpenComment = (id: number) => {
    setOpenMenuId(id);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`p-5 rounded-xl ${
              isDarkMode
                ? "bg-white/5 border border-white/10"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-3xl">👤</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={isDarkMode ? "text-white" : "text-gray-900"}>
                    {comment.annonymousId}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span
                      className={isDarkMode ? "text-white/50" : "text-gray-400"}
                    >
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                    <span className="relative">
                      <Settings
                        onClick={() => toggleOpenComment(comment.id)}
                        className={`w-4 h-4 cursor-pointer hover:text-white transition-colors ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
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
                                className={`absolute w-20 text-center rounded-lg ${isDarkMode ? "bg-gray-800 border border-white/10" : "bg-white border border-gray-200"}`}
                              >
                                <button
                                  className={`w-full px-4 py-2 text-sm rounded-t-lg hover:bg-blue-500/10 transition-colors cursor-pointer ${isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600"}`}
                                  onClick={() => {
                                    setOpenMenuId(undefined);
                                  }}
                                >
                                  수정
                                </button>{" "}
                                <div
                                  className={`h-px ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`}
                                />
                                <button
                                  className={`w-full px-4 py-2 text-sm rounded-b-lg hover:bg-red-500/10 transition-colors cursor-pointer ${isDarkMode ? "text-red-400 hover:text-red-300" : "text-red-600"}`}
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
                <p className={isDarkMode ? "text-white/70" : "text-gray-600"}>
                  {comment.comment}
                </p>
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
    </div>
  );
};

export default CommentsList;
