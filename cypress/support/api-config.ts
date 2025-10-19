export const API_CONFIG = {
    baseUrl: `${Cypress.env('API_BASE_URL')}/api/v1`,
    headers: (token: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ?? ''}`,
    }),
    timeout: 10000
  };
  
  export const API_ENDPOINTS = {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      currentUser: '/auth/me',
    },
    tasks: {
      create: '/tasks',
      getAll: '/tasks',
      getById: (id: string) => `/tasks/${id}`,
      updateById: (id: string) => `/tasks/${id}`,
      deleteById: (id: string) => `/tasks/${id}`,
    },
  };