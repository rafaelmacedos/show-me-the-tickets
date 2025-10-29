import React, { useState, useMemo } from 'react';
import { useTasksContext } from '../../contexts/TasksContext';
import { TaskStatus, TaskStatusLabels, Task } from '../../types/task';
import KanbanBoard from '../kanban/KanbanBoard';
import Loading from '../ui/Loading';
import TicketViewModal from '../ticket/TicketViewModal';

interface KanbanPageProps {
  onEditTask?: (taskId: number) => void;
  onCreateNew?: () => void;
}

const KanbanPage: React.FC<KanbanPageProps> = ({ onEditTask, onCreateNew }) => {
  const { tasks, isLoading, error, refetch } = useTasksContext();
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskUpdate = async (updatedTask: Task) => {
    // Recarregar as tarefas para refletir a mudança
    await refetch();
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleEditTask = (task: Task) => {
    if (onEditTask) {
      onEditTask(task.id);
    }
  };

  // Filtrar tarefas por mês
  const filteredTasks = useMemo(() => {
    if (!selectedMonth) return tasks;
    
    return tasks.filter(task => {
      const taskDate = new Date(task.created_at);
      const taskMonth = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, '0')}`;
      return taskMonth === selectedMonth;
    });
  }, [tasks, selectedMonth]);

  // Gerar opções de meses baseadas nas tarefas
  const monthOptions = useMemo(() => {
    const months = new Set<string>();
    tasks.forEach(task => {
      const taskDate = new Date(task.created_at);
      const monthKey = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = taskDate.toLocaleDateString('pt-BR', { 
        year: 'numeric', 
        month: 'long' 
      });
      months.add(`${monthKey}|${monthLabel}`);
    });
    
    return Array.from(months).sort().reverse(); // Mais recentes primeiro
  }, [tasks]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Carregando quadro Kanban..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">
            Erro ao carregar tarefas
          </div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  // Definir as colunas do Kanban baseadas nos status disponíveis
  const columns = [
    {
      id: TaskStatus.PENDING,
      title: TaskStatusLabels[TaskStatus.PENDING],
      color: 'bg-yellow-100 border-yellow-300',
      textColor: 'text-yellow-800'
    },
    {
      id: TaskStatus.IN_PROGRESS,
      title: TaskStatusLabels[TaskStatus.IN_PROGRESS],
      color: 'bg-blue-100 border-blue-300',
      textColor: 'text-blue-800'
    },
    {
      id: TaskStatus.COMPLETED,
      title: TaskStatusLabels[TaskStatus.COMPLETED],
      color: 'bg-green-100 border-green-300',
      textColor: 'text-green-800'
    },
    {
      id: TaskStatus.CANCELLED,
      title: TaskStatusLabels[TaskStatus.CANCELLED],
      color: 'bg-red-100 border-red-300',
      textColor: 'text-red-800'
    },
    {
      id: TaskStatus.DELAYED,
      title: TaskStatusLabels[TaskStatus.DELAYED],
      color: 'bg-orange-100 border-orange-300',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-black p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">Quadro Kanban</h1>
              <p className="text-white/90 text-lg">Visualize e gerencie suas tarefas em formato de quadro</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{filteredTasks.length}</div>
                <div className="text-sm text-white/70">Tarefas</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Filtrar por mês
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 hover:bg-white/20 transition-all duration-300"
                >
                  <option value="">Todos os meses</option>
                  {monthOptions.map((option) => {
                    const [value, label] = option.split('|');
                    return (
                      <option key={value} value={value} className="text-gray-900">
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
              {onCreateNew && (
                <>
                  <div className="w-px h-12 bg-white/20"></div>
                  <button
                    onClick={onCreateNew}
                    className="px-6 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nova Tarefa
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedMonth ? 'Nenhuma tarefa encontrada para este mês' : 'Nenhuma tarefa encontrada'}
              </h3>
              <p className="text-gray-600 text-lg">
                {selectedMonth ? 'Tente selecionar outro mês ou crie uma nova tarefa' : 'Crie uma nova tarefa para começar a usar o quadro Kanban'}
              </p>
            </div>
          ) : (
            <KanbanBoard 
              tasks={filteredTasks} 
              columns={columns} 
              onTaskUpdate={handleTaskUpdate}
              onTaskClick={handleViewTask}
            />
          )}
        </div>
      </div>

      {/* Modal de Visualização do Ticket */}
      <TicketViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
};

export default KanbanPage;
