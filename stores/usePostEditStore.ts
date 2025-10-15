import { PostFieldsFragment } from "@/gql/graphql";
import { create } from "zustand";

interface PostEditStore {
  editingPost: PostFieldsFragment | null;
  setEditingPost: (post: PostFieldsFragment | null) => void;
  editingMode: boolean;
  setEditingMode: (mode: boolean) => void;
}

export const usePostEditStore = create<PostEditStore>((set) => ({
  editingPost: null,
  setEditingPost: (post) => set({ editingPost: post }),
  editingMode: false,
  setEditingMode: (mode) => set({ editingMode: mode }),
}));
