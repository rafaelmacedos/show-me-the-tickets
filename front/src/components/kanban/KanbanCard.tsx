import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Task, TaskPriority, TaskPriorityLabels, TaskCategory, TaskCategoryLabels } from '../../types/task';

interface KanbanCardProps {
  task: Task;
  onClick?: (task: Task) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id.toString(),
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return 'bg-red-500';
      case TaskPriority.HIGH:
        return 'bg-orange-500';
      case TaskPriority.MEDIUM:
        return 'bg-yellow-500';
      case TaskPriority.LOW:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: TaskCategory) => {
    switch (category) {
      case TaskCategory.WORK:
        return '💼';
      case TaskCategory.PERSONAL:
        return '👤';
      case TaskCategory.FAMILY:
        return '👨‍👩‍👧‍👦';
      case TaskCategory.HEALTH:
        return '🏥';
      case TaskCategory.FINANCE:
        return '💰';
      case TaskCategory.OTHER:
        return '📝';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isOverdue = task.due_datetime && new Date(task.due_datetime) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-5 cursor-pointer hover:shadow-xl hover:border-gray-300 ${
        isDragging ? 'opacity-60' : ''
      }`}
      onClick={() => onClick?.(task)}
      {...listeners}
      {...attributes}
    >
      {/* Header com prioridade e categoria */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getCategoryIcon(task.category)}</span>
          <span className="text-xs text-gray-500 font-medium">
            {TaskCategoryLabels[task.category]}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
          <span className="text-xs text-gray-500">
            {TaskPriorityLabels[task.priority]}
          </span>
        </div>
      </div>

      {/* Título da tarefa */}
      <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2">
        {task.title}
      </h4>

      {/* Data de vencimento */}
      {task.due_datetime && (
        <div className={`text-xs font-medium ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
          {isOverdue ? '⚠️ ' : '📅 '}
          {formatDate(task.due_datetime)}
          {isOverdue && ' (Atrasada)'}
        </div>
      )}

      {/* Data de criação */}
      <div className="text-xs text-gray-400 mt-2">
        Criada em {formatDate(task.created_at)}
      </div>
    </div>
  );
};

export default KanbanCard;
