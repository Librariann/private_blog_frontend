import CommentListForm from "./comment-list-form";

export type CommentProps = {
  id: number;
  commentId: string;
  comment: string;
  createdAt: string;
};

const Comments = ({ comments }: { comments: CommentProps[] }) => {
  return (
    <div className="mt-16 pt-8">
      {/* 댓글 갯수 */}
      {comments.length === 0 ? (
        <h2 className="text-2xl font-bold mb-6"></h2>
      ) : (
        <h2 className="text-2xl font-bold mb-6">댓글 {comments.length}개</h2>
      )}
      {/* 댓글 목록 */}
      {comments
        .slice()
        .reverse()
        .map((comment) => {
          return <CommentListForm key={comment.id} comment={comment} />;
        })}
    </div>
  );
};

export default Comments;
