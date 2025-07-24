import { useModalStore } from "../store/modalStore";

const Modal = () => {
  const { isOpen, close, content } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        {content}
        <div className="mt-4 text-center">
          <button onClick={close} className="text-black py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
