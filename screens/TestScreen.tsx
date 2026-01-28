
import React, { useState, useEffect, useMemo } from 'react';
import { GREEK_ALPHABET, APP_COLORS } from '../constants';
import { InterstitialOverlay } from '../components/AdPlaceholder';
import { RefreshCcw, Volume2, Trophy, Star } from 'lucide-react';
import { audioManager } from '../components/AudioManager';

interface TestScreenProps {
  letterIds: string[];
  onFinish: () => void;
  onStartLevel1: () => void;
}

const TOP_SCORE_KEY = 'lettersgr_test_top_score';

export const TestScreen: React.FC<TestScreenProps> = ({ letterIds, onFinish, onStartLevel1 }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [topScore, setTopScore] = useState<number | null>(null);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(TOP_SCORE_KEY);
    if (saved) setTopScore(parseInt(saved, 10));
    return () => audioManager.stop();
  }, []);

  const testPool = useMemo(() => {
    if (letterIds.length === 0) return [];
    const pool = [
      ...letterIds.map(id => ({ id, type: 'upper' })), 
      ...letterIds.map(id => ({ id, type: 'lower' }))
    ];
    return pool.sort(() => 0.5 - Math.random());
  }, [letterIds]);
  
  const generateOptions = (correctId: string) => {
    const others = GREEK_ALPHABET.filter(l => l.id !== correctId);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 5).map(l => l.id);
    return [...distractors, correctId].sort(() => 0.5 - Math.random());
  };

  const playGreekSound = (idx: number = currentQuestionIndex) => {
    if (!testPool[idx]) return;
    const letter = GREEK_ALPHABET.find(l => l.id === testPool[idx].id);
    if (letter) {
      setIsPlaying(true);
      audioManager.play(letter.audioUrl, () => setIsPlaying(false));
    }
  };

  useEffect(() => {
    if (testPool.length > 0 && currentQuestionIndex < testPool.length) {
      setOptions(generateOptions(testPool[currentQuestionIndex].id));
      setSelectedOption(null);
      setIsCorrect(null);
      // Audio autoplay removed per requirements
    } else if (testPool.length > 0) {
      const percentage = Math.round((score / testPool.length) * 100);
      if (topScore === null || percentage > topScore) {
        setIsNewHighScore(true);
        localStorage.setItem(TOP_SCORE_KEY, percentage.toString());
      }
      setIsTestComplete(true);
    }
  }, [currentQuestionIndex, testPool]);

  const handleAnswer = (optionId: string) => {
    if (selectedOption) return;
    
    setSelectedOption(optionId);
    const correct = optionId === testPool[currentQuestionIndex].id;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    
    setTimeout(() => {
      setCurrentQuestionIndex(prev => prev + 1);
    }, 1200);
  };

  if (isTestComplete) {
    const percentage = Math.round((score / testPool.length) * 100);
    
    return (
      <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">
        {showAd && <InterstitialOverlay onClose={() => setShowAd(false)} />}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1400")' }}
        >
          <div className="absolute inset-0 bg-[#001A33]/80" />
        </div>
        <div className="relative z-10 flex-1 flex flex-col items-center justify-between py-12 px-6 text-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="space-y-6 pt-10">
            {isNewHighScore && (
              <div className="inline-flex items-center space-x-2 bg-yellow-400 text-[#002B5B] px-8 py-3 rounded-full font-black text-xl animate-bounce mb-4 shadow-2xl">
                <Trophy size={24} />
                <span>NEW TOP SCORE!</span>
              </div>
            )}
            <h2 className="text-[54px] font-black text-white drop-shadow-lg leading-tight text-center">Mastered!</h2>
            <div className="space-y-1">
              <p className="text-[32px] font-bold text-[#8EFFDF] leading-snug drop-shadow-md">{percentage}% Accuracy</p>
              <p className="text-xl font-medium text-white/70">in recognizing pure Greek sounds</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center space-y-4 pb-4">
            <button
              onClick={onStartLevel1}
              className="w-full max-w-xs h-20 bg-[#FF69B4] text-white rounded-[40px] text-[30px] font-black shadow-2xl active:scale-95 transition-transform"
            >
              Start Level 1
            </button>
            <button
              onClick={() => {
                setShowAd(true);
                setTimeout(() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setIsTestComplete(false);
                  setIsNewHighScore(false);
                }, 500);
              }}
              className="w-full max-w-xs h-16 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 rounded-[32px] text-[24px] font-bold shadow-xl active:scale-95 transition-transform flex items-center justify-center space-x-3"
            >
              <RefreshCcw size={28} strokeWidth={3} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = testPool[currentQuestionIndex];
  const currentLetter = currentQ ? GREEK_ALPHABET.find(l => l.id === currentQ.id) : null;

  if (!currentQ || !currentLetter) return null;

  return (
    <div className="py-8 flex flex-col items-center min-h-[75vh] animate-in fade-in duration-500">
      <div className="w-full flex justify-between items-center mb-6 px-2">
        <span className="text-xs font-black text-[#0096C7] uppercase tracking-widest bg-[#0096C7]/5 px-4 py-1.5 rounded-full border border-[#0096C7]/10">
          {currentQuestionIndex + 1} / {testPool.length}
        </span>
        {topScore !== null && (
          <div className="flex items-center space-x-2 text-gray-400 text-xs font-black bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>TOP: {topScore}%</span>
          </div>
        )}
      </div>

      <div className="text-center mb-8 px-4 w-full">
        <div className="mb-6 space-y-1">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            Choose the correct letter:
          </h2>
          <div className="text-3xl font-black text-[#002B5B]">
            {currentLetter.soundDescription}
          </div>
        </div>
        
        <button
          onClick={() => playGreekSound()}
          disabled={isPlaying}
          className={`group relative p-8 rounded-[3rem] transition-all active:scale-90 border-[5px] shadow-xl ${isPlaying ? 'bg-[#0096C7] border-[#0096C7] text-white' : 'bg-white border-[#0096C7] text-[#0096C7]'}`}
        >
          <Volume2 size={56} strokeWidth={3} className={isPlaying ? 'animate-pulse' : 'group-hover:scale-105 transition-transform'} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 w-full max-w-sm px-4">
        {options.map((optionId) => {
          const opt = GREEK_ALPHABET.find(l => l.id === optionId)!;
          const label = currentQ.type === 'upper' ? opt.upper : opt.lower;
          
          let bgColor = 'bg-white';
          let borderColor = 'border-gray-100';
          let textColor = APP_COLORS.textMain;

          if (selectedOption === optionId) {
            if (isCorrect) {
              bgColor = 'bg-green-500'; borderColor = 'border-green-600'; textColor = 'text-white';
            } else {
              bgColor = 'bg-red-500'; borderColor = 'border-red-600'; textColor = 'text-white';
            }
          } else if (selectedOption && optionId === currentQ.id) {
            bgColor = 'bg-green-100'; borderColor = 'border-green-500';
          }

          return (
            <button
              key={optionId}
              onClick={() => handleAnswer(optionId)}
              disabled={!!selectedOption}
              className={`aspect-square flex items-center justify-center text-[42px] font-black rounded-[2rem] border-4 shadow-sm transition-all duration-200 active:scale-90 ${bgColor} ${borderColor} ${textColor}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto pt-12 text-center w-full px-6">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
          <div 
            className="h-full bg-[#0096C7] transition-all duration-700 rounded-full" 
            style={{ width: `${testPool.length > 0 ? ((currentQuestionIndex) / testPool.length) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};
