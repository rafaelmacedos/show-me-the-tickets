import React from 'react';

interface SidebarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  variant?: 'default' | 'danger';
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  children,
  isActive = false,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full flex items-center px-6 py-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden font-semibold';
  
  const variantClasses = {
    default: isActive
      ? 'bg-linear-to-r from-gray-900 to-black text-white shadow-2xl transform scale-[1.02] border-0'
      : 'text-gray-700 bg-white hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 hover:text-black hover:shadow-xl hover:scale-[1.02] border-0',
    danger: 'text-gray-700 bg-white hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 hover:text-black hover:shadow-xl hover:scale-[1.02] border-0'
  };

  const iconClasses = isActive
    ? 'text-white'
    : 'text-gray-500 group-hover:text-black';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Background effect for active item */}
      {isActive && (
        <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-black opacity-100 rounded-2xl shadow-inner"></div>
      )}
      
      <div className="relative z-10 flex items-center w-full">
        <span className={`mr-4 transition-all duration-300 ${iconClasses}`}>
          {icon}
        </span>
        <span className="font-bold text-lg">{children}</span>
        
        {/* Active indicator */}
        {isActive && (
          <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
        )}
      </div>
    </button>
  );
};

export default SidebarButton;
