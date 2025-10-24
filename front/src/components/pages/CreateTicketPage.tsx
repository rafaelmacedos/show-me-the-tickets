import React, { useState, useMemo } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { TaskService } from '../../services/task';
import { TaskStatus, TaskPriority, TaskCategory, TaskCreateRequest } from '../../types/task';
import { useAuth } from '../../contexts/AuthContext';
import { TicketService, TaskFormData } from '../../services/ticket';
import TicketPreview from '../ticket/TicketPreview';

const CreateTicketPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    category: TaskCategory.WORK,
    due_datetime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Verificar se o usuário está logado
    if (!user?.id) {
      setError('Usuário não encontrado. Faça login novamente.');
      setIsLoading(false);
      return;
    }

    try {
      const taskData: TaskCreateRequest = {
        ...formData,
        category: formData.category as TaskCategory,
        status: TaskStatus.PENDING,
        due_datetime: formData.due_datetime || undefined,
        assigneeId: user.id,
      };

      await TaskService.createTask(taskData);
      setSuccess(true);
      
      // Limpar formulário após sucesso
      setFormData({
        title: '',
        description: '',
        priority: TaskPriority.MEDIUM,
        category: TaskCategory.WORK,
        due_datetime: ''
      });

      // Mostrar mensagem de sucesso por 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar tarefa');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Gerar preview do ticket em tempo real
  const ticketPreview = useMemo(() => {
    if (!formData.title) return null;
    return TicketService.convertTaskToTicketData(formData);
  }, [formData]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-black p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 text-white">Criar Nova Tarefa</h1>
          <p className="text-white/90 text-lg">Preencha as informações abaixo para criar uma nova tarefa</p>
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
                  <p className="text-green-800 font-medium text-sm">Tarefa criada com sucesso!</p>
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
                    onClick={() => setFormData({ 
                      title: '', 
                      description: '', 
                      priority: TaskPriority.MEDIUM, 
                      category: TaskCategory.WORK,
                      due_datetime: ''
                    })}
                    disabled={isLoading}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    }
                  >
                    Limpar
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    icon={
                      isLoading ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )
                    }
                  >
                    {isLoading ? 'Criando...' : 'Criar Tarefa'}
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

export default CreateTicketPage;
