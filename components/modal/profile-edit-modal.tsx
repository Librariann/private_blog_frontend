import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { NewButton } from "../buttons/new-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/text-area";
import { Input } from "../ui/input";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal = ({ isOpen, onClose }: ProfileEditModalProps) => {
  const { isDarkMode } = useDarkModeStore();

  const [formData, setFormData] = useState({
    name: "김개발",
    title: "Full Stack Developer",
    bio: "웹 기술과 클라우드 아키텍처에 관심이 많은 개발자입니다. 최신 기술 트렌드와 실무 경험을 공유합니다.",
    email: "developer@example.com",
    location: "서울, 대한민국",
    website: "github.com/developer",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 저장 로직
    console.log("Profile saved:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-xs border-white/20"
            : "backdrop-blur-xs border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            프로필 수정
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://images.unsplash.com/photo-1517309561013-16f6e4020305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwcm9maWxlfGVufDF8fHx8MTc2MzAwOTM0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl">
                Dev
              </AvatarFallback>
            </Avatar>
            <NewButton
              type="button"
              variant="default"
              className={
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  : ""
              }
            >
              프로필 이미지 변경
            </NewButton>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              이름
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              직책
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label
              htmlFor="bio"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              소개
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label
              htmlFor="location"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              위치
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label
              htmlFor="website"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              웹사이트 / GitHub
            </Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <NewButton
              type="submit"
              className={`flex-1 ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              저장
            </NewButton>
            <NewButton
              type="button"
              variant="default"
              onClick={onClose}
              className={`flex-1 ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  : "border-gray-300"
              }`}
            >
              취소
            </NewButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
