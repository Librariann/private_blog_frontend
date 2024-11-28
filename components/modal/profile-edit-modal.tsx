import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";
import { NewButton } from "../buttons/new-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/text-area";
import { Input } from "../ui/input";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { MeType } from "@/hooks/useMe";
import { useUpdateUserProfile } from "@/hooks/hooks";
import { toast } from "react-toastify";
import { uploadImageToServer } from "@/utils/utils";
import { useLoadingStore } from "@/stores/useLoadingStore";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: MeType;
}

const ProfileEditModal = ({ isOpen, onClose, data }: ProfileEditModalProps) => {
  const { isDarkMode } = useDarkModeStore();
  const { updateUserProfileMutation, profileUpdateLoading } =
    useUpdateUserProfile();
  const { setGlobalLoading } = useLoadingStore();

  const [formData, setFormData] = useState({
    nickname: "",
    role: "",
    introduce: "",
    email: "",
    location: "",
    website: "",
  });

  const [formDataChange, setFormDataChange] = useState({});
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setFormDataChange({ ...formDataChange, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfileMutation({
      variables: {
        input: {
          ...formDataChange,
        },
      },
    });
    if (!profileUpdateLoading) {
      onClose();
      setFormDataChange({});
      toast.success("프로필 변경 완료!");
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        nickname: data.me.nickname,
        role: data.me.role,
        introduce: data.me.introduce,
        email: data.me.email,
        location: data.me.location,
        website: data.me.website,
      });
    }
  }, [data]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadProfileImage = async (file: File) => {
    try {
      setGlobalLoading(true);
      const profileImage = await uploadImageToServer(file, "profile");
      const result = await updateUserProfileMutation({
        variables: {
          input: {
            profileImage: profileImage,
          },
        },
      });
      if (result.data?.updateUserProfile.ok) {
        toast.success("프로필 이미지 변경 완료!");
      } else {
        toast.error(result.data?.updateUserProfile.error);
      }
    } catch (e) {
      toast.error("프로필 이미지 변경 실패!");
    } finally {
      setGlobalLoading(false);
    }
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
              <AvatarImage src={`${data?.me?.profileImage || ""}`} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl">
                Dev
              </AvatarFallback>
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await uploadProfileImage(file);
                }
              }}
            />
            <NewButton
              type="button"
              variant="default"
              className={`
                cursor-pointer
                ${
                  isDarkMode
                    ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    : ""
                }`}
              onClick={() => fileInputRef.current?.click()}
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
              value={formData.nickname}
              onChange={(e) => handleChange("nickname", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* role */}
          <div className="space-y-2">
            <Label
              htmlFor="role"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              직책
            </Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {/* introduce */}
          <div className="space-y-2">
            <Label
              htmlFor="introduce"
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
              소개
            </Label>
            <Textarea
              id="introduce"
              value={formData.introduce}
              onChange={(e) => handleChange("introduce", e.target.value)}
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
              className={`flex-1 cursor-pointer ${
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
              className={`flex-1 cursor-pointer ${
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
