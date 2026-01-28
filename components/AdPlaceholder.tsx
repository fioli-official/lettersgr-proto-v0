
import React from 'react';

export const BannerAdPlaceholder: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 flex items-center justify-center p-2 z-40">
      <div className="w-full max-w-[320px] h-[50px] bg-gray-300 flex items-center justify-center text-[10px] text-gray-600 font-bold border border-gray-400">
        ADMOB BANNER AD PLACEHOLDER
      </div>
    </div>
  );
};

export const InterstitialOverlay: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-8 text-white">
      <div className="absolute top-4 right-4">
        <button 
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white text-sm"
        >
          Close [X]
        </button>
      </div>
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Advertisement</p>
        <div className="w-64 h-96 bg-gray-800 flex items-center justify-center rounded-xl border border-white/10 shadow-2xl">
          <span className="font-bold">INTERSTITIAL AD</span>
        </div>
        <p className="mt-8 text-sm text-white/60">Supporting free education</p>
      </div>
    </div>
  );
};
