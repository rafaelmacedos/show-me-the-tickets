import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SidebarButton from '../ui/SidebarButton';
// Logo será carregada via URL pública

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 'create-ticket',
      label: 'Criar Tarefa',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      id: 'list-tickets',
      label: 'Listar Tarefas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      id: 'kanban',
      label: 'Quadro Kanban',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      )
    },
    {
      id: 'config',
      label: 'Configurações',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-80 bg-linear-to-b from-white to-gray-50 shadow-2xl border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-10">
      {/* Header com Logo */}
      <div className="p-8">
        <div className="w-42 h-42 mx-auto mb-4 flex items-center justify-center">
          <img
            src="/smtt_logo.png"
            alt="Show Me The Tickets"
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>

        {/* User Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold mb-2">
                🐵
              </span>
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-lg font-bold text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user?.email}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-6 pb-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarButton
              key={item.id}
              onClick={() => onItemClick(item.id)}
              icon={item.icon}
              isActive={activeItem === item.id}
            >
              {item.label}
            </SidebarButton>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-200">
        <SidebarButton
          onClick={logout}
          icon={
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          }
          variant="danger"
        >
          Sair
        </SidebarButton>
        
        {/* Version Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
