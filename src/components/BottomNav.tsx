import React from 'react';
import { LayoutGrid, BookOpen, Clock, Hash, Bell, Shield, Flame } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home Grid', icon: LayoutGrid, arabic: 'الرئيسية' },
    { id: 'quran', label: 'Quran Paak', icon: BookOpen, arabic: 'القرآن' },
    { id: 'namaz', label: 'Namaz & Qibla', icon: Clock, arabic: 'الصلاة' },
    { id: 'tasbeeh', label: 'Tasbeeh', icon: Hash, arabic: 'التسبيح' },
    { id: 'reminders', label: 'Reminders', icon: Bell, arabic: 'التنبيهات' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#064E3B] border-t border-[#D4AF37]/30 shadow-2xl pb-safe">
      <div className="max-w-md mx-auto px-2 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#D4AF37] bg-[#D4AF37]/20 font-bold scale-105'
                  : 'text-emerald-100/70 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110 text-[#D4AF37]' : ''}`} />
              <span className="text-[10px] sm:text-[11px] leading-tight font-medium">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -top-1 w-2 h-1 bg-[#D4AF37] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
