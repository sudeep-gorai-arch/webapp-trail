"use client";

import { FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
import { Toast } from "./ToastContext";

interface Props {
  toast: Toast;
  onClose: (id: string) => void;
}

export default function ToastItem({ toast, onClose }: Props) {
  const success = toast.type === "success";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[360px] max-w-[420px] animate-[toastIn_.25s_ease] ${
        success
          ? "border-green-500/40 bg-green-500/10"
          : "border-red-500/40 bg-red-500/10"
      }`}
    >
      <div className="flex items-start gap-4 p-5">
        <div className="mt-0.5">
          {success ? (
            <FiCheckCircle className="text-green-400" size={24} />
          ) : (
            <FiXCircle className="text-red-400" size={24} />
          )}
        </div>

        <div className="flex-1">
          <h4 className="font-bold text-white">
            {success ? "Success" : "Error"}
          </h4>

          <p className="mt-1 text-sm text-white/80 leading-relaxed">
            {toast.message}
          </p>
        </div>

        <button
          onClick={() => onClose(toast.id)}
          className="text-white/50 hover:text-white transition"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Progress Bar */}
      <div
        className={`h-1 ${
          success ? "bg-green-500" : "bg-red-500"
        } animate-[toastProgress_4s_linear_forwards]`}
      />

      <style jsx>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes toastProgress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
