import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">
                {icon}
              </div>
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 border-2 rounded-xl transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-600
              text-gray-900 placeholder-gray-500 bg-white
              ${icon ? 'pl-10' : ''}
              ${error 
                ? 'border-gray-600 bg-gray-50 focus:ring-gray-500 focus:border-gray-700' 
                : 'border-gray-200 hover:border-gray-400 focus:border-gray-500'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-black animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
