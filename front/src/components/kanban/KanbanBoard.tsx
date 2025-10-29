import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Task, TaskStatus } from '../../types/task';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { TaskService } from '../../services/task';

interface KanbanColumnConfig {
  id: TaskStatus;
  title: string;
  color: string;
  textColor: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  columns: KanbanColumnConfig[];
  onTaskUpdate?: (task: Task) => void;
  onTaskClick?: (task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, columns, onTaskUpdate, onTaskClick }) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Agrupar tarefas por status
  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id.toString() === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !activeTask) return;

    const newStatus = over.id as TaskStatus;
    
    // Se o status não mudou, não faz nada
    if (activeTask.status === newStatus) {
      setActiveTask(null);
      return;
    }

    try {
      setIsUpdating(true);
      
      // Atualizar a tarefa via API
      const updatedTask = await TaskService.updateTask(activeTask.id, {
        ...activeTask,
        status: newStatus,
        updated_at: new Date().toISOString()
      });

      // Notificar o componente pai sobre a atualização
      onTaskUpdate?.(updatedTask);
      
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    } finally {
      setIsUpdating(false);
      setActiveTask(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full relative">
        {isUpdating && (
          <div className="absolute top-6 right-6 z-10 bg-linear-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl px-4 py-3 shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></div>
            <span className="text-sm font-medium text-gray-800">Atualizando tarefa...</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 min-h-96">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              tasks={tasksByStatus[column.id] || []}
              status={column.id}
              color={column.color}
              textColor={column.textColor}
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="shadow-2xl">
            <KanbanCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
