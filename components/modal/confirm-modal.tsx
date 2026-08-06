import { useState } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password?: string) => void;
  title: string;
  message: string;
  isCancel: boolean;
  loading?: boolean;
  isComment?: boolean;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isCancel = false,
  isComment = false,
}: ConfirmModalProps) => {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return createPortal(
    <div className="editorial-modal-backdrop">
      <div className="editorial-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <span className="editorial-kicker">Confirmation / 01</span>
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        {isComment && (
          <input
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력해주세요"
            className="editorial-field w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => {
              if (isComment) {
                onConfirm(password);
              } else {
                onConfirm();
              }
            }}
            className="editorial-signal-button"
          >
            확인
          </button>
          {!isCancel && (
            <button
              onClick={onClose}
              className="editorial-outline-button"
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
