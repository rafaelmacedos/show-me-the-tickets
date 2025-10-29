import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Task, TaskStatus } from '../../types/task';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  color: string;
  textColor: string;
  onTaskClick?: (task: Task) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  tasks,
  status,
  color,
  textColor,
  onTaskClick
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  return (
    <div className="w-full">
      <div className={`rounded-2xl border-2 ${color} p-6 min-h-96 flex flex-col shadow-lg ${
        isOver ? 'ring-4 ring-blue-400 ring-opacity-60' : ''
      }`}>
        {/* Header da coluna */}
        <div className="flex items-center justify-between mb-6">
          <h3 className={`font-bold text-xl ${textColor}`}>
            {title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${textColor} bg-white/80 shadow-sm`}>
            {tasks.length}
          </span>
        </div>

        {/* Área de drop */}
        <div ref={setNodeRef} className="flex-1">
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className={`text-center py-12 ${textColor} opacity-60 ${
                isOver ? 'bg-blue-50 rounded-xl border-2 border-dashed border-blue-300' : 'bg-white/30 rounded-xl'
              }`}>
                <div className="text-4xl mb-4">📋</div>
                <p className="text-sm font-medium">
                  {isOver ? 'Solte a tarefa aqui' : 'Nenhuma tarefa'}
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <KanbanCard key={task.id} task={task} onClick={onTaskClick} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
