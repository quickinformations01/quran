import React from 'react';
import { BookOpen, Shield, Flame, Hash, Compass, Bell, ArrowRight, Sparkles, MapPin, Heart } from 'lucide-react';
import { LocationData, AppSettings } from '../types';
import { calculatePrayerTimes } from '../utils/prayerCalculator';

interface Props {
  onSelectTab: (tab: string) => void;
  location: LocationData;
  settings: AppSettings;
  onOpenLocationModal: () => void;
}

export const HomeGridView: React.FC<Props> = ({
  onSelectTab,
  location,
  settings,
  onOpenLocationModal
}) => {
  // Calculate today's prayer times for quick header widget
  const prayerData = calculatePrayerTimes(location, settings.fiqh, settings.calculationMethod);
  const nextSlot = prayerData.nextSlot;

  const gridItems = [
    {
      id: 'quran',
      title: 'Quran Paak',
      subtitle: 'Complete 114 Surahs with Urdu/English Translation & Audio',
      icon: BookOpen,
      tag: '114 Surahs',
      color: 'bg-[#064E3B]',
      badge: 'Al-Quran',
    },
    {
      id: 'manzil',
      title: 'Manzil Protection',
      subtitle: '33 Sacred Verses for Daily Ruqyah, Safety & Healing',
      icon: Shield,
      tag: 'Ruqyah Verses',
      color: 'bg-[#064E3B]',
      badge: 'Protection',
    },
    {
      id: 'punch',
      title: 'Punch Surah',
      subtitle: '5 Blessed Surahs: Yaseen, Ar-Rahman, Mulk, Waqiah, Kahf',
      icon: Flame,
      tag: '5 Surahs',
      color: 'bg-[#064E3B]',
      badge: 'Fazail',
    },
    {
      id: 'tasbeeh',
      title: 'Digital Tasbeeh',
      subtitle: 'Count Dhikr with 33, 100, 313, 500, 1000 Target Alarms',
      icon: Hash,
      tag: 'Counter & Alarm',
      color: 'bg-[#064E3B]',
      badge: 'Dhikr',
    },
    {
      id: 'namaz',
      title: 'Namaz & Qibla',
      subtitle: 'Accurate Prayer Schedule & Live Kaaba Direction Compass',
      icon: Compass,
      tag: 'Prayer & Qibla',
      color: 'bg-[#064E3B]',
      badge: 'Salat',
    },
    {
      id: 'reminders',
      title: 'Namaz Reminders',
      subtitle: 'Set Daily Prayer Alarms & Dhikr Practice Notifications',
      icon: Bell,
      tag: 'Daily Alarms',
      color: 'bg-[#064E3B]',
      badge: 'Notifications',
    },
  ];

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Bismillah ar-Rahman ar-Rahim
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
              Al-Quran & Islamic Hub
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-sans">
              Explore Quran Paak, Manzil, Punch Surahs, Digital Tasbeeh with Target Alarms, and Live Namaz Times with Qibla Direction.
            </p>
          </div>

          {/* Quick Location & Next Prayer Card */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-2 min-w-[200px]">
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold hover:underline cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[140px]">{location.city}, {location.country}</span>
            </button>

            {nextSlot ? (
              <button
                type="button"
                onClick={() => onSelectTab('namaz')}
                className="w-full text-left space-y-0.5 hover:opacity-90 transition cursor-pointer group"
                title="View Full Prayer Schedule & Qibla"
              >
                <p className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider group-hover:text-[#D4AF37] transition-colors">
                  Next Prayer:
                </p>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-base font-bold text-white font-serif">{nextSlot.name}</span>
                  <span className="text-sm font-mono font-bold text-[#D4AF37]">{nextSlot.time}</span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelectTab('namaz')}
                className="w-full text-left text-xs text-white/80 font-medium hover:text-[#D4AF37] cursor-pointer"
              >
                All today's prayers completed
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#064E3B]" /> Islamic Features Grid
          </h2>
          <span className="text-xs text-gray-500 font-medium">Tap any card to open feature</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className="group text-left p-5 rounded-3xl bg-white border border-gray-200 hover:border-[#064E3B] shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-[#D4AF37] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#064E3B] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#064E3B]">
                  <span>{item.tag}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span className="text-[11px] text-[#D4AF37]">Open</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Verse / Hadith Inspiration Card */}
      <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#064E3B] text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4 text-[#b45309]" /> Daily Islamic Inspiration
        </div>
        <p className="text-xl sm:text-2xl font-serif text-gray-900 leading-snug text-right font-semibold">
          فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ
        </p>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
          "So remember Me; I will remember you. And be grateful to Me and do not deny Me."
        </p>
        <p className="text-[11px] text-[#064E3B] font-bold">
          — Surah Al-Baqarah [2:152]
        </p>
      </div>
    </div>
  );
};
