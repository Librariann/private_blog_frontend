const PostWriteButton = () => {
  return (
    <button
      className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shadow-lg"
      aria-label="글 작성하기"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </button>
  );
};

export default PostWriteButton;
