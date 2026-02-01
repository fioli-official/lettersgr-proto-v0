import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, GraduationCap, Info } from 'lucide-react';
import { GREEK_ALPHABET, APP_COLORS } from '../constants';
import { audioManager } from '../components/AudioManager';

interface LearningScreenProps {
  letterIds: string[];
  initialIndex: number;
  onTest: () => void;
}

export const LearningScreen: React.FC<LearningScreenProps> = ({ letterIds, initialIndex, onTest }) => {
  const [index, setIndex] = useState(initialIndex);
  const [playingId, setPlayingId] = useState<number | null>(null);
  
  const letter = GREEK_ALPHABET.find(l => l.id === letterIds[index])!;

  useEffect(() => {
    // Stop audio when changing letters
    audioManager.stop();
    setPlayingId(null);
    return () => audioManager.stop();
  }, [index]);

  const playSound = (soundUrl: string, soundIndex: number) => {
    setPlayingId(soundIndex);
    audioManager.play(soundUrl, () => setPlayingId(null));
  };

  const next = () => {
    setIndex(prev => Math.min(prev + 1, letterIds.length - 1));
  };
  
  const prev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between pt-16 pb-2">
      {/* Letter Counter Removed */}

      {/* Main Letter Content */}
      <div className="flex flex-col items-center w-full animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center space-x-12 text-[140px] md:text-[180px] font-black tracking-tighter leading-none select-none">
            <span className={APP_COLORS.textMain}>{letter.upper}</span>
            <span className={APP_COLORS.textAccent}>{letter.lower}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full max-w-sm px-4 space-y-10 pt-5">
          {letter.sounds.map((sound, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center">
                  {sound.label && (
                    <span className="text-[10px] font-black uppercase text-[#0096C7] tracking-wider mb-1 block">
                      {sound.label}
                    </span>
                  )}
                  <h3 className="text-2xl font-black tracking-tight text-[#002B5B]">
                    {sound.description}
                  </h3>
                </div>
                
                {/* 2x Bigger Volume Icon (32px) in a 56px button */}
                <button
                  onClick={() => playSound(sound.audioUrl, idx)}
                  className={`w-14 h-14 flex items-center justify-center rounded-full transition-all shrink-0 ${playingId === idx ? 'bg-[#0096C7] text-white animate-pulse' : 'liquid-glass-dark text-[#002B5B] active:scale-90'}`}
                  aria-label={`Play sound for ${sound.description}`}
                >
                  <Volume2 size={32} strokeWidth={1.5} />
                </button>
              </div>
              
              <p className="mt-2 text-gray-500 text-lg font-bold">
                e.g. in <span className="text-[#002B5B] font-black underline decoration-[#0096C7]">{sound.example}</span>
              </p>
            </div>
          ))}
          
          {letter.pronunciationNote && (
            <div className="mt-6 p-5 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start space-x-3 text-left shadow-sm">
              <div className="mt-0.5 shrink-0">
                <Info size={18} className="text-[#0096C7]" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                {letter.pronunciationNote}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action and Navigation Footer */}
      <div className="flex flex-col w-full space-y-4 mt-8">
        <button
          onClick={onTest}
          className={`flex items-center justify-center space-x-3 w-full py-5 rounded-[2.5rem] ${APP_COLORS.button} text-white font-black text-xl shadow-lg active:scale-[0.97] transition-all`}
        >
          <GraduationCap size={24} strokeWidth={3} />
          <span>TEST ME</span>
        </button>

        <div className="flex items-center justify-between pt-4 px-2">
          <button 
            onClick={prev}
            disabled={index === 0}
            className={`w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark active:scale-90 transition-all ${index === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft size={32} strokeWidth={3} className="text-[#002B5B]" />
          </button>

          <button 
            onClick={next}
            disabled={index === letterIds.length - 1}
            className={`w-14 h-14 flex items-center justify-center rounded-full liquid-glass-dark active:scale-90 transition-all ${index === letterIds.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight size={32} strokeWidth={3} className="text-[#002B5B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
