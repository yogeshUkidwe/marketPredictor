import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { useResponsiveMode } from '../ResponsiveProvider';

export interface FrameworkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const FrameworkButton: React.FC<FrameworkButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const { isMobile } = useResponsiveMode();

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-950/50 border border-cyan-400/30',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 shadow-sm',
    outline:
      'bg-transparent hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500',
    ghost:
      'bg-transparent hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-transparent',
    danger:
      'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/80'
  }[variant];

  const sizeStyles = {
    sm: isMobile ? 'py-2 px-3 text-xs min-h-[44px]' : 'py-1.5 px-3 text-xs min-h-[34px]',
    md: isMobile ? 'py-2.5 px-4 text-xs sm:text-sm min-h-[46px]' : 'py-2 px-4 text-xs sm:text-sm min-h-[40px]',
    lg: isMobile ? 'py-3 px-5 text-sm sm:text-base min-h-[50px]' : 'py-2.5 px-5 text-sm sm:text-base min-h-[46px]'
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none select-none gap-2 ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
