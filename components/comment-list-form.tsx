import { CommentProps } from "./comments";

const CommentListForm = ({ comment }: { comment: CommentProps }) => {
  return (
    <div className="space-y-6 border-t">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold">{comment.commentId}</div>
          <div className="text-sm text-gray-500">{comment.createdAt}</div>
        </div>
        <p className="text-gray-700">{comment.comment}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button className="text-sm text-blue-500 hover:text-blue-600">
            수정
          </button>
          <button className="text-sm text-red-500 hover:text-red-600">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentListForm;
