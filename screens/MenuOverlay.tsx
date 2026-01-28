
import React, { useState } from 'react';
import { X, Navigation, Info, Shield, ArrowLeft, ChevronRight, CheckCircle, AlertTriangle, Settings2 } from 'lucide-react';
import { LEVELS, GREEK_ALPHABET } from '../constants';
import { Screen } from '../types';

interface MenuOverlayProps {
  onClose: () => void;
  onNavigate: (view: Screen, params?: any) => void;
  onUpdateConsent: (accepted: boolean) => void;
  initialView?: 'main' | 'cookies';
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ 
  onClose, 
  onNavigate, 
  onUpdateConsent,
  initialView = 'main'
}) => {
  const [view, setView] = useState<'main' | 'cookies'>(initialView);
  
  const [isAllAccepted, setIsAllAccepted] = useState(
    localStorage.getItem('lettersgr_consent_given') === 'all'
  );
  
  const handleLevelClick = (id: string) => {
    onNavigate(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 });
    onClose();
  };

  const handleTestClick = () => {
    const allLetterIds = GREEK_ALPHABET.map(l => l.id);
    onNavigate(Screen.Test, { selectedLevelId: 'all', letterIds: allLetterIds });
    onClose();
  };

  const handleExerciseClick = () => {
    onNavigate(Screen.Exercises);
    onClose();
  };

  const handleConsentChoice = (accepted: boolean) => {
    if (accepted === isAllAccepted) return;
    setIsAllAccepted(accepted);
    onUpdateConsent(accepted);
  };

  const toggleConsent = () => {
    const nextState = !isAllAccepted;
    setIsAllAccepted(nextState);
    onUpdateConsent(nextState);
  };

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#003B73] to-[#001A33] flex flex-col items-center text-white overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
      
      <header className="w-full px-6 h-28 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {view === 'cookies' && (
            <button 
              onClick={() => setView('main')}
              className="w-14 h-14 flex items-center justify-center rounded-full liquid-glass-overlay active:bg-white/20 transition-all active:scale-90"
              aria-label="Back to main menu"
            >
              <ArrowLeft size={28} strokeWidth={1.5} />
            </button>
          )}
          {view === 'main' && (
            <div className="w-14 h-14 flex items-center justify-center rounded-full liquid-glass-overlay">
              <Navigation size={28} className="text-white" strokeWidth={1.5} />
            </div>
          )}
        </div>
        
        <h1 className={`text-[24px] tracking-tight text-center flex-1 mx-4 truncate ${view === 'main' ? 'font-medium' : 'font-normal'}`}>
          {view === 'main' ? 'A to Ψ:' : 'Cookies'}
        </h1>
        
        <button 
          onClick={onClose}
          className="w-14 h-14 flex items-center justify-center rounded-full liquid-glass-overlay active:bg-white/20 transition-all active:scale-90"
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} />
        </button>
      </header>

      {view === 'main' ? (
        <div className="flex-1 w-full flex flex-col items-center py-4">
          
          <div className="w-full flex flex-col items-center space-y-5">
            {LEVELS.map((level, idx) => {
              const letterStr = level.letters
                .map(id => GREEK_ALPHABET.find(l => l.id === id)?.upper)
                .filter(Boolean)
                .join(', ');

              return (
                <button
                  key={level.id}
                  onClick={() => handleLevelClick(level.id)}
                  className="text-[24px] font-medium hover:scale-105 active:scale-95 transition-transform tracking-tight text-center px-4 w-full"
                >
                  {idx + 1}. {letterStr}
                </button>
              );
            })}
          </div>

          <div className="w-full flex flex-col items-center mt-[25px]">
            <button
              onClick={handleTestClick}
              className="text-[24px] font-medium text-white underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all active:scale-95"
            >
              Scored test of all letters
            </button>
            
            <button
              onClick={handleExerciseClick}
              className="mt-[46px] text-[24px] font-medium text-white underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all active:scale-95"
            >
              Skill training & Exercises
            </button>

            <button
              onClick={() => setView('cookies')}
              className="mt-[55px] flex items-center space-x-3 text-[24px] font-medium text-white hover:opacity-80 transition-all active:scale-95"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full liquid-glass-overlay">
                <Settings2 size={20} strokeWidth={2} />
              </div>
              <span>Cookie Settings</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center py-4 px-8">
          
          <div className="w-full max-w-sm mb-12 flex flex-col items-center">
            <button 
              onClick={toggleConsent}
              className="w-full liquid-glass-overlay rounded-[2.5rem] p-6 flex items-center justify-between shadow-xl active:scale-[0.97] transition-all hover:bg-white/10"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
                  {isAllAccepted ? (
                    <CheckCircle size={28} className="text-[#8EFFDF]" />
                  ) : (
                    <AlertTriangle size={28} className="text-orange-400" />
                  )}
                </div>
                <span className={`text-[22px] font-bold ${isAllAccepted ? 'text-[#8EFFDF]' : 'text-orange-400'}`}>
                  {isAllAccepted ? 'All accepted' : 'Basic accepted'}
                </span>
              </div>
              
              <div className={`w-14 h-7 rounded-full relative transition-colors duration-500 border-2 ${isAllAccepted ? 'bg-[#8EFFDF]/20 border-[#8EFFDF]' : 'bg-orange-400/20 border-orange-400'}`}>
                <div className={`absolute top-1 w-3.5 h-3.5 rounded-full transition-all duration-500 shadow-sm ${isAllAccepted ? 'right-1 bg-[#8EFFDF]' : 'left-1 bg-orange-400'}`} />
              </div>
            </button>
          </div>

          <div className="w-full max-w-sm space-y-12">
            <button 
              onClick={() => handleConsentChoice(true)}
              disabled={isAllAccepted}
              className={`w-full text-left group transition-all ${isAllAccepted ? 'cursor-default' : 'active:scale-[0.98]'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[28px] font-bold transition-colors ${isAllAccepted ? 'text-[#8EFFDF]' : 'group-hover:text-[#8EFFDF]'}`}>Accept All</span>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full liquid-glass-overlay transition-colors ${isAllAccepted ? 'bg-[#8EFFDF]/20' : 'group-hover:bg-[#8EFFDF]/20'}`}>
                  <ChevronRight size={24} className={`transition-colors ${isAllAccepted ? 'text-[#8EFFDF]' : 'text-white/40 group-hover:text-[#8EFFDF]'}`} />
                </div>
              </div>
              <p className="text-lg text-white leading-relaxed font-medium">
                Enables <span className="font-bold underline decoration-[#8EFFDF]">progress saving</span>, sound caching, and anonymous usage analytics to help us improve.
              </p>
            </button>

            <button 
              onClick={() => handleConsentChoice(false)}
              disabled={!isAllAccepted}
              className={`w-full text-left group transition-all ${!isAllAccepted ? 'cursor-default' : 'active:scale-[0.98]'}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[28px] font-bold transition-colors ${!isAllAccepted ? 'text-orange-400' : 'group-hover:text-orange-400'}`}>Basic Only</span>
                <div className={`w-10 h-10 flex items-center justify-center rounded-full liquid-glass-overlay transition-colors ${!isAllAccepted ? 'bg-orange-400/20' : 'group-hover:bg-orange-400/20'}`}>
                  <ChevronRight size={24} className={`transition-colors ${!isAllAccepted ? 'text-orange-400' : 'text-white/40 group-hover:text-orange-400'}`} />
                </div>
              </div>
              <p className="text-lg text-white leading-relaxed font-medium">
                <span className="font-bold underline decoration-white/50">Disables progress saving</span>. Only essential session data is kept for core app functions.
              </p>
            </button>
          </div>
        </div>
      )}

      <footer className="w-full px-8 pb-16 pt-8 flex flex-col items-center space-y-8 mt-auto text-white">
        <div className="flex items-center space-x-12 text-[24px] font-normal uppercase tracking-normal">
          <button onClick={() => alert("LettersGR: A minimalist Greek alphabet tutor.")} className="flex items-center hover:text-white/70 transition-colors">
            <Info size={24} className="mr-2" strokeWidth={1.5} /> About
          </button>
          <button 
            onClick={() => setView('cookies')} 
            className={`flex items-center transition-colors ${view === 'cookies' ? 'text-[#8EFFDF]' : 'hover:text-white/70'}`}
          >
            <Shield size={24} className="mr-2" strokeWidth={1.5} /> Privacy
          </button>
        </div>
        
        <p className="text-sm text-white font-medium">
          LettersGR v1.3 • iOS Design Ready
        </p>
      </footer>

      <style>{`
        body { overflow: hidden; }
      `}</style>
    </div>
  );
};
