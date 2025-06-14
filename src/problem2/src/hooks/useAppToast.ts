export const useAppToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const toast = document.createElement('div');
    const colors = {
      success: 'bg-green-100 text-green-800 border-green-200',
      error: 'bg-red-100 text-red-800 border-red-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    };

    const toastRoot = document.createElement('div');
    toastRoot.className = `p-4 rounded-lg shadow-lg border ${colors[type]}`;
    toastRoot.textContent = message;
    toast.appendChild(toastRoot);

    const viewport = document.querySelector('[data-radix-toast-viewport]');
    if (viewport) {
      viewport.appendChild(toast);
      setTimeout(() => toast.remove(), 5000);
    }
  };

  return {
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info')
  };
};
