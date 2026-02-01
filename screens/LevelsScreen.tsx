
import React from 'react';
import { LEVELS, GREEK_ALPHABET, APP_COLORS } from '../constants';
import { BannerAdPlaceholder } from '../components/AdPlaceholder';

interface LevelsScreenProps {
  onSelectLevel: (id: string) => void;
}

export const LevelsScreen: React.FC<LevelsScreenProps> = ({ onSelectLevel }) => {
  return (
    <div className="py-2 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6 mb-24">
        {LEVELS.map((level) => {
          const letterPreview = level.letters
            .map(lid => GREEK_ALPHABET.find(l => l.id === lid))
            .filter(Boolean)
            .map(l => `${l?.upper}${l?.lower}`)
            .join(' ');

          const soundsPreview = level.letters
            .map(lid => GREEK_ALPHABET.find(l => l.id === lid)?.sounds[0].description)
            .filter(Boolean)
            .join(' · ');

          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className="w-full text-left bg-white border-2 border-gray-100 p-7 rounded-[2.5rem] shadow-sm hover:shadow-lg transition-all active:scale-[0.98] active:bg-gray-50 block group"
            >
              <h2 className={`text-2xl font-bold mb-2 ${APP_COLORS.textMain} group-hover:text-[#0096C7] transition-colors leading-tight`}>
                {level.title}
              </h2>
              <p className="text-base text-gray-500 mb-4 font-medium leading-snug">
                {level.description}
              </p>
              
              <div className="text-sm text-gray-400 font-bold mb-4 uppercase tracking-wider">
                {soundsPreview}
              </div>

              <div className="flex flex-wrap gap-3 text-[#005BAE] font-bold text-2xl opacity-90 tracking-tighter">
                {letterPreview}
              </div>
            </button>
          );
        })}
      </div>
      <BannerAdPlaceholder />
    </div>
  );
};
