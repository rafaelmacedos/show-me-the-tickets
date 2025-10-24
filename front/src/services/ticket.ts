import { TaskPriority } from '../types/task';

export interface TicketData {
  emoji: string;
  urgency: string;
  task: string;
  due_date: string;
  due_hour: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskPriority | string;
  due_datetime: string;
}

export class TicketService {
  private static readonly HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<style>
  html, body {
      margin: 0;
      padding: 0;
      background: white;
      width: 384px;
  }

  body { 
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: flex-start;
  }

  .container { 
      width: 384px;
      text-align: center;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  .emoji { font-size: 120px; margin-bottom: 5px; }
  .urgency { font-size: 50px; font-weight: bold; margin: 5px 0; }
  .task { font-size: 36px; margin: 5px 0; }
  .due-label { font-size: 24px; margin-top: 10px; }
  .due-date { font-size: 40px; font-weight: bold; margin-top: 3px; }
  .due-hour { font-size: 36px; font-weight: bold; margin-top: 3px; margin-bottom: 0px; }
  .separator {width: 100%; height: 2px; background-color: black; margin: 20px 0; }

  @media print {
      html, body {
          width: 384px;
      }
      body {
          align-items: flex-start;
      }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="emoji">{{ emoji }}</div>
    <div class="urgency">{{ urgency }}</div>
    <div class="separator"></div>
    <div class="task">{{ task }}</div>
    <div class="separator"></div>
    <div class="due-label">Prazo Máximo</div>
    <div class="due-date">{{ due_date }}</div>
    <div class="due-hour">{{ due_hour }}</div>
  </div>
</body>
</html>
`;

  private static getPriorityEmoji(priority: TaskPriority): { emoji: string; urgency: string } {
    switch (priority) {
      case TaskPriority.URGENT:
        return { emoji: '🚨', urgency: 'Urgente' };
      case TaskPriority.HIGH:
        return { emoji: '⚠️', urgency: 'Alta' };
      case TaskPriority.MEDIUM:
        return { emoji: '❗', urgency: 'Média' };
      case TaskPriority.LOW:
        return { emoji: '🐢', urgency: 'Baixa' };
      default:
        return { emoji: '❗', urgency: 'Média' };
    }
  }

  private static formatDateTime(datetime: string): { date: string; hour: string } {
    if (!datetime) {
      return { date: 'Não definido', hour: '' };
    }

    const date = new Date(datetime);
    const dateStr = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const hourStr = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return { date: dateStr, hour: hourStr };
  }

  static convertTaskToTicketData(taskData: TaskFormData): TicketData {
    const { emoji, urgency } = this.getPriorityEmoji(taskData.priority);
    const { date, hour } = this.formatDateTime(taskData.due_datetime);

    return {
      emoji,
      urgency,
      task: taskData.title,
      due_date: date,
      due_hour: hour
    };
  }

  static generateTicketHTML(ticketData: TicketData): string {
    let html = this.HTML_TEMPLATE;

    // Substituir placeholders pelos dados
    Object.entries(ticketData).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{ ${key} }}`, 'g'), String(value));
    });

    return html;
  }

  static generateTicketPreview(ticketData: TicketData): string {
    return this.generateTicketHTML(ticketData);
  }

  static downloadTicketAsImage(ticketData: TicketData): void {
    const html = this.generateTicketHTML(ticketData);
    
    // Criar um blob com o HTML
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Criar um link temporário para download
    const link = document.createElement('a');
    link.href = url;
    link.download = `ticket-${ticketData.task.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpar o URL
    URL.revokeObjectURL(url);
  }
}
