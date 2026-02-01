
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Screen, AppState } from './types';
import { LEVELS, GREEK_ALPHABET } from './constants';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LevelsScreen } from './screens/LevelsScreen';
import { LearningScreen } from './screens/LearningScreen';
import { TestScreen } from './screens/TestScreen';
import { ExerciseScreen } from './screens/ExerciseScreen';
import { MenuOverlay } from './screens/MenuOverlay';
import { ConsentModal } from './components/ConsentModal';
import { SplashScreen } from './components/SplashScreen';
import { audioManager } from './components/AudioManager';
import { CheckCircle, AlertCircle } from 'lucide-react';

const CONSENT_KEY = 'lettersgr_consent_given';
const SPLASH_DURATION = 3000;
const FADE_DURATION = 1500;

const App: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [state, setState] = useState<AppState>({
    currentScreen: Screen.Welcome
  });
  const [showMenu, setShowMenu] = useState(false);
  const [menuInitialView, setMenuInitialView] = useState<'main' | 'cookies'>('main');
  const [showConsent, setShowConsent] = useState(false);
  const [toast, setToast] = useState<{ message: React.ReactNode; type: 'success' | 'info' } | null>(null);
  const [testHeaderTitle, setTestHeaderTitle] = useState<React.ReactNode>(null);

  // Initial load effect (Splash Screen with Crossfade)
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsSplashFading(true);
      const hasConsent = localStorage.getItem(CONSENT_KEY);
      if (!hasConsent) {
        setShowConsent(true);
      }
    }, SPLASH_DURATION);

    const removeTimer = setTimeout(() => {
      setShowSplashScreen(false);
    }, SPLASH_DURATION + FADE_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Toast timeout effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleConsent = (accepted: boolean, showToast: boolean = false) => {
    audioManager.unlock();
    localStorage.setItem(CONSENT_KEY, accepted ? 'all' : 'essential');
    setShowConsent(false);
    
    if (!showToast) return;

    if (accepted) {
      setToast({
        message: (
          <>
            All functions are available. Change cookie settings anytime via the{' '}
            <button 
              onClick={() => { setMenuInitialView('cookies'); setShowMenu(true); setToast(null); }}
              className="underline decoration-[#8EFFDF] hover:opacity-80 transition-opacity"
            >
              menu
            </button>.
          </>
        ),
        type: 'success'
      });
    } else {
      setToast({
        message: (
          <>
            Progress saving is disabled. Change cookie settings anytime via the{' '}
            <button 
              onClick={() => { setMenuInitialView('cookies'); setShowMenu(true); setToast(null); }}
              className="underline decoration-[#0096C7] hover:opacity-80 transition-opacity"
            >
              menu
            </button>.
          </>
        ),
        type: 'info'
      });
    }
  };

  const navigateTo = useCallback((screen: Screen, params?: Partial<AppState>) => {
    audioManager.unlock();
    setState(prev => ({ ...prev, currentScreen: screen, ...params }));
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => {
    switch (state.currentScreen) {
      case Screen.Levels: navigateTo(Screen.Welcome); break;
      case Screen.Intro: navigateTo(Screen.Levels); break;
      case Screen.Learning: navigateTo(Screen.Levels); break;
      case Screen.Test: 
        if (state.selectedLevelId === 'all') navigateTo(Screen.Welcome);
        else navigateTo(Screen.Learning); 
        break;
      case Screen.Exercises: navigateTo(Screen.Levels); break;
      case Screen.About: navigateTo(Screen.Levels); break;
      default: navigateTo(Screen.Welcome);
    }
  };

  const testLetterIds = useMemo(() => {
    if (state.currentScreen !== Screen.Test) return [];
    return state.selectedLevelId === 'all' 
      ? GREEK_ALPHABET.map(l => l.id) 
      : (LEVELS.find(l => l.id === state.selectedLevelId)?.letters || LEVELS[0].letters);
  }, [state.currentScreen, state.selectedLevelId]);

  const renderScreen = () => {
    switch (state.currentScreen) {
      case Screen.Welcome:
        return (
          <WelcomeScreen 
            onStart={() => navigateTo(Screen.Test, { selectedLevelId: 'all' })} 
            onSkipToLevel={(id) => navigateTo(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 })}
          />
        );
      
      case Screen.Levels:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex gap-4 p-1.5 bg-gray-100 rounded-[2rem]">
              <button 
                onClick={() => navigateTo(Screen.Levels)}
                className={`flex-1 py-4 text-base font-bold rounded-[1.5rem] transition-all ${state.currentScreen === Screen.Levels ? 'bg-white shadow-md text-[#0096C7]' : 'text-gray-500'}`}
              >
                Letters
              </button>
              <button 
                onClick={() => navigateTo(Screen.Exercises)}
                className="flex-1 py-4 text-base font-bold text-gray-500 rounded-[1.5rem] hover:bg-white/50"
              >
                Exercises
              </button>
            </div>
            <LevelsScreen onSelectLevel={(id) => navigateTo(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 })} />
          </div>
        );

      case Screen.Exercises:
        return (
          <div className="space-y-8">
             <div className="flex gap-4 p-1.5 bg-gray-100 rounded-[2rem]">
              <button 
                onClick={() => navigateTo(Screen.Levels)}
                className="flex-1 py-4 text-base font-bold text-gray-500 rounded-[1.5rem] hover:bg-white/50"
              >
                Letters
              </button>
              <button 
                className="flex-1 py-4 text-base font-bold bg-white shadow-md text-[#0096C7] rounded-[1.5rem]"
              >
                Exercises
              </button>
            </div>
            <ExerciseScreen />
          </div>
        );

      case Screen.Learning: {
        const levelId = state.selectedLevelId || 'l1';
        const level = LEVELS.find(l => l.id === levelId)!;
        return (
          <LearningScreen 
            letterIds={level.letters} 
            initialIndex={state.currentLetterIndex || 0}
            onTest={() => navigateTo(Screen.Test, { selectedLevelId: level.id })}
          />
        );
      }

      case Screen.Test: {
        return (
          <TestScreen 
            letterIds={testLetterIds} 
            onFinish={() => navigateTo(Screen.Levels)} 
            onStartLevel1={() => navigateTo(Screen.Learning, { selectedLevelId: 'l1', currentLetterIndex: 0 })}
            updateHeaderTitle={setTestHeaderTitle}
          />
        );
      }

      default:
        return <WelcomeScreen onStart={() => navigateTo(Screen.Test, { selectedLevelId: 'all' })} onSkipToLevel={(id) => navigateTo(Screen.Learning, { selectedLevelId: id, currentLetterIndex: 0 })} />;
    }
  };

  const getTitle = () => {
    if (state.currentScreen === Screen.Welcome) return undefined;
    if (state.currentScreen === Screen.Levels) return "Groups";
    if (state.currentScreen === Screen.Exercises) return "Practice";
    if (state.currentScreen === Screen.Learning) return LEVELS.find(l => l.id === state.selectedLevelId)?.title;
    if (state.currentScreen === Screen.Test) return testHeaderTitle || "Test";
    return "LettersGR";
  };

  return (
    <>
      <Layout 
        title={getTitle() as any} 
        onBack={state.currentScreen !== Screen.Welcome ? goBack : undefined}
        onMenuToggle={() => { setMenuInitialView('main'); setShowMenu(true); }}
      >
        {renderScreen()}
      </Layout>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[500] w-[90%] max-w-sm">
          <div className={`flex items-start space-x-3 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-500 ${toast.type === 'success' ? 'bg-[#002B5B] text-white' : 'bg-white border-2 border-gray-100 text-[#002B5B]'}`}>
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' ? <CheckCircle size={20} className="text-[#8EFFDF]" /> : <AlertCircle size={20} className="text-[#0096C7]" />}
            </div>
            <div className="text-base font-bold leading-snug">
              {toast.message}
            </div>
          </div>
        </div>
      )}
      
      {showMenu && (
        <MenuOverlay 
          onClose={() => setShowMenu(false)} 
          onNavigate={navigateTo} 
          onUpdateConsent={(accepted) => handleConsent(accepted, false)} 
          initialView={menuInitialView}
        />
      )}
      {showConsent && <ConsentModal onAccept={() => handleConsent(true, true)} onDecline={() => handleConsent(false, true)} />}
      
      {showSplashScreen && (
        <SplashScreen isFading={isSplashFading} />
      )}
    </>
  );
};

export default App;
