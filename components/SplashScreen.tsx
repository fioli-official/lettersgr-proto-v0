import React from 'react';
import { APP_COLORS } from '../constants';

interface SplashScreenProps {
  isFading?: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isFading = false }) => {
  return (
    <div 
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center bg-gradient-to-b from-[#B2FEFF] to-[#8EFFDF] transition-opacity duration-[1500ms] ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      
      {/* Logo Placeholder: Greek Letter Gamma - Light font weight */}
      <div className="relative flex items-center justify-center animate-bounce-subtle">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
        <span className={`relative text-[160px] font-light ${APP_COLORS.textMain} select-none transform transition-transform duration-1000 animate-in zoom-in-50`}>
          Γ
        </span>
      </div>

      {/* App Name and Subtitle - Spacing set to exactly 0 (tracking-normal) */}
      <div className="mt-4 text-center animate-in slide-in-from-bottom-4 duration-1000 delay-300">
        <h2 className={`text-[30px] font-normal tracking-normal ${APP_COLORS.textMain} leading-none`}>
          LettersGR
        </h2>
        <p className={`text-[30px] font-light tracking-normal ${APP_COLORS.textMain} mt-1 leading-tight`}>
          Greek alphabet<br />learning
        </p>
      </div>

      {/* Circular Loading Spinner */}
      {!isFading && (
        <div className="absolute bottom-24 flex items-center justify-center">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            className="animate-spin-slow"
          >
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none" 
              className="text-white/30"
            />
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              stroke="#002B5B" 
              strokeWidth="3" 
              fill="none" 
              strokeDasharray="125" 
              strokeDashoffset="80" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};