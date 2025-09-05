import { UserInfoType } from "@/pages";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfoState {
  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType) => void;
}

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  userInfo: null,
  setUserInfo: (userInfo: UserInfoType) => set({ userInfo }),
}));
