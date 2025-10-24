import { API_CONFIG, getApiUrl } from '../config/api';
import { Task, TaskCreateRequest, TaskUpdateRequest } from '../types/task';
import { authService } from './auth';

export class TaskService {
  private static baseUrl = getApiUrl(API_CONFIG.ENDPOINTS.TASKS);

  private static getAuthHeaders(): HeadersInit {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  static async getTasks(): Promise<Task[]> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar tarefas: ${response.statusText}`);
    }

    return response.json();
  }

  static async getTaskById(id: number): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar tarefa: ${response.statusText}`);
    }

    return response.json();
  }

  static async createTask(task: TaskCreateRequest): Promise<Task> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar tarefa: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateTask(id: number, task: TaskUpdateRequest): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar tarefa: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar tarefa: ${response.statusText}`);
    }
  }
}
