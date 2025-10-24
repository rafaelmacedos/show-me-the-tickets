import React, { useState, useMemo } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { TaskStatus, TaskPriority, TaskStatusLabels, TaskPriorityLabels, TaskCategoryLabels, Task } from '../../types/task';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import TicketViewModal from '../ticket/TicketViewModal';
import Pagination from '../ui/Pagination';

const ListTicketsPage: React.FC = () => {
  const { tasks, isLoading, error, refetch } = useTasks();
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    search: ''
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesSearch = !filters.search || 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesPriority && matchesStatus && matchesSearch;
    });
  }, [tasks, filters]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTasks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT: return 'bg-red-600 text-white';
      case TaskPriority.HIGH: return 'bg-orange-500 text-white';
      case TaskPriority.MEDIUM: return 'bg-yellow-500 text-black';
      case TaskPriority.LOW: return 'bg-green-500 text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING: return 'bg-blue-500 text-white';
      case TaskStatus.IN_PROGRESS: return 'bg-purple-500 text-white';
      case TaskStatus.COMPLETED: return 'bg-green-500 text-white';
      case TaskStatus.CANCELLED: return 'bg-gray-400 text-black';
      case TaskStatus.DELAYED: return 'bg-red-500 text-white';
      default: return 'bg-gray-200 text-black';
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset para primeira página ao filtrar
  };

  const handleViewTicket = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-black p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 text-white">Lista de Tarefas</h1>
          <p className="text-white/90 text-lg">Gerencie todas as tarefas do sistema</p>
        </div>
        
        <div className="p-8">
          {/* Mensagens de erro */}
          {error && (
            <div className="mb-6 p-4 bg-linear-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl">
              <p className="text-gray-800 font-medium">{error}</p>
            </div>
          )}

          {/* Filtros */}
          <div className="mb-8 bg-gray-50 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {tasks.length > 0 ? `${tasks.length} tarefa(s) carregada(s)` : 'Nenhuma tarefa encontrada'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-500">
                  <span className="inline-flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Cache ativo
                  </span>
                </div>
                <Button
                  onClick={refetch}
                  disabled={isLoading}
                  size="md"
                  icon={
                    <svg 
                      className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                >
                  {isLoading ? 'Atualizando...' : 'Atualizar'}
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <select 
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white shadow-sm hover:border-gray-400 transition-all duration-300"
              >
                <option value="">Todas as prioridades</option>
                <option value={TaskPriority.URGENT}>Urgente</option>
                <option value={TaskPriority.HIGH}>Alta</option>
                <option value={TaskPriority.MEDIUM}>Média</option>
                <option value={TaskPriority.LOW}>Baixa</option>
              </select>
              
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white shadow-sm hover:border-gray-400 transition-all duration-300"
              >
                <option value="">Todos os status</option>
                <option value={TaskStatus.PENDING}>Pendente</option>
                <option value={TaskStatus.IN_PROGRESS}>Em Progresso</option>
                <option value={TaskStatus.COMPLETED}>Concluída</option>
                <option value={TaskStatus.CANCELLED}>Cancelada</option>
                <option value={TaskStatus.DELAYED}>Atrasada</option>
              </select>

              <input
                type="text"
                placeholder="Buscar tarefas..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm flex-1 min-w-64"
              />
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-16">
              <Loading 
                size="xl" 
                text="Carregando tarefas..." 
                className="mb-6"
              />
              <p className="text-gray-600 text-lg">Aguarde enquanto buscamos suas tarefas</p>
            </div>
          )}

          {/* Lista de Tarefas */}
          {!isLoading && (
            <div className="space-y-6">
              {paginatedTasks.map((task) => (
                <div
                  key={task.id}
                  className="border-2 border-gray-100 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-gray-300 bg-white hover:scale-[1.02]"
                >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {TaskPriorityLabels[task.priority]}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {TaskStatusLabels[task.status]}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {TaskCategoryLabels[task.category]}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      {task.due_datetime && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Vence: {new Date(task.due_datetime).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button 
                      onClick={() => handleViewTicket(task)}
                      className="p-3 text-gray-500 hover:text-blue-600 hover:bg-linear-to-r hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                      title="Visualizar Ticket"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button 
                      className="p-3 text-gray-500 hover:text-green-600 hover:bg-linear-to-r hover:from-green-50 hover:to-green-100 rounded-xl transition-all duration-300 hover:scale-110 cursor-pointer"
                      title="Editar Tarefa"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}

          {!isLoading && filteredTasks.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tasks.length === 0 ? 'Nenhuma tarefa encontrada' : 'Nenhuma tarefa corresponde aos filtros'}
              </h3>
              <p className="text-gray-600 text-lg">
                {tasks.length === 0 ? 'Crie sua primeira tarefa para começar!' : 'Tente ajustar os filtros de busca'}
              </p>
            </div>
          )}

          {/* Paginação */}
          {!isLoading && filteredTasks.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={filteredTasks.length}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </div>

      {/* Modal de Visualização do Ticket */}
      <TicketViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
      />
    </div>
  );
};

export default ListTicketsPage;
