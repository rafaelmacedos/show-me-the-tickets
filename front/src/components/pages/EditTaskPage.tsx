import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { TaskService } from '../../services/task';
import { TaskStatus, TaskPriority, TaskCategory, TaskUpdateRequest, Task } from '../../types/task';
import { useAuth } from '../../contexts/AuthContext';
import { TicketService, TaskFormData } from '../../services/ticket';
import TicketPreview from '../ticket/TicketPreview';
import Loading from '../ui/Loading';

interface EditTaskPageProps {
  taskId: string | null;
  onBack: () => void;
  onTaskUpdated?: () => Promise<void>;
}

const EditTaskPage: React.FC<EditTaskPageProps> = ({ taskId, onBack, onTaskUpdated }) => {
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    category: TaskCategory.WORK,
    due_datetime: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Carregar tarefa
  useEffect(() => {
    const loadTask = async () => {
      if (!taskId) return;
      
      try {
        setIsLoading(true);
        const taskData = await TaskService.getTaskById(parseInt(taskId));
        setTask(taskData);
        setFormData({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          category: taskData.category,
          due_datetime: taskData.due_datetime || ''
        });
      } catch (err) {
        setError('Erro ao carregar tarefa');
        console.error('Erro ao carregar tarefa:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !user?.id) return;

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const taskData: TaskUpdateRequest = {
        ...formData,
        category: formData.category as TaskCategory,
        status: task.status, // Manter status atual
        due_datetime: formData.due_datetime || undefined,
        assigneeId: user.id,
      };

      await TaskService.updateTask(task.id, taskData);
      setSuccess(true);
      
      // Redirecionar para listagem após atualizar tarefa
      setTimeout(async () => {
        await onTaskUpdated?.();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gerar preview do ticket em tempo real
  const ticketPreview = React.useMemo(() => {
    if (!formData.title) return null;
    return TicketService.convertTaskToTicketData(formData);
  }, [formData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" text="Carregando tarefa..." />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Tarefa não encontrada
        </h3>
        <p className="text-gray-600 mb-6">
          A tarefa que você está tentando editar não existe.
        </p>
        <Button onClick={onBack}>
          Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-black p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 text-white">Editar Tarefa</h1>
          <p className="text-white/90 text-lg">Atualize as informações da tarefa</p>
        </div>
        
        <div className="p-6">
          {/* Mensagens de feedback */}
          {error && (
            <div className="mb-4 p-3 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl">
              <p className="text-gray-800 font-medium text-sm">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-linear-to-r from-green-100 to-green-200 border-2 border-green-400 rounded-xl">
              <div className="flex items-center">
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-green-800 font-medium text-sm">Tarefa atualizada com sucesso!</p>
                </div>
              </div>
            </div>
          )}

          {/* Layout em duas colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna Esquerda - Formulário */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      Título da Tarefa
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Digite um título descritivo"
                    required
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center">
                      Descrição
                      <span className="text-red-500 ml-1">*</span>
                    </span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva o problema ou solicitação em detalhes..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 placeholder-gray-500 bg-white hover:border-gray-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center">
                        Prioridade
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 bg-white hover:border-gray-400"
                    >
                      <option value={TaskPriority.LOW}>Baixa</option>
                      <option value={TaskPriority.MEDIUM}>Média</option>
                      <option value={TaskPriority.HIGH}>Alta</option>
                      <option value={TaskPriority.URGENT}>Urgente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="flex items-center">
                        Categoria
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 bg-white hover:border-gray-400"
                    >
                      <option value={TaskCategory.WORK}>Trabalho</option>
                      <option value={TaskCategory.PERSONAL}>Pessoal</option>
                      <option value={TaskCategory.FAMILY}>Família</option>
                      <option value={TaskCategory.HEALTH}>Saúde</option>
                      <option value={TaskCategory.FINANCE}>Financeiro</option>
                      <option value={TaskCategory.OTHER}>Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Vencimento
                    <span className="text-gray-400 ml-1 text-xs">(opcional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="due_datetime"
                    value={formData.due_datetime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 bg-white hover:border-gray-400"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={onBack}
                    disabled={isSaving}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    }
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSaving}
                    icon={
                      isSaving ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )
                    }
                  >
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Coluna Direita - Preview do Ticket */}
            <div>
              {ticketPreview ? (
                <TicketPreview ticketData={ticketPreview} />
              ) : (
                <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden h-full">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
                    <h3 className="text-xs font-medium text-gray-700">Preview do Ticket</h3>
                  </div>
                  
                  <div className="p-6 flex flex-col items-center justify-center h-full min-h-[500px]">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-gray-600 mb-2">Preview do Ticket</h4>
                    <p className="text-sm text-gray-500 text-center">
                      Preencha o título da tarefa para ver como ficará o ticket gerado
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
