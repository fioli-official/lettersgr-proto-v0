import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { APP_COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  onBack?: () => void;
  onMenuToggle: () => void;
  showMenu?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onBack, onMenuToggle, showMenu }) => {
  return (
    <div className={`min-h-screen ${APP_COLORS.bg} flex flex-col relative`}>
      {/* Unified App Header - Pixel-perfect match with MenuOverlay with 47px top padding */}
      <header className="w-full px-6 h-28 pt-[47px] flex items-center justify-between sticky top-0 bg-transparent z-30">
        <div className="flex-none w-14">
          {onBack ? (
            <button 
              onClick={onBack}
              className={`w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark active:scale-90 ${APP_COLORS.textMain} transition-all`}
              aria-label="Go back"
            >
              <ArrowLeft size={28} strokeWidth={1.5} />
            </button>
          ) : <div className="w-14 h-14" />}
        </div>
        
        <div className="flex-1 mx-4 flex justify-center overflow-hidden">
          {title && (
            <div className="w-full text-center">
              {typeof title === 'string' ? (
                <h1 className={`text-2xl font-light tracking-tight ${APP_COLORS.textMain} truncate`}>
                  {title}
                </h1>
              ) : (
                <div className="flex justify-center">{title}</div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex-none w-14">
          <button 
            onClick={onMenuToggle}
            className={`w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark active:scale-90 text-[#002B5B] transition-all group overflow-hidden`}
            aria-label="Open menu"
          >
            <Menu 
              size={28} 
              strokeWidth={1.5} 
              className={`transition-all duration-500 ease-out transform ${showMenu ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
            />
          </button>
        </div>
      </header>

      {/* Optimized content area */}
      <main className="flex-1 w-full max-w-xl mx-auto px-6 pb-20 flex flex-col">
        {children}
      </main>
    </div>
  );
};