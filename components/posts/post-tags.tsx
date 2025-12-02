import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { Tag } from "lucide-react";

type tagsType = {
  hashtags: { hashtag: string }[];
};

const PostTags = ({ hashtags }: tagsType) => {
  const { isDarkMode } = useDarkModeStore();
  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <div className="flex items-center space-x-2 mb-3">
        <Tag
          className={`w-4 h-4 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
        />
        <span className={isDarkMode ? "text-white/60" : "text-gray-500"}>
          태그
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 backdrop-blur-sm rounded-full border transition-all cursor-pointer ${
              isDarkMode
                ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            }`}
          >
            #{tag.hashtag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostTags;
