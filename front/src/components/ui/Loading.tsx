import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  text = 'Carregando...', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Loading spinner elegante e simples */}
        <div className={`${sizeClasses[size]} relative`}>
          {/* Círculo externo estático */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          
          {/* Círculo principal animado */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-800 border-r-gray-600 animate-spin"></div>
          
          {/* Círculo interno sutil */}
          <div className="absolute inset-2 rounded-full bg-gray-50"></div>
        </div>
      </div>
      
      {text && (
        <p className={`mt-6 text-gray-700 font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
