export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  tokenIconsBaseUrl: import.meta.env.VITE_TOKEN_ICONS_BASE_URL,
  defaultPlaceholderIcon: import.meta.env.VITE_DEFAULT_PLACEHOLDER_ICON,
  swapTimeout: Number(import.meta.env.VITE_SWAP_TIMEOUT),
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'VITE_API_BASE_URL',
  'VITE_TOKEN_ICONS_BASE_URL',
  'VITE_DEFAULT_PLACEHOLDER_ICON',
  'VITE_SWAP_TIMEOUT',
] as const;

requiredEnvVars.forEach((envVar) => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}); 