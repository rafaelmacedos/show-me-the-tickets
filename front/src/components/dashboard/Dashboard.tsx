import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import CreateTicketPage from '../pages/CreateTicketPage';
import ListTicketsPage from '../pages/ListTicketsPage';
import KanbanPage from '../pages/KanbanPage';
import EditTaskPage from '../pages/EditTaskPage';
import ConfigPage from '../pages/ConfigPage';
import { useTasksContext } from '../../contexts/TasksContext';

const Dashboard: React.FC = () => {
  const [activeItem, setActiveItem] = useState('create-ticket');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string>('create-ticket');
  const { invalidateCache, refetch } = useTasksContext();

  // Função para navegar para edição de tarefa
  const navigateToEdit = (taskId: number) => {
    setPreviousPage(activeItem); // Salvar página atual
    setEditTaskId(taskId.toString());
    setActiveItem('edit-task');
  };

  // Função para voltar à página anterior
  const navigateBack = () => {
    setEditTaskId(null);
    setActiveItem(previousPage);
  };

  // Função para navegar para listagem após criar/editar
  const navigateToListAfterAction = async () => {
    // Invalidar cache e recarregar dados
    invalidateCache();
    await refetch();
    
    setEditTaskId(null);
    setActiveItem('list-tickets');
  };

  // Função para navegar para criar nova tarefa
  const navigateToCreateTask = () => {
    setEditTaskId(null);
    setActiveItem('create-ticket');
  };



  const renderContent = () => {
    switch (activeItem) {
      case 'create-ticket':
        return <CreateTicketPage onTaskCreated={navigateToListAfterAction} />;
      case 'list-tickets':
        return <ListTicketsPage onEditTask={navigateToEdit} onCreateNew={navigateToCreateTask} />;
      case 'kanban':
        return <KanbanPage onEditTask={navigateToEdit} onCreateNew={navigateToCreateTask} />;
      case 'edit-task':
        return <EditTaskPage taskId={editTaskId} onBack={navigateBack} onTaskUpdated={navigateToListAfterAction} />;
      case 'config':
        return <ConfigPage />;
      default:
        return <CreateTicketPage onTaskCreated={navigateToListAfterAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      
      {/* Main Content */}
      <div className="ml-80 flex flex-col min-h-screen">
        {/* Header */}


        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
