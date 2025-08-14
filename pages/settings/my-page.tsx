import { useDarkModeStore } from "@/stores/useDarkmodStore";
import React from "react";
import {
  Edit,
  Eye,
  Bell,
  Mail,
  MapPin,
  LinkIcon,
  Calendar,
  FileText,
  FolderTree,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GlassCardMain } from "@/components/main/main";
import { NewButton } from "@/components/buttons/new-button";
import { useMe } from "@/hooks/useMe";
import ProfileEditModal from "@/components/modal/profile-edit-modal";
import { formatNumberConvertK } from "@/utils/utils";
import { useRouter } from "next/router";

const userStats = [
  { label: "작성한 포스트", value: "42", icon: Edit },
  { label: "총 조회수", value: "1.2K", icon: Eye },
  { label: "받은 댓글", value: "127", icon: Bell },
];

const MyPage = () => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isDarkMode } = useDarkModeStore();
  const { data, error } = useMe();

  if (data === undefined && error === "Token has expired") {
    return null;
  }

  const allPostLength = data?.me?.posts?.length;
  const allPostViews = data?.me?.posts?.reduce(
    (acc, post) => acc + post.hits,
    0
  );
  const allCommentsLength = data?.me?.posts?.reduce(
    (acc, post) => acc + post.comments.length,
    0
  );
  userStats[0].value = allPostLength?.toString() || "0";
  userStats[1].value = formatNumberConvertK(allPostViews || 0);
  userStats[2].value = allCommentsLength?.toString() || "0";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Back Button */}
      <button
        // onClick={onBack}
        className={`flex items-center space-x-2 mb-6 transition-colors ${
          isDarkMode
            ? "text-white/70 hover:text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>뒤로가기</span>
      </button>

      {/* Profile Header */}
      <GlassCardMain
        $isDarkMode={isDarkMode}
        className="rounded-2xl p-6 sm:p-8 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <Avatar
            className={`w-24 h-24 sm:w-32 sm:h-32 ring-4 ${isDarkMode ? "ring-white/20" : "ring-blue-200"}`}
          >
            <AvatarImage src={`${data?.me?.profileImage || ""}`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl">
              Dev
            </AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1
                  className={`mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  {data?.me?.nickname}
                </h1>
                <p className={isDarkMode ? "text-white/70" : "text-gray-600"}>
                  {data?.me?.role}
                </p>
              </div>
              <NewButton
                variant="default"
                size="lg"
                className={`mt-4 sm:mt-0 ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                프로필 수정
              </NewButton>
            </div>

            <p
              className={`mb-4 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
            >
              {data?.me?.introduce}
            </p>

            <div
              className={`flex flex-wrap gap-4 justify-center sm:justify-start ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{data?.me?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{data?.me?.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LinkIcon className="w-4 h-4" />
                <a
                  href={`${data?.me?.website}`}
                  target="_blank"
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-blue-300 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {data?.me?.website}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(data?.me?.createdAt!).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                  })}{" "}
                  가입
                </span>
              </div>
            </div>
          </div>
        </div>
      </GlassCardMain>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {userStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <GlassCardMain
              key={index}
              $isDarkMode={isDarkMode}
              className="rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon
                  className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                />
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                  {stat.value}
                </span>
              </div>
              <p className={isDarkMode ? "text-white/60" : "text-gray-600"}>
                {stat.label}
              </p>
            </GlassCardMain>
          );
        })}
      </div>

      {/* Recent Posts */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6 mb-6">
        <h2 className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          최근 작성한 글
        </h2>
        <div className="space-y-3">
          {data?.me?.posts?.slice(0, 3).map((post, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3
                    className={`mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {post.title}
                  </h3>
                  <div
                    className={`flex items-center gap-3 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
                  >
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {post.hits}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={isDarkMode ? "border-white/20 text-white/70" : ""}
                >
                  공개
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCardMain>

      {/* Blog Management */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
        <h2 className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          블로그 관리
        </h2>
        <div className="space-y-2">
          <button
            onClick={() => router.push("/settings/management-posts")}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors cursor-pointer ${
              isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText
                className={`w-5 h-5 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
              />
              <div className="text-left">
                <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                  포스트 관리
                </div>
                <div
                  className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                >
                  글 작성, 수정, 삭제
                </div>
              </div>
            </div>
            <span className={isDarkMode ? "text-white/40" : "text-gray-400"}>
              ›
            </span>
          </button>
          <button
            // onClick={onNavigateToCategoryManagement}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <FolderTree
                className={`w-5 h-5 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
              />
              <div className="text-left">
                <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                  카테고리 관리
                </div>
                <div
                  className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                >
                  카테고리 추가, 수정, 삭제
                </div>
              </div>
            </div>
            <span className={isDarkMode ? "text-white/40" : "text-gray-400"}>
              ›
            </span>
          </button>
          <button
            // onClick={onNavigateToCommentManagement}
            className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare
                className={`w-5 h-5 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
              />
              <div className="text-left">
                <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                  댓글 관리
                </div>
                <div
                  className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                >
                  댓글 승인, 삭제, 스팸 관리
                </div>
              </div>
            </div>
            <span className={isDarkMode ? "text-white/40" : "text-gray-400"}>
              ›
            </span>
          </button>
        </div>
      </GlassCardMain>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        data={data!}
      />
    </div>
  );
};

export default MyPage;
