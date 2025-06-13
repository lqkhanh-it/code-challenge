import { toast } from "sonner";

export const useAppToast = () => {
  return {
    success: (message: string) => {
      toast.success(message, {
        className: "bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 shadow-lg",
        closeButton: true,
        duration: 5000,
      });
    },
    error: (message: string) => {
      toast.error(message, {
        className: "bg-white dark:bg-gray-800 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 shadow-lg",
        closeButton: true,
        duration: 5000,
      });
    },
    info: (message: string) => {
      toast.info(message, {
        className: "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 shadow-lg",
        closeButton: true,
        duration: 5000,
      });
    },
  };
};
