const CommentsWrite = () => {
  return (
    <form className="mb-8 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="아이디"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <textarea
        placeholder="댓글을 입력하세요"
        className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          댓글 작성
        </button>
      </div>
    </form>
  );
};

export default CommentsWrite;
