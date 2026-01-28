
import React from 'react';
import { APP_COLORS } from '../constants';

interface WelcomeScreenProps {
  onStart: () => void;
  onSkipToLevel: (levelId: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onSkipToLevel }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-between py-24 px-6 text-center bg-gradient-to-b from-[#B2FEFF] to-[#8EFFDF]">
      
      {/* Welcome Title: Deep Blue color (#002B5B), Light weight, 44px */}
      <div className="flex-1 flex flex-col justify-center">
        <h1 className={`text-[44px] font-light leading-[1.2] tracking-tight ${APP_COLORS.textMain} opacity-90`}>
          Welcome!<br />
          You can learn the<br />
          Greek alphabet here
        </h1>
      </div>

      {/* Action Buttons Block */}
      <div className="w-full flex flex-col items-center space-y-12 mb-16">
        
        {/* "Take a test" Button: 
            Default: Blue bg (#007ACC), White text
            Active/Pressed: White bg, Blue text (#007ACC)
        */}
        <button
          onClick={onStart}
          style={{
            width: '260px',
            height: '57px',
            borderRadius: '37px',
            fontSize: '30px',
            fontWeight: '600',
            lineHeight: '59px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 17px',
            gap: '10px'
          }}
          className="bg-[#007ACC] text-white shadow-lg active:bg-white active:text-[#007ACC] active:scale-[0.97] transition-all"
        >
          Take a test
        </button>

        {/* "Skip to level 1" Link: Matches Welcome! text color (#002B5B) */}
        <button
          onClick={() => onSkipToLevel('l1')}
          className={`text-[30px] font-light ${APP_COLORS.textMain} hover:opacity-80 active:scale-95 transition-all tracking-tight`}
        >
          Skip to Level 1
        </button>
      </div>
    </div>
  );
};
