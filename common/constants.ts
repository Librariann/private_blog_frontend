import { PostStatus } from "@/gql/graphql";
import { ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";
type statusType = {
  statusName: string;
  buttonStatus:
    | "secondary"
    | "destructive"
    | "default"
    | "outline"
    | null
    | undefined;
  buttonColor: string;
};
export const LOCAL_STORAGE_TOKEN = "blog-token";
export const handlePathes = ["/login", "/create-account", "/404"];
export const authPage = ["/my-page", "/post-write"];
export const POST_STATUS_OBJECTS: Record<PostStatus, statusType> = {
  [PostStatus.Draft]: {
    statusName: "임시저장",
    buttonStatus: "default",
    buttonColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  [PostStatus.Private]: {
    statusName: "비공개",
    buttonStatus: "default",
    buttonColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  [PostStatus.Published]: {
    statusName: "공개",
    buttonStatus: "default",
    buttonColor: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  [PostStatus.Deleted]: {
    statusName: "삭제됨",
    buttonStatus: "default",
    buttonColor: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};
