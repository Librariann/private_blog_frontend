import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Link as LinkIcon } from "lucide-react";
import { GlassCardMain } from "./main";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

const ProfileSidebar = () => {
  const { isDarkMode } = useDarkModeStore();
  return (
    <GlassCardMain isDarkMode={isDarkMode} className="rounded-2xl p-6">
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
          박성현
        </h3>
        <p className={isDarkMode ? "text-white/70 mb-4" : "text-gray-600 mb-4"}>
          Software Developer
        </p>

        <p className={isDarkMode ? "text-white/60 mb-4" : "text-gray-500 mb-4"}>
          기술로 문제를 해결하고, 경험을 기록하는 개발자입니다.
        </p>

        <div
          className={`space-y-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
        >
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>서울, 대한민국</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <LinkIcon className="w-4 h-4" />
            <a
              href="https://github.com/Librariann"
              target="_blank"
              className={`transition-colors ${
                isDarkMode
                  ? "text-blue-300 hover:text-blue-200"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              https://github.com/Librariann
            </a>
          </div>
        </div>

        <div
          className={`mt-6 pt-6 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
        >
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                42
              </div>
              <div className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                Posts
              </div>
            </div>
            <div>
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                1.2K
              </div>
              <div className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                Views
              </div>
            </div>
            <div>
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                127
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
