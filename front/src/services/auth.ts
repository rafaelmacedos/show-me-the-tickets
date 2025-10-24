import { getApiUrl, API_CONFIG } from '../config/api';
import { LoginCredentials, AuthResponse, User, AuthError } from '../types/auth';

class AuthService {
  private token: string | null = null;

  constructor() {
    // Recuperar token do localStorage se existir
    this.token = localStorage.getItem('auth_token');
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.LOGIN), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error: AuthError = await response.json();
      
      // Tratar especificamente erro de credenciais inválidas
      if (response.status === 401) {
        throw new Error('Credenciais inválidas. Verifique seu email e senha.');
      }
      
      throw new Error(error.detail || 'Erro ao fazer login');
    }

    const data: AuthResponse = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async getCurrentUser(): Promise<User> {
    if (!this.token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ME), {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    return response.json();
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const authService = new AuthService();
