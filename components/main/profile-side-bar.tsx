import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Link as LinkIcon } from "lucide-react";
import { GlassCardMain } from "./main";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import { formatNumberConvertK } from "@/utils/utils";

const ProfileSidebar = () => {
  const { isDarkMode } = useDarkModeStore();
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const postLength = userInfo?.posts.length;
  const viewLength = formatNumberConvertK(
    userInfo?.posts.reduce((acc, post) => acc + post?.hits, 0) || 0
  );
  const commentLength = userInfo?.posts.reduce(
    (acc, post) => acc + (post?.comments?.length || 0),
    0
  );

  return (
    <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
      <div className="text-center">
        <Avatar
          className={`w-24 h-24 mx-auto mb-4 ring-4 ${isDarkMode ? "ring-white/20" : "ring-blue-200"}`}
        >
          <AvatarImage src="https://images.unsplash.com/photo-1517309561013-16f6e4020305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwcm9maWxlfGVufDF8fHx8MTc2MzAwOTM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            Dev
          </AvatarFallback>
        </Avatar>

        <h3 className={isDarkMode ? "text-white mb-1" : "text-gray-900 mb-1"}>
          {userInfo?.nickname}
        </h3>
        <p className={isDarkMode ? "text-white/70 mb-4" : "text-gray-600 mb-4"}>
          {userInfo?.role}
        </p>

        <p className={isDarkMode ? "text-white/60 mb-4" : "text-gray-500 mb-4"}>
          {userInfo?.introduce}
        </p>

        <div
          className={`space-y-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
        >
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{userInfo?.location}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <LinkIcon className="w-4 h-4" />
            <a
              href={`${userInfo?.website}`}
              target="_blank"
              className={`transition-colors ${
                isDarkMode
                  ? "text-blue-300 hover:text-blue-200"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              {userInfo?.website}
            </a>
          </div>
        </div>

        <div
          className={`mt-6 pt-6 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
        >
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                {postLength}
              </div>
              <div className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                Posts
              </div>
            </div>
            <div>
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                {viewLength}
              </div>
              <div className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                Views
              </div>
            </div>
            <div>
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                {commentLength}
              </div>
              <div className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                Comments
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCardMain>
  );
};

export default ProfileSidebar;
