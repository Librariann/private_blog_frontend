const Comments = () => {
  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">댓글</h2>
      {/* 댓글 목록 */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold">작성자</div>
            <div className="text-sm text-gray-500">2024-01-01</div>
          </div>
          <p className="text-gray-700">댓글 내용이 여기에 표시됩니다.</p>
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
    </div>
  );
};

export default Comments;
