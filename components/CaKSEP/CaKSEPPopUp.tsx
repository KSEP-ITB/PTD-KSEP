import React, { useState } from "react";

interface PopupProps {
  title: string;
  placeholder: string;
  onCancel: () => void;
  onSubmit: (reason: string) => void;
}

const CaKSEPPopup: React.FC<PopupProps> = ({ title, placeholder, onCancel, onSubmit }) => {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-b from-red-500 to-orange-500 p-6 rounded-lg w-[400px]">
        <h2 className="text-white text-center font-bold text-lg mb-4">{title}</h2>
        <textarea
          className="w-full p-4 rounded-lg border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={() => onSubmit(reason)}
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaKSEPPopup;