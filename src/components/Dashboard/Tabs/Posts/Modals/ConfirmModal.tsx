import BinIcon from '@/assets/BinIcon';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface PreviewModalProps {
  setIsConfirmModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsConfirmed: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmModal({
  setIsConfirmModalOpen,
  setIsConfirmed,
}: PreviewModalProps) {
  useEffect(() => {
    return () => {
      setIsConfirmed(false);
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black/[50%] border border-black rounded flex items-center justify-center z-20">
      <div className="bg-white relative w-1/3 h-1/3 flex flex-col justify-center items-center gap-8 p-4">
        <h3 className="text-xl">Are you sure you want to delete the post?</h3>
        <div className="w-full flex flex-col gap-4 justify-evenly">
          <button
            className="flex justify-center items-center gap-2 w-full p-3 rounded font-bold text-white bg-red-600 hover:bg-red-400 duration-100"
            onClick={() => {
              setIsConfirmed(true);
              setIsConfirmModalOpen(false);
            }}
          >
            <BinIcon color="white" />
            DELETE
          </button>
          <button
            className="flex-1 p-3 border border-2 border-black hover:border-black/[0.5] rounded-md duration-100"
            onClick={() => setIsConfirmModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
