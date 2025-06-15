import { ReactNode } from "react";

type CustomModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

const CustomModal = ({
  title = "Modal",
  onClose,
  children,
}: CustomModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
