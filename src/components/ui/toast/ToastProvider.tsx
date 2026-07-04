"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";

import ToastItem from "./ToastItem";

import { Toast, ToastContext } from "./ToastContext";

interface Props {
  children: ReactNode;
}

export default function ToastProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: "success" | "error", message: string) => {
      const id = Date.now().toString() + Math.random().toString(36);

      setToasts((current) => [
        ...current,
        {
          id,
          type,
          message,
        },
      ]);

      setTimeout(() => {
        remove(id);
      }, 4000);
    },
    [remove],
  );

  const value = useMemo(
    () => ({
      success: (message: string) => addToast("success", message),

      error: (message: string) => addToast("error", message),
    }),
    [addToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-4">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
