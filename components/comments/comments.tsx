import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { MessageCircle } from "lucide-react";
import { ReadMoreButton } from "../buttons/read-more-button";
import CommentsList from "./comments-list";
import CommentsWriteForm from "./comments-write-form";
import { useState } from "react";
import { Comment } from "@/gql/graphql";

const COMMENTS_PER_LOAD = 5;

type comment = {
  comments: Comment[];
};

const Comments = ({ comments }: comment) => {
  const { isDarkMode } = useDarkModeStore();
  const [commentsList, setCommentsList] = useState<Comment[]>(
    [...comments].reverse()
  );

  const handleAddComments = (addComment: Comment) => {
    setCommentsList([addComment, ...commentsList]);
  };

  const [displayedCommentsCount, setDisplayedCommentsCount] = useState(5);
  const displayedComments = commentsList.slice(0, displayedCommentsCount);
  const handleLoadMoreComments = () => {
    setDisplayedCommentsCount((prev) =>
      Math.min(prev + COMMENTS_PER_LOAD, commentsList.length)
    );
  };

  const hasMoreComments = displayedCommentsCount < commentsList.length;
  return (
    <div
      className={`rounded-2xl p-8 mb-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
    >
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle
          className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-gray-900"}`}
        />
        <h3 className={isDarkMode ? "text-white" : "text-gray-900"}>
          댓글 {commentsList.length}
        </h3>
      </div>

      {/* Comment Form */}
      <CommentsWriteForm
        comments={commentsList}
        handleAddComments={handleAddComments}
        displayedCommentsCount={displayedCommentsCount}
      />

      {/* Comments List */}
      <CommentsList
        comments={commentsList}
        displayedComments={displayedComments}
      />

      {/* Load More Button */}
      {hasMoreComments && (
        <div className="flex justify-center mt-6">
          <ReadMoreButton
            onClick={handleLoadMoreComments}
            variant="outline"
            className={
              isDarkMode
                ? "bg-white/5 hover:bg-white/10 text-white border-white/20"
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
            }
          >
            댓글 더보기 ({commentsList.length - displayedCommentsCount}개 남음)
          </ReadMoreButton>
        </div>
      )}
    </div>
  );
};

export default Comments;
