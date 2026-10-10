import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { useResponsiveMode } from '../ResponsiveProvider';

interface FrameworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  className?: string;
}

export const FrameworkModal: React.FC<FrameworkModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '2xl',
  className = ''
}) => {
  const { isMobile } = useResponsiveMode();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'max-w-5xl'
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden ${
          isMobile
            ? 'mt-auto rounded-t-3xl border-b-0 max-h-[90vh] animate-in slide-in-from-bottom duration-200 safe-area-bottom'
            : `m-auto ${widthClasses} rounded-2xl max-h-[85vh] animate-in zoom-in-95 duration-150`
        } ${className}`}
      >
        {isMobile && (
          <div className="w-full pt-3 pb-1 flex justify-center shrink-0">
            <div className="w-12 h-1.5 bg-slate-700/80 rounded-full" />
          </div>
        )}

        {(title || subtitle) && (
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/60">
            <div className="min-w-0 pr-4">
              {title && (
                <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
};
