// Configuração da API baseada no backend
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  API_V1_STR: '/api/v1',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    TASKS: '/tasks',
  }
} as const;

export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_V1_STR}${endpoint}`;
};