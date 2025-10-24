import { useState, useEffect, useCallback } from 'react';
import { TaskService } from '../services/task';
import { Task } from '../types/task';

// Cache global persistente
class TasksCache {
  private static instance: TasksCache;
  private tasks: Task[] = [];
  private lastFetch: number = 0;
  private isLoading: boolean = false;
  private error: string | null = null;
  private listeners: Set<() => void> = new Set();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  static getInstance(): TasksCache {
    if (!TasksCache.instance) {
      TasksCache.instance = new TasksCache();
    }
    return TasksCache.instance;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener());
  }

  async fetchTasks(forceRefresh = false): Promise<void> {
    const now = Date.now();
    const isCacheValid = now - this.lastFetch < this.CACHE_DURATION;

    // Se o cache ainda é válido e não é um refresh forçado, não faz nova requisição
    if (isCacheValid && !forceRefresh && this.tasks.length > 0) {
      this.isLoading = false;
      this.error = null;
      this.notify();
      return;
    }

    if (this.isLoading) return; // Evita múltiplas requisições simultâneas

    try {
      this.isLoading = true;
      this.error = null;
      this.notify();

      const data = await TaskService.getTasks();
      this.tasks = data;
      this.lastFetch = now;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Erro ao carregar tarefas';
    } finally {
      this.isLoading = false;
      this.notify();
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  getError(): string | null {
    return this.error;
  }

  invalidateCache(): void {
    this.lastFetch = 0;
  }

  addTask(task: Task): void {
    this.tasks = [task, ...this.tasks];
    this.notify();
  }

  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    this.notify();
  }

  removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.notify();
  }
}

interface UseTasksReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  invalidateCache: () => void;
}

export const useTasks = (): UseTasksReturn => {
  const cache = TasksCache.getInstance();
  const [, forceUpdate] = useState({});

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    const unsubscribe = cache.subscribe(triggerUpdate);
    cache.fetchTasks();
    return unsubscribe;
  }, [cache, triggerUpdate]);

  const refetch = useCallback(() => {
    return cache.fetchTasks(true);
  }, [cache]);

  const invalidateCache = useCallback(() => {
    cache.invalidateCache();
  }, [cache]);

  return {
    tasks: cache.getTasks(),
    isLoading: cache.getIsLoading(),
    error: cache.getError(),
    refetch,
    invalidateCache,
  };
};
