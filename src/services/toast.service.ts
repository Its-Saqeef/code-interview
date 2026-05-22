import { toast } from 'sonner';

interface ToastOptions {
  description?: string;
  duration?: number;
}

export const toastService = {
  success(message: string, options?: ToastOptions) {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },
  error(message: string, options?: ToastOptions) {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },
  info(message: string, options?: ToastOptions) {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },
  warning(message: string, options?: ToastOptions) {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration,
    });
  },
};
