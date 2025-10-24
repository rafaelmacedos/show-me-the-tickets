import React from 'react';
import { TicketData, TicketService } from '../../services/ticket';

interface TicketPreviewProps {
  ticketData: TicketData;
  className?: string;
}

const TicketPreview: React.FC<TicketPreviewProps> = ({ ticketData, className = '' }) => {
  const handleDownloadTicket = () => {
    TicketService.downloadTicketAsImage(ticketData);
  };

  return (
    <div className={`bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-xs font-medium text-gray-700">Preview do Ticket</h3>
        <button
          onClick={handleDownloadTicket}
          className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition-colors duration-200 flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Baixar
        </button>
      </div>
      
      <div className="p-4 flex justify-center items-center">
        <div 
          className="bg-white border border-gray-300 rounded-lg shadow-sm"
          style={{ width: '400px', height: '500px' }}
        >
          <div className="text-center h-full flex flex-col justify-center p-4">
            <div className="text-6xl mb-3">{ticketData.emoji}</div>
            <div className="text-3xl font-bold mb-4 text-gray-800">{ticketData.urgency}</div>
            
            <div className="w-full h-0.5 bg-black mb-4"></div>
            
            <div className="text-xl mb-4 text-gray-800 px-3 leading-tight">
              {ticketData.task}
            </div>
            
            <div className="w-full h-0.5 bg-black mb-4"></div>
            
            <div className="text-sm text-gray-600 mb-2">Prazo Máximo</div>
            <div className="text-2xl font-bold text-gray-800 mb-2">{ticketData.due_date}</div>
            <div className="text-xl font-bold text-gray-800">{ticketData.due_hour}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPreview;
