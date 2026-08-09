import { Tag } from "lucide-react";

type tagsType = {
  hashtags: { hashtag: string }[];
};

const PostTags = ({ hashtags }: tagsType) => {
  return (
    <div className="editorial-post-tags">
      <div className="flex items-center space-x-2 mb-3">
        <Tag className="w-4 h-4" />
        <span>Filed under</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className="editorial-inline-tag"
          >
            #{tag.hashtag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostTags;
