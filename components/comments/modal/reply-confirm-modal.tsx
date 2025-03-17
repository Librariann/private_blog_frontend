import { NewButton } from "@/components/buttons/new-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/text-area";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

const ReplyConfirmModal = () => {
  const { isDarkMode } = useDarkModeStore();
  return (
    <Dialog>
      {/* <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}> */}
      <DialogContent
        className={`max-w-2xl ${
          isDarkMode
            ? "glass-card border-white/20"
            : "glass-card-light border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            답글 작성
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            {/* {selectedComment?.annonymousId}님의 댓글에 답글을 작성합니다 */}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Original Comment */}
          <div
            className={`p-4 rounded-lg ${
              isDarkMode
                ? "bg-white/5 border border-white/10"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div
              className={`text-sm mb-2 ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
            >
              원본 댓글:
            </div>
            <p className={isDarkMode ? "text-white/80" : "text-gray-700"}>
              {/* {selectedComment?.comment} */}
            </p>
          </div>

          {/* Reply Textarea */}
          <div className="space-y-2">
            <Textarea
              placeholder="답글을 입력하세요..."
              // value={replyContent}
              // onChange={(e) => setReplyContent(e.target.value)}
              rows={5}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          <div className="flex gap-3">
            <NewButton
              // onClick={handleReplyComment}
              className={`flex-1 ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              답글 작성
            </NewButton>
            <NewButton
              variant="outline"
              onClick={() => {
                //   setIsReplyDialogOpen(false);
                //   setReplyContent("");
              }}
              className={`flex-1 ${
                isDarkMode
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-gray-300"
              }`}
            >
              취소
            </NewButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ReplyConfirmModal;
