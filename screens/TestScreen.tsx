import React, { useState, useEffect, useMemo } from 'react';
import { GREEK_ALPHABET, APP_COLORS } from '../constants';
import { InterstitialOverlay } from '../components/AdPlaceholder';
import { RefreshCcw, Volume2, Star } from 'lucide-react';
import { audioManager } from '../components/AudioManager';

interface TestScreenProps {
  letterIds: string[];
  onFinish: () => void;
  onStartLevel1: () => void;
  updateHeaderTitle?: (title: React.ReactNode) => void;
}

const TOP_SCORE_KEY = 'lettersgr_test_top_score';

export const TestScreen: React.FC<TestScreenProps> = ({ letterIds, onFinish, onStartLevel1, updateHeaderTitle }) => {
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
    
    const pool: { id: string; type: 'upper' | 'lower' }[] = [];
    
    letterIds.forEach(id => {
      // Requirement: Final Sigma (ς) should only be tested in lowercase
      if (id !== 'final_sigma') {
        pool.push({ id, type: 'upper' });
      }
      pool.push({ id, type: 'lower' });
    });
    
    // Initial shuffle
    let shuffled = [...pool].sort(() => 0.5 - Math.random());
    
    // Helper to get description (English equivalent)
    const getDesc = (item: { id: string }) => 
      GREEK_ALPHABET.find(l => l.id === item.id)?.sounds[0].description;

    // Constraint: Don't show same sound twice in a row
    for (let i = 1; i < shuffled.length - 1; i++) {
        const prevDesc = getDesc(shuffled[i-1]);
        const currDesc = getDesc(shuffled[i]);
        
        if (currDesc === prevDesc) {
            for (let j = i + 1; j < shuffled.length; j++) {
                if (getDesc(shuffled[j]) !== prevDesc) {
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    break;
                }
            }
        }
    }
    return shuffled;
  }, [letterIds]);
  
  const generateOptions = (correctId: string) => {
    const correctLetter = GREEK_ALPHABET.find(l => l.id === correctId)!;
    const correctDesc = correctLetter.sounds[0].description;

    const validOthers = GREEK_ALPHABET.filter(l => 
      l.id !== correctId && 
      l.sounds[0].description !== correctDesc
    );
    
    const shuffledOthers = [...validOthers].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 5).map(l => l.id);
    return [...distractors, correctId].sort(() => 0.5 - Math.random());
  };

  const playGreekSound = (idx: number = currentQuestionIndex) => {
    if (!testPool[idx]) return;
    const letter = GREEK_ALPHABET.find(l => l.id === testPool[idx].id);
    if (letter) {
      setIsPlaying(true);
      audioManager.play(letter.sounds[0].audioUrl, () => setIsPlaying(false));
    }
  };

  useEffect(() => {
    if (testPool.length > 0 && currentQuestionIndex < testPool.length) {
      setOptions(generateOptions(testPool[currentQuestionIndex].id));
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [currentQuestionIndex, testPool]);

  useEffect(() => {
    if (testPool.length > 0 && currentQuestionIndex === testPool.length && !isTestComplete) {
      const percentage = Math.round((score / testPool.length) * 100);
      if (topScore === null || percentage > topScore) {
        setIsNewHighScore(true);
        localStorage.setItem(TOP_SCORE_KEY, percentage.toString());
      }
      setIsTestComplete(true);
    }
  }, [currentQuestionIndex, testPool, score, topScore, isTestComplete]);

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

  const getFeedback = (pct: number) => {
    if (pct < 70) return "That’s it!";
    if (pct < 85) return "Well done!";
    if (pct < 100) return "Almost perfect!";
    return "Τέλειος!";
  };

  const currentQ = testPool[currentQuestionIndex];
  const currentLetter = currentQ ? GREEK_ALPHABET.find(l => l.id === currentQ.id) : null;

  useEffect(() => {
    if (isTestComplete) {
       updateHeaderTitle?.(""); 
       return;
    }

    if (currentLetter) {
      const titleContent = (
        <div className="flex items-center justify-center mt-[140px] md:mt-[100px] space-x-4 md:space-x-8">
          <span 
            className={`text-[32px] md:text-[54px] font-light leading-[131%] ${isCorrect === false ? 'text-red-500' : APP_COLORS.textMain} transition-colors duration-300`}
          >
            {isCorrect === false ? "Not quite" : currentLetter.sounds[0].description}
          </span>
          {isCorrect !== false && (
            <button 
              onClick={(e) => { e.stopPropagation(); playGreekSound(); }}
              className={`w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full transition-all shrink-0 ${isPlaying ? 'bg-[#0096C7] text-white animate-pulse' : 'liquid-glass-dark text-[#002B5B] active:scale-90'}`}
            >
              <Volume2 size={32} className="md:w-12 md:h-12" strokeWidth={1.5} />
            </button>
          )}
        </div>
      );
      updateHeaderTitle?.(titleContent);
    }
  }, [currentLetter, isCorrect, isPlaying, isTestComplete, updateHeaderTitle]);

  if (isTestComplete) {
    const percentage = Math.round((score / testPool.length) * 100);
    const feedback = getFeedback(percentage);
    
    return (
      <div className="fixed inset-0 z-50 flex flex-col overflow-hidden items-center justify-center">
        {showAd && <InterstitialOverlay onClose={() => setShowAd(false)} />}
        
        <div 
          className="absolute inset-0 bg-cover bg-center -z-20 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=2000")' }}
        />
        
        <div className="absolute inset-0 bg-[#071ba6c7] -z-10" />

        {isNewHighScore && (
          <div className="absolute top-[calc(var(--sat,0px)+40px)] left-0 right-0 flex items-center justify-center space-x-2 animate-bounce-soft z-10">
            <Star size={18} className="text-yellow-400 fill-current" />
            <span className="text-white text-[16px] font-bold tracking-[0.2em] uppercase">NEW HIGH SCORE</span>
          </div>
        )}

        <div className="flex flex-col items-center max-sm w-full px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="mb-10">
            <img 
              src="https://raw.githubusercontent.com/fioli-official/lettersgr-proto-v0/401bb94f6ba43d5671c65a74a2ceaf9319ecf8bd/media/laurel-icon-test-end-white.svg" 
              alt="Laurel Wreath"
              className="w-32 h-32 animate-glow-pulse"
            />
          </div>

          <div className="space-y-4 text-center mb-16">
            <h2 className="text-[27px] font-light tracking-tight text-white leading-tight">
              {feedback}
            </h2>
            
            <div className="pt-2">
              <p className="text-[64px] font-light text-white leading-none tracking-tighter">
                {percentage}%
              </p>
              <p className="text-[27px] font-light text-white opacity-80 mt-5 tracking-tight">
                Greek letters correct
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center space-y-10">
            <button
              onClick={onStartLevel1}
              style={{
                width: '260px',
                height: '57px',
                borderRadius: '37px',
                fontSize: '27px',
                fontWeight: '600',
              }}
              className="bg-[rgb(0,87,239)] text-white shadow-2xl active:bg-white active:text-[rgb(0,87,239)] active:scale-[0.97] transition-all flex items-center justify-center"
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
              className="text-[27px] font-light text-white hover:opacity-70 active:scale-95 transition-all tracking-tight flex items-center space-x-3"
            >
              <RefreshCcw size={24} strokeWidth={2} />
              <span>Retry test</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ || !currentLetter) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-end pb-[109px] md:justify-center md:pb-0 transition-colors duration-500">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D9FFFF] to-[#C7FFEF] -z-20" />
      
      {isCorrect === false && (
        <div className="absolute inset-0 bg-[#FFF5F5] -z-10 animate-in fade-in duration-300" />
      )}

      <div className="grid grid-cols-2 gap-x-7 gap-y-7 md:gap-x-16 md:gap-y-[4vh] w-full max-w-[200px] md:max-w-[500px] md:h-[65vh] animate-in zoom-in-95 duration-300 content-center">
        {options.map((optionId) => {
          const opt = GREEK_ALPHABET.find(l => l.id === optionId)!;
          const label = currentQ.type === 'upper' ? opt.upper : opt.lower;
          
          let bgColor = 'bg-white/40';
          let textColor = '#002B5B';
          let borderColor = 'border-white/20';

          if (selectedOption === optionId) {
            if (isCorrect) {
              bgColor = 'bg-green-500'; textColor = 'white'; borderColor = 'border-green-600';
            } else {
              bgColor = 'bg-red-500'; textColor = 'white'; borderColor = 'border-red-600';
            }
          } else if (selectedOption && optionId === currentQ.id) {
            bgColor = 'bg-green-100'; borderColor = 'border-green-400';
          }

          return (
            <button
              key={optionId}
              onClick={() => handleAnswer(optionId)}
              disabled={!!selectedOption}
              style={{ color: textColor }}
              className={`w-full aspect-square md:aspect-auto md:h-full flex items-center justify-center text-[42px] md:text-[90px] font-light rounded-full md:rounded-[5rem] border-2 md:border-[4px] shadow-sm backdrop-blur-md transition-all duration-300 active:scale-90 ${bgColor} ${borderColor}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 px-12">
        <div className="h-1 w-full bg-[#002B5B]/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#0096C7] transition-all duration-700 rounded-full" 
            style={{ width: `${testPool.length > 0 ? ((currentQuestionIndex) / testPool.length) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
};