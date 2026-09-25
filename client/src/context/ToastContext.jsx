import React, { createContext, useContext, useState, useCallback } from 'react';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const success = (msg, duration) => addToast(msg, 'success', duration);
  const error = (msg, duration) => addToast(msg, 'error', duration);
  const info = (msg, duration) => addToast(msg, 'info', duration);
  const warning = (msg, duration) => addToast(msg, 'warning', duration);

  return (
    <ToastContext.Provider value={{ addToast, success, error, info, warning }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded shadow-industrial-lg border transition-all transform duration-300 animate-slide-in ${
              t.type === 'success'
                ? 'bg-[#111111] text-white border-orange-500'
                : t.type === 'error'
                ? 'bg-[#1a0f0f] text-red-200 border-red-500'
                : t.type === 'warning'
                ? 'bg-[#1a160c] text-yellow-200 border-yellow-500'
                : 'bg-[#1A1A1A] text-white border-zinc-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {t.type === 'success' && <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />}
              {t.type === 'error' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              {t.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-zinc-400 flex-shrink-0" />}
              <span className="text-sm font-medium">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="ml-3 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
