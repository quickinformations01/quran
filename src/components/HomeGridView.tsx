import React from 'react';
import { BookOpen, Shield, Flame, Hash, Compass, Bell, ArrowRight, Sparkles, MapPin, Heart, Calendar, Database, Star } from 'lucide-react';
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
      subtitle: 'Complete 114 Surahs with Urdu/English Translation & Recitation Audio',
      icon: BookOpen,
      tag: '114 Surahs',
      badge: 'Al-Quran',
      cardGradient: 'from-[#064E3B] via-[#04382A] to-[#02241B]',
      borderStyle: 'border-[#D4AF37]/50 hover:border-[#D4AF37]',
      iconBoxBg: 'bg-[#D4AF37] text-[#064E3B]',
      badgeBg: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40',
      tagColor: 'text-[#D4AF37]',
      arrowColor: 'text-[#D4AF37]',
    },
    {
      id: 'manzil',
      title: 'Manzil Protection',
      subtitle: '33 Sacred Verses for Daily Ruqyah, Safety & Spiritual Healing',
      icon: Shield,
      tag: '33 Verses',
      badge: 'Protection',
      cardGradient: 'from-[#1E3A8A] via-[#1E1B4B] to-[#0F172A]',
      borderStyle: 'border-blue-400/50 hover:border-blue-300',
      iconBoxBg: 'bg-blue-400 text-blue-950',
      badgeBg: 'bg-blue-400/20 text-blue-200 border-blue-400/40',
      tagColor: 'text-blue-300',
      arrowColor: 'text-blue-300',
    },
    {
      id: 'punch',
      title: 'Punch Surah',
      subtitle: '5 Blessed Surahs: Yaseen, Ar-Rahman, Mulk, Waqiah, Kahf',
      icon: Flame,
      tag: '5 Surahs',
      badge: 'Fazail',
      cardGradient: 'from-[#831843] via-[#4C0519] to-[#2E020E]',
      borderStyle: 'border-rose-400/50 hover:border-rose-300',
      iconBoxBg: 'bg-rose-400 text-rose-950',
      badgeBg: 'bg-rose-400/20 text-rose-200 border-rose-400/40',
      tagColor: 'text-rose-300',
      arrowColor: 'text-rose-300',
    },
    {
      id: 'tasbeeh',
      title: 'Digital Tasbeeh',
      subtitle: 'Count Dhikr with Target Alarms (33, 100, 313, 500, 1000)',
      icon: Hash,
      tag: 'Counter & Alarm',
      badge: 'Dhikr',
      cardGradient: 'from-[#0F766E] via-[#115E59] to-[#042F2C]',
      borderStyle: 'border-teal-300/50 hover:border-teal-200',
      iconBoxBg: 'bg-teal-300 text-teal-950',
      badgeBg: 'bg-teal-300/20 text-teal-200 border-teal-300/40',
      tagColor: 'text-teal-300',
      arrowColor: 'text-teal-300',
    },
    {
      id: 'namaz',
      title: 'Namaz & Qibla',
      subtitle: 'Accurate Prayer Schedule & Live Kaaba Direction Compass',
      icon: Compass,
      tag: 'Salat & Kaaba',
      badge: 'Salat',
      cardGradient: 'from-[#312E81] via-[#1E1B4B] to-[#0A0A1A]',
      borderStyle: 'border-indigo-400/50 hover:border-amber-400',
      iconBoxBg: 'bg-amber-400 text-indigo-950',
      badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      tagColor: 'text-amber-300',
      arrowColor: 'text-amber-300',
    },
    {
      id: 'reminders',
      title: 'Namaz Reminders',
      subtitle: 'Set Daily Prayer Alarms & Dhikr Practice Notifications',
      icon: Bell,
      tag: 'Daily Alarms',
      badge: 'Alarms',
      cardGradient: 'from-[#78350F] via-[#451A03] to-[#1C1917]',
      borderStyle: 'border-amber-500/50 hover:border-amber-400',
      iconBoxBg: 'bg-amber-400 text-amber-950',
      badgeBg: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
      tagColor: 'text-amber-300',
      arrowColor: 'text-amber-300',
    },
    {
      id: 'names',
      title: '99 Names of Allah',
      subtitle: 'Asma-ul-Husna with Audio Pronunciation, Urdu Translation & Virtues',
      icon: Star,
      tag: 'Asma-ul-Husna',
      badge: '99 Names',
      cardGradient: 'from-[#065F46] via-[#047857] to-[#022C22]',
      borderStyle: 'border-emerald-300/50 hover:border-amber-300',
      iconBoxBg: 'bg-amber-300 text-emerald-950',
      badgeBg: 'bg-amber-300/20 text-amber-200 border-amber-300/40',
      tagColor: 'text-amber-200',
      arrowColor: 'text-amber-300',
    },
    {
      id: 'duas',
      title: 'Daily Duas & Azkar',
      subtitle: 'Morning & Evening Remembrances, Sleeping & Travel Supplications',
      icon: Heart,
      tag: 'Daily Masnoon',
      badge: 'Azkar',
      cardGradient: 'from-[#4C1D95] via-[#3B0764] to-[#1E1B4B]',
      borderStyle: 'border-purple-400/50 hover:border-purple-300',
      iconBoxBg: 'bg-purple-300 text-purple-950',
      badgeBg: 'bg-purple-300/20 text-purple-200 border-purple-300/40',
      tagColor: 'text-purple-300',
      arrowColor: 'text-purple-300',
    },
    {
      id: 'calendar',
      title: 'Islamic Calendar & Ramadan',
      subtitle: 'Hijri Date, Ramadan Fast Tracker & Major Sacred Events',
      icon: Calendar,
      tag: 'Hijri & Fasting',
      badge: 'Calendar',
      cardGradient: 'from-[#9F1239] via-[#881337] to-[#4C0519]',
      borderStyle: 'border-rose-300/50 hover:border-amber-300',
      iconBoxBg: 'bg-amber-300 text-rose-950',
      badgeBg: 'bg-amber-300/20 text-amber-200 border-amber-300/40',
      tagColor: 'text-amber-200',
      arrowColor: 'text-amber-300',
    },
    {
      id: 'backup',
      title: 'Offline Data Backup',
      subtitle: 'Export & Restore your Bookmarks and Settings as local JSON file',
      icon: Database,
      tag: 'Local JSON',
      badge: 'Storage',
      cardGradient: 'from-[#1E293B] via-[#0F172A] to-[#020617]',
      borderStyle: 'border-slate-400/50 hover:border-slate-200',
      iconBoxBg: 'bg-slate-200 text-slate-900',
      badgeBg: 'bg-slate-200/20 text-slate-200 border-slate-300/40',
      tagColor: 'text-slate-300',
      arrowColor: 'text-slate-200',
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
              Tap any colored card below to explore Quran Paak, Manzil, Punch Surahs, Digital Tasbeeh, and Namaz Times.
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
          <span className="text-xs text-gray-600 font-semibold bg-emerald-100 px-2.5 py-1 rounded-full text-[#064E3B]">
            Tap any card to open
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`group text-left p-5 rounded-3xl bg-gradient-to-br ${item.cardGradient} border ${item.borderStyle} shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden text-white`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${item.iconBoxBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.badgeBg}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                  <span className={item.tagColor}>{item.tag}</span>
                  <div className={`flex items-center gap-1.5 ${item.arrowColor} group-hover:translate-x-1 transition-transform`}>
                    <span className="text-xs uppercase tracking-wider">Open</span>
                    <ArrowRight className="w-4 h-4" />
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

