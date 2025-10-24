import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const ConfigPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [sessionExpiry, setSessionExpiry] = useState<string>('');

  useEffect(() => {
    // Simular tempo de expiração da sessão (24 horas)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24);
    setSessionExpiry(expiryTime.toLocaleString('pt-BR'));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar atualização de perfil
    console.log('Atualizando configurações:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-black p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 text-white">Configurações</h1>
          <p className="text-white/90 text-lg">Suas informações pessoais e sessão</p>
        </div>

        {/* Content */}
        <div className="p-8 bg-white">
          {/* Informações do Usuário */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Informações do Usuário
            </h2>
            
            <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-5xl font-bold">
                    🐵
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h3>
                  <p className="text-gray-600 text-lg mb-2">{user?.email}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Usuário ativo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
