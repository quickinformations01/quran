import React, { useState } from 'react';
import { Calendar as CalendarIcon, Sparkles, Moon, Sun, CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { getHijriDate } from '../utils/prayerCalculator';

interface IslamicEvent {
  title: string;
  arabicTitle: string;
  date: string;
  description: string;
  badge: string;
}

const ISLAMIC_EVENTS: IslamicEvent[] = [
  { title: '1st Ramadan (Holy Month)', arabicTitle: 'بداية شهر رمضان المبارك', date: '1 Ramadan 1448 AH', description: 'Start of obligatory fasting month for Muslims worldwide.', badge: 'Fasting' },
  { title: 'Laylatul Qadr (Night of Power)', arabicTitle: 'ليلة القدر', date: '27 Ramadan 1448 AH', description: 'The blessed night in which the Quran was revealed.', badge: 'Blessed Night' },
  { title: 'Eid-ul-Fitr', arabicTitle: 'عيد الفطر المبارك', date: '1 Shawwal 1448 AH', description: 'Celebration marking the conclusion of the fasting month of Ramadan.', badge: 'Eid' },
  { title: 'Day of Arafah', arabicTitle: 'يوم عرفة', date: '9 Dhul Hijjah 1448 AH', description: 'Peak day of Hajj pilgrimage. Fasting on this day expiates sins of two years.', badge: 'Virtuous Day' },
  { title: 'Eid-ul-Adha', arabicTitle: 'عيد الأضحى', date: '10 Dhul Hijjah 1448 AH', description: 'Festival of Sacrifice honoring Prophet Ibrahim’s (AS) devotion.', badge: 'Eid' },
  { title: 'Islamic New Year (1st Muharram)', arabicTitle: 'رأس السنة الهجرية', date: '1 Muharram 1449 AH', description: 'Beginning of the new Hijri lunar calendar year.', badge: 'New Year' },
  { title: 'Day of Ashura', arabicTitle: 'يوم عاشوراء', date: '10 Muharram 1449 AH', description: 'Sunnah fast day commemorating Prophet Musa’s (AS) salvation from Pharaoh.', badge: 'Sunnah Fast' },
  { title: 'Mawlid-un-Nabi (Prophet’s Birthday)', arabicTitle: 'مولد النبي ﷺ', date: '12 Rabi-ul-Awwal 1449 AH', description: 'Commemorating the birth of Prophet Muhammad ﷺ.', badge: 'Prophetic Event' },
];

export const IslamicCalendarView: React.FC = () => {
  const currentHijri = getHijriDate();
  const [fastsCompleted, setFastsCompleted] = useState<number>(() => {
    const saved = localStorage.getItem('alquran_fasts_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const toggleFastDay = (day: number) => {
    let newCount = fastsCompleted;
    if (day <= fastsCompleted) {
      newCount = Math.max(0, fastsCompleted - 1);
    } else {
      newCount = Math.min(30, fastsCompleted + 1);
    }
    setFastsCompleted(newCount);
    localStorage.setItem('alquran_fasts_count', newCount.toString());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Banner Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#831843] via-[#4C0519] to-[#2E020E] p-6 sm:p-8 text-white border border-rose-400/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs uppercase tracking-wider">
          <CalendarIcon className="w-4 h-4" /> Hijri Lunar Calendar & Ramadan Companion
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-rose-500/30 pb-4">
          <div>
            <span className="text-xs text-rose-200 font-medium">Today’s Hijri Date:</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 mt-0.5">
              {currentHijri}
            </h1>
          </div>

          <div className="bg-black/30 backdrop-blur border border-rose-400/30 px-4 py-2.5 rounded-2xl text-center">
            <p className="text-[10px] text-rose-200 uppercase font-bold tracking-wider">Gregorian Calendar</p>
            <p className="text-sm font-bold text-white font-mono mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Ramadan Fasting Tracker Card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-rose-300/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Moon className="w-4 h-4" /> Ramadan Fasting Tracker (30 Days)
            </span>
            <span className="bg-amber-400 text-rose-950 px-2.5 py-0.5 rounded-full text-[11px] font-mono">
              Completed: {fastsCompleted} / 30 Fasts
            </span>
          </div>

          {/* Grid of 30 Fasting Days */}
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 pt-1">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const isDone = day <= fastsCompleted;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleFastDay(day)}
                  className={`p-2 rounded-xl text-center text-xs font-bold transition cursor-pointer flex flex-col items-center justify-center ${
                    isDone
                      ? 'bg-amber-400 text-rose-950 border border-amber-300 shadow-sm'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                  }`}
                  title={`Fast Day ${day}`}
                >
                  <span className="text-[10px] opacity-75">Day</span>
                  <span className="text-xs font-mono">{day}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Islamic Events Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#064E3B]" /> Major Islamic Events & Sacred Dates
          </h2>
          <span className="text-xs text-gray-500 font-medium">100% Offline Hijri Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ISLAMIC_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm hover:border-[#064E3B] transition-all space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#064E3B]">
                  {event.badge}
                </span>
                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                  {event.date}
                </span>
              </div>

              <h3 className="text-base font-serif font-bold text-gray-900">
                {event.title}
              </h3>
              <p className="text-sm font-serif font-bold text-[#064E3B] dir-rtl text-right">
                {event.arabicTitle}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
