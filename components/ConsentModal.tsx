
import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { APP_COLORS } from '../constants';

interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl flex flex-col space-y-6 animate-in slide-in-from-bottom-8 duration-500">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#0096C7]/10 rounded-2xl text-[#0096C7]">
            <ShieldCheck size={32} />
          </div>
          <h2 className={`text-2xl font-bold ${APP_COLORS.textMain}`}>Privacy & Progress</h2>
        </div>

        <div className="space-y-4 text-gray-600 text-base leading-relaxed">
          <p>
            To provide the best learning experience, <strong>LettersGR</strong> uses basic cookies and local storage to save your progress across sessions.
          </p>
          <p>
            We also use anonymous service metrics (Google Analytics) to improve the app and show relevant ads which keep this education free for everyone.
          </p>
          <div className="flex items-center space-x-2 text-[#007ACC] font-bold">
            <a href="#" className="flex items-center hover:underline">
              Read our Privacy Policy <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>

        <div className="flex flex-col space-y-3 pt-4">
          <button
            onClick={onAccept}
            className="w-full py-4 rounded-full bg-[#007ACC] text-white font-bold text-lg shadow-lg active:scale-[0.98] transition-all"
          >
            Accept All & Start Learning
          </button>
          <button
            onClick={onDecline}
            className="w-full py-4 rounded-full border-2 border-gray-200 text-gray-700 font-bold text-lg active:bg-gray-50 transition-all"
          >
            Basic Cookies Only
          </button>
        </div>
      </div>
    </div>
  );
};
