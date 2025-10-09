import { useState } from "react";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl text-center">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-gray-600 mb-6 text-center">{message}</p>
        {isComment && (
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="border border-gray-300 rounded w-full p-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => {
              onConfirm(password);
              setPassword("");
            }}
            className={`px-4 py-2 bg-blue-500 text-white rounded transition-colors hover:bg-blue-600`}
          >
            확인
          </button>
          {!isCancel && (
            <button
              onClick={onClose}
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded transition-colorshover:bg-gray-300`}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
