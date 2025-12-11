import { useDarkModeStore } from "@/stores/useDarkmodStore";
import React, { useMemo } from "react";
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
import { formatDateHHMMSS, formatNumberConvertK } from "@/utils/utils";
import { useRouter } from "next/router";
import { POST_STATUS_OBJECTS } from "@/common/constants";
import { PostStatus } from "@/gql/graphql";

type managementListType = {
  title: string;
  label: string;
  href: string;
};

const managementList: managementListType[] = [
  {
    title: "포스트관리",
    label: "글 작성, 수정, 삭제",
    href: "/settings/management-posts",
  },
  {
    title: "카테고리관리",
    label: "카테고리 추가, 수정, 삭제",
    href: "/settings/management-categories",
  },
  {
    title: "댓글관리",
    label: "댓글 관리",
    href: "/settings/management-comments",
  },
];

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

  const userData = useMemo(() => data?.me, [data]);

  if (userData === undefined && error === "Token has expired") {
    return null;
  }

  const allPostLength = userData?.posts?.filter(
    (post) => post.postStatus === "PUBLISHED"
  ).length;
  const allPostViews = userData?.posts
    ?.filter((post) => post.postStatus === "PUBLISHED")
    .reduce((acc, post) => acc + post.hits, 0);
  const allCommentsLength = userData?.posts
    ?.filter((post) => post.postStatus === "PUBLISHED")
    .reduce((acc, post) => acc + post.comments.length, 0);
  userStats[0].value = allPostLength?.toString() || "0"; //작성한 포스트 갯수
  userStats[1].value = formatNumberConvertK(allPostViews || 0); //총 조회수
  userStats[2].value = allCommentsLength?.toString() || "0"; //총 댓글 갯수

  const managementButton = (props: managementListType) => (
    <button
      onClick={() => router.push(`${props.href}`)}
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
            {props.title}
          </div>
          <div
            className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
          >
            {props.label}
          </div>
        </div>
      </div>
      <span className={isDarkMode ? "text-white/40" : "text-gray-400"}>›</span>
    </button>
  );

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
            <AvatarImage src={`${userData?.profileImage || ""}`} />
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
                  {userData?.nickname}
                </h1>
                <p className={isDarkMode ? "text-white/70" : "text-gray-600"}>
                  {userData?.role}
                </p>
              </div>
              <NewButton
                variant="default"
                size="lg"
                className={`mt-4 sm:mt-0 cursor-pointer ${
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
              {userData?.introduce}
            </p>

            <div
              className={`flex flex-wrap gap-4 justify-center sm:justify-start ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
            >
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{userData?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{userData?.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <LinkIcon className="w-4 h-4" />
                <a
                  href={`${userData?.website}`}
                  target="_blank"
                  className={`transition-colors ${
                    isDarkMode
                      ? "text-blue-300 hover:text-blue-200"
                      : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  {userData?.website}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(userData?.createdAt!).toLocaleDateString("ko-KR", {
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
          최근 작성한 공개 글
        </h2>
        <div className="space-y-3">
          {userData?.posts
            ?.filter((post) => post.postStatus === "PUBLISHED")
            .slice(0, 5)
            .map((post, index) => (
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
                        {formatDateHHMMSS(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.hits}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      POST_STATUS_OBJECTS[post.postStatus as PostStatus]
                        .buttonColor
                    }
                  >
                    {
                      POST_STATUS_OBJECTS[post.postStatus as PostStatus]
                        .statusName
                    }
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
          {managementList.map((item) => managementButton(item))}
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
