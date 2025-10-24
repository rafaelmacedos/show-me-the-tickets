// Tipos baseados na API de tarefas do backend
export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress", 
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DELAYED = "delayed"
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent"
}

export enum TaskCategory {
  WORK = "work",
  PERSONAL = "personal",
  FAMILY = "family",
  HEALTH = "health",
  FINANCE = "finance",
  OTHER = "other"
}

export interface Task {
  id: number;
  title: string;
  description: string;
  due_datetime?: string;
  created_at: string;
  updated_at: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assigneeId?: number;
}

export interface TaskCreateRequest {
  title: string;
  description: string;
  due_datetime?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assigneeId: number;
}

export interface TaskUpdateRequest {
  title: string;
  description: string;
  due_datetime?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assigneeId: number;
}

// Mapeamentos para exibição em português
export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.PENDING]: "Pendente",
  [TaskStatus.IN_PROGRESS]: "Em Progresso",
  [TaskStatus.COMPLETED]: "Concluída",
  [TaskStatus.CANCELLED]: "Cancelada",
  [TaskStatus.DELAYED]: "Atrasada"
};

export const TaskPriorityLabels: Record<TaskPriority, string> = {
  [TaskPriority.LOW]: "Baixa",
  [TaskPriority.MEDIUM]: "Média",
  [TaskPriority.HIGH]: "Alta",
  [TaskPriority.URGENT]: "Urgente"
};

export const TaskCategoryLabels: Record<TaskCategory, string> = {
  [TaskCategory.WORK]: "Trabalho",
  [TaskCategory.PERSONAL]: "Pessoal",
  [TaskCategory.FAMILY]: "Família",
  [TaskCategory.HEALTH]: "Saúde",
  [TaskCategory.FINANCE]: "Financeiro",
  [TaskCategory.OTHER]: "Outro"
};
