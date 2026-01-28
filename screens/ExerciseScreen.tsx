
import React from 'react';
import { Music, Camera, PenTool, Type, Lock } from 'lucide-react';
import { APP_COLORS } from '../constants';

export const ExerciseScreen: React.FC = () => {
  const exercises = [
    { title: 'Sound Recognition', desc: 'Tap to hear and match', icon: Music, status: 'active' },
    { title: 'Reading Practice', desc: 'Identify letter clusters', icon: Type, status: 'active' },
    { title: 'Find in Signs', desc: 'Real-world images', icon: Camera, status: 'coming-soon' },
    { title: 'Letter Tracing', desc: 'Learn the pen strokes', icon: PenTool, status: 'coming-soon' }
  ];

  return (
    <div className="py-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold ${APP_COLORS.textMain}`}>Skill Training</h2>
        <p className="text-gray-500 font-light">Deepen your knowledge with targeted practice.</p>
      </div>

      <div className="grid gap-4">
        {exercises.map((ex, i) => (
          <div 
            key={i}
            className={`flex items-center p-5 rounded-[2.5rem] border-2 transition-all ${ex.status === 'active' ? 'border-[#0096C7]/10 bg-white hover:shadow-lg cursor-pointer' : 'border-gray-50 bg-gray-50 opacity-60'}`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 transition-colors ${ex.status === 'active' ? 'liquid-glass-dark text-[#0096C7]' : 'bg-gray-200 text-gray-400'}`}>
              <ex.icon size={24} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold ${ex.status === 'active' ? APP_COLORS.textMain : 'text-gray-400'}`}>
                {ex.title}
              </h3>
              <p className="text-xs text-gray-500">{ex.desc}</p>
            </div>
            {ex.status === 'coming-soon' && (
              <div className="flex items-center text-[10px] font-bold uppercase tracking-tighter text-gray-400 bg-gray-100 px-2 py-1 rounded">
                <Lock size={12} className="mr-1" />
                Soon
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
