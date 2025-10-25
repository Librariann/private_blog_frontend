type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isCancel: boolean;
  loading?: boolean;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isCancel = false,
  loading = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl text-center">
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-gray-600 mb-6 text-center">{message}</p>

        {loading && (
          <div className="mb-4 flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex justify-center space-x-3">
          <button
            onClick={() => {
              onConfirm();
            }}
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white rounded transition-colors ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            확인
          </button>
          {!isCancel && (
            <button
              onClick={onClose}
              disabled={loading}
              className={`px-4 py-2 bg-gray-200 text-gray-700 rounded transition-colors ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
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
