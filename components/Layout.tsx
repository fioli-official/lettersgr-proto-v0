
import React from 'react';
import { Menu, ArrowLeft } from 'lucide-react';
import { APP_COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  onMenuToggle: () => void;
  showMenu?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onBack, onMenuToggle }) => {
  return (
    <div className={`min-h-screen ${APP_COLORS.bg} flex flex-col relative`}>
      {/* Dynamic App Header - Height fixed to 104px (h-26) for stability */}
      <header className="px-6 h-26 flex items-center justify-between sticky top-0 bg-transparent z-30">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button 
              onClick={onBack}
              className={`w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark active:scale-90 ${APP_COLORS.textMain} transition-all`}
              aria-label="Go back"
            >
              <ArrowLeft size={28} strokeWidth={1.5} />
            </button>
          )}
          {title && (
            <h1 className={`text-2xl font-light tracking-tight ${APP_COLORS.textMain} truncate max-w-[220px]`}>
              {title}
            </h1>
          )}
        </div>
        
        {/* Circular menu button with liquid glass effect */}
        <button 
          onClick={onMenuToggle}
          className={`w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark active:scale-90 text-[#002B5B] transition-all`}
          aria-label="Open menu"
        >
          <Menu size={28} strokeWidth={1.5} />
        </button>
      </header>

      {/* Optimized content area */}
      <main className="flex-1 w-full max-w-xl mx-auto px-6 pb-20 flex flex-col">
        {children}
      </main>

      <style>{`
        .h-26 { height: 104px; }
      `}</style>
    </div>
  );
};
