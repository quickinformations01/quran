import React from 'react';
import { Compass, Moon, Sun, Settings, Volume2, Sparkles, MapPin, Download } from 'lucide-react';
import { LocationData, AppSettings } from '../types';
import { getHijriDate } from '../utils/prayerCalculator';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  location: LocationData;
  settings: AppSettings;
  onOpenSettings: () => void;
  onOpenLocation: () => void;
  currentlyPlayingAudio: string | null;
  onStopAudio: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  location,
  settings,
  onOpenSettings,
  onOpenLocation,
  currentlyPlayingAudio,
  onStopAudio
}) => {
  const hijriDate = getHijriDate();

  return (
    <header className="sticky top-0 z-40 bg-[#064E3B] text-white border-b border-[#D4AF37]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
        {/* Logo & App Title */}
        <div 
          onClick={() => setActiveTab('namaz')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#064E3B] rounded-[10px] flex items-center justify-center border border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition">
              <span className="text-xl font-serif text-[#D4AF37] font-bold">القرآن</span>
            </div>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold font-serif text-white tracking-tight leading-tight flex items-center gap-1.5">
              Al-Quran & Namaz
            </h1>
            <p className="text-[11px] text-[#D4AF37] font-medium">
              {hijriDate}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio Playing Indicator */}
          {currentlyPlayingAudio && (
            <button
              onClick={onStopAudio}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#064E3B] font-bold text-xs animate-pulse shadow"
              title="Stop Recitation Audio"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Playing</span>
            </button>
          )}

          {/* Location Picker */}
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition cursor-pointer"
            title="Change Location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="max-w-[80px] sm:max-w-[120px] truncate">{location.city}</span>
          </button>

          {/* Fiqh Indicator Tag */}
          <button
            onClick={onOpenSettings}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold"
            title="Fiqh Setting"
          >
            <span>{settings.fiqh}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-[#D4AF37] transition cursor-pointer"
            title="App Settings & Fiqh"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
