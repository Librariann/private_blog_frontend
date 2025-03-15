import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { CommentsProps } from "./comments";

const CommentsList = ({ comments }: CommentsProps) => {
  const { isDarkMode } = useDarkModeStore();
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
                  <span
                    className={isDarkMode ? "text-white/50" : "text-gray-400"}
                  >
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>
                </div>
                <p className={isDarkMode ? "text-white/70" : "text-gray-600"}>
                  {comment.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CommentsList;
