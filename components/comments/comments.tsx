import { MessageCircle } from "lucide-react";
import { ReadMoreButton } from "../buttons/read-more-button";
import CommentsList from "./comments-list";
import CommentsWriteForm from "./comments-write-form";
import { useEffect, useState } from "react";
import { Comment } from "@/gql/graphql";

const COMMENTS_PER_LOAD = 5;

export type CommentType = Pick<
  Comment,
  "id" | "comment" | "createdAt" | "annonymousId"
>;

export type CommentsProps = {
  comments: CommentType[];
  postId: number;
};

const Comments = ({ comments, postId }: CommentsProps) => {
  const [commentsList, setCommentsList] = useState<CommentType[]>([
    ...comments,
  ]);

  useEffect(() => {
    setCommentsList([...comments]);
  }, [comments]);

  const [displayedCommentsCount, setDisplayedCommentsCount] = useState(5);
  const displayedComments = commentsList.slice(0, displayedCommentsCount);
  const handleLoadMoreComments = () => {
    setDisplayedCommentsCount((prev) =>
      Math.min(prev + COMMENTS_PER_LOAD, commentsList.length)
    );
  };

  const hasMoreComments = displayedCommentsCount < commentsList.length;
  return (
    <section className="editorial-comments">
      <div className="editorial-comments-heading">
        <MessageCircle className="w-5 h-5" />
        <h3>독자의 메모</h3>
        <span>{commentsList.length.toString().padStart(2, "0")} COMMENTS</span>
      </div>

      {/* Comment Form */}
      <CommentsWriteForm postId={postId} />

      {/* Comments List */}
      <CommentsList postId={postId} comments={displayedComments} />

      {/* Load More Button */}
      {hasMoreComments && (
        <div className="flex justify-center mt-6">
          <ReadMoreButton
            onClick={handleLoadMoreComments}
            variant="outline"
            className="editorial-outline-button"
          >
            댓글 더보기 ({commentsList.length - displayedCommentsCount}개 남음)
          </ReadMoreButton>
        </div>
      )}
    </section>
  );
};

export default Comments;
