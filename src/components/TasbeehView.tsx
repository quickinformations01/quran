import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Plus, CheckCircle2, Flame, Award } from 'lucide-react';

export const TasbeehView: React.FC = () => {
  const [count, setCount] = useState(0);
  const [totalSession, setTotalSession] = useState(0);
  const [target, setTarget] = useState(33);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedDhikr, setSelectedDhikr] = useState({
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    meaning: 'Glory be to Allah'
  });

  const dhikrList = [
    { arabic: 'سُبْحَانَ اللَّهِ', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah' },
    { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', meaning: 'Praise be to Allah' },
    { arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest' },
    { arabic: 'أَسْتَغْفِرُ اللَّهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah' },
    { arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah' },
    { arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', transliteration: 'Salawat on Prophet (ﷺ)', meaning: 'O Allah send peace upon Prophet Muhammad' },
  ];

  const handleIncrement = () => {
    // Vibration feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Click audio effect
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch (e) {
        /* ignore audio ctx error */
      }
    }

    setCount((prev) => prev + 1);
    setTotalSession((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="space-y-6 pb-24 max-w-xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 text-center shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Digital Dhikr Counter
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-1">
          {selectedDhikr.arabic}
        </h2>
        <p className="text-white font-semibold text-base">
          {selectedDhikr.transliteration}
        </p>
        <p className="text-xs text-emerald-100/80">
          "{selectedDhikr.meaning}"
        </p>
      </div>

      {/* Dhikr Selector Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {dhikrList.map((item) => (
          <button
            key={item.transliteration}
            onClick={() => {
              setSelectedDhikr(item);
              setCount(0);
            }}
            className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
              selectedDhikr.transliteration === item.transliteration
                ? 'bg-[#064E3B] text-white border-[#D4AF37] font-bold shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:border-[#064E3B]'
            }`}
          >
            {item.transliteration}
          </button>
        ))}
      </div>

      {/* Target & Sound Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-200 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-semibold">Target Loop:</span>
          {[33, 100, 500].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t);
                setCount(0);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                target === t ? 'bg-[#064E3B] text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#064E3B] border border-gray-200 cursor-pointer"
          title="Toggle Click Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
        </button>
      </div>

      {/* Giant Interactive Tap Area */}
      <div className="text-center space-y-4">
        <button
          onClick={handleIncrement}
          className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#064E3B] border-8 border-[#D4AF37] shadow-xl hover:scale-102 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group select-none"
        >
          {/* Circular Progress Ring Effect */}
          <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
            Tap to Count
          </div>
          <span className="text-5xl sm:text-6xl font-mono font-bold text-white tracking-wider group-active:text-[#D4AF37]">
            {count}
          </span>
          <span className="text-xs text-emerald-100/90 mt-2 font-medium">
            Goal: {target} ({progressPercent}%)
          </span>
        </button>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
            <span>Reset Loop</span>
          </button>

          <div className="px-4 py-2 rounded-xl bg-[#064E3B]/10 border border-[#064E3B]/20 text-[#064E3B] text-xs font-bold flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Total Recited: {totalSession}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
