
import React, { useState, useEffect } from 'react';
import { Play, ChevronLeft, ChevronRight, GraduationCap, Info } from 'lucide-react';
import { GREEK_ALPHABET, APP_COLORS } from '../constants';
import { audioManager } from '../components/AudioManager';

interface LearningScreenProps {
  letterIds: string[];
  initialIndex: number;
  onTest: () => void;
}

export const LearningScreen: React.FC<LearningScreenProps> = ({ letterIds, initialIndex, onTest }) => {
  const [index, setIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const letter = GREEK_ALPHABET.find(l => l.id === letterIds[index])!;

  useEffect(() => {
    // Stop audio when changing letters
    audioManager.stop();
    setIsPlaying(false);
    return () => audioManager.stop();
  }, [index]);

  const playAudio = () => {
    setIsPlaying(true);
    audioManager.play(letter.audioUrl, () => setIsPlaying(false));
  };

  const next = () => {
    setIndex(prev => Math.min(prev + 1, letterIds.length - 1));
  };
  
  const prev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-2">
      <div className="text-center w-full mb-4">
        <span className="text-xs font-black text-[#0096C7] uppercase tracking-widest bg-[#0096C7]/5 px-4 py-1.5 rounded-full border border-[#0096C7]/10">
          {index + 1} OF {letterIds.length}
        </span>
      </div>

      <div className="flex flex-col items-center space-y-8 w-full animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center space-x-12 text-[140px] md:text-[180px] font-black tracking-tighter leading-none select-none">
            <span className={APP_COLORS.textMain}>{letter.upper}</span>
            <span className={APP_COLORS.textAccent}>{letter.lower}</span>
          </div>
          <div className="mt-2 text-xl font-mono text-[#0096C7] font-bold bg-[#0096C7]/5 px-6 py-2 rounded-full border border-[#0096C7]/20">
            {letter.ipa}
          </div>
        </div>

        <div className="text-center space-y-2 px-4 max-w-sm">
          <h3 className="text-3xl font-black tracking-tight text-[#002B5B]">
            {letter.soundDescription}
          </h3>
          
          <p className="text-gray-500 text-lg font-bold">
            e.g. in <span className="text-[#002B5B] font-black underline decoration-[#0096C7]">{letter.exampleWord}</span>
          </p>
          
          {letter.pronunciationNote && (
            <div className="mt-4 p-5 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-start space-x-3 text-left shadow-sm">
              <Info size={18} className="text-[#0096C7] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed italic">
                {letter.pronunciationNote}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full space-y-4 mt-8">
        <button
          onClick={playAudio}
          disabled={isPlaying}
          className={`flex items-center justify-center space-x-3 w-full py-5 rounded-[2.5rem] border-[3px] border-[#0096C7] font-black text-xl transition-all active:scale-[0.97] ${isPlaying ? 'bg-[#0096C7] text-white shadow-inner' : 'bg-white text-[#0096C7] shadow-md'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPlaying ? 'bg-white/20' : 'bg-[#0096C7]/10'}`}>
            <Play size={18} fill={isPlaying ? "white" : "#0096C7"} strokeWidth={3} className={isPlaying ? 'animate-pulse' : ''} />
          </div>
          <span>{isPlaying ? 'PLAYING...' : 'HEAR PURE SOUND'}</span>
        </button>

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
