import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-linear-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-800 focus:ring-gray-500 shadow-lg hover:shadow-2xl transform hover:scale-105 border-0 !text-white',
    secondary: 'bg-linear-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-400 shadow-md hover:shadow-lg border-0',
    outline: 'border-2 border-gray-800 text-gray-800 bg-white hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 focus:ring-gray-500 shadow-md hover:shadow-lg !text-gray-800',
    ghost: 'text-gray-700 hover:bg-linear-to-r hover:from-gray-100 hover:to-gray-200 focus:ring-gray-400 border-0',
    danger: 'bg-linear-to-r from-gray-800 to-black text-white hover:from-black hover:to-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-2xl transform hover:scale-105 border-0 !text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Carregando...
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <span className="mr-2">{icon}</span>
          {children}
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          <span className="ml-2">{icon}</span>
        </>
      );
    }

    return children;
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
