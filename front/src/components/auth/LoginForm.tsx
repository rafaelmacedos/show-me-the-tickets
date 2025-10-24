import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
// Logo será carregada via URL pública

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animação de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Autofill para email - salva o último email usado
  useEffect(() => {
    const savedEmail = localStorage.getItem('last_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Salva o email para autofill na próxima vez
      localStorage.setItem('last_email', email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Limpa erro quando usuário digita
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(''); // Limpa erro quando usuário digita
  };

  return (
    <div className={`
      w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8
      transform transition-all duration-700 ease-out
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
    `}>
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <div className="w-28 h-28 mx-auto mb-4 flex items-center justify-center">
          <img 
            src="/smtt_logo.png" 
            alt="Show Me The Tickets" 
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
        <p className="text-gray-600">
          Faça login para continuar
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="seu@email.com"
          required
          autoComplete="email"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />

        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="••••••••"
          required
          autoComplete="current-password"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-linear-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-4 animate-fade-in shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-800 text-sm font-medium leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          loading={isLoading}
          className="w-full transform hover:scale-105 transition-transform duration-200"
        >
          Entrar
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Não tem uma conta?{' '}
          <a href="#" className="text-black hover:text-gray-700 font-medium transition-colors duration-200">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
