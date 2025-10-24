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
        {/* Loading spinner elegante */}
        <div className={`${sizeClasses[size]} relative`}>
          {/* Círculo externo */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          {/* Círculo animado */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-black border-r-black animate-spin"></div>
          {/* Círculo interno com gradiente */}
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-gray-100 to-gray-200 animate-pulse"></div>
        </div>
      </div>
      
      {text && (
        <p className={`mt-4 text-gray-600 font-medium ${textSizeClasses[size]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
