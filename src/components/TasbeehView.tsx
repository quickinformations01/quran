import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, Award, BellRing, Trophy, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { playClickSound, playCompletionAlarm } from '../utils/soundEffects';

export const TasbeehView: React.FC = () => {
  const [count, setCount] = useState(0);
  const [totalSession, setTotalSession] = useState(0);
  const [target, setTarget] = useState<number>(33);
  const [customTargetInput, setCustomTargetInput] = useState<string>('');
  const [showCustomTargetModal, setShowCustomTargetModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

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

  const presetTargets = [33, 100, 300, 313, 500, 1000];

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setTotalSession((prev) => prev + 1);

    // Vibration feedback on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Check if target reached
    if (nextCount === target) {
      if (soundEnabled) {
        playCompletionAlarm();
      }
      setShowCompletionModal(true);
    } else if (soundEnabled) {
      playClickSound();
    }
  };

  const handleReset = () => {
    setCount(0);
    setShowCompletionModal(false);
  };

  const handleSetCustomTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customTargetInput, 10);
    if (val && val > 0) {
      setTarget(val);
      setCount(0);
      setShowCustomTargetModal(false);
      setCustomTargetInput('');
    }
  };

  const progressPercent = Math.min(100, Math.round((count / target) * 100));

  return (
    <div className="space-y-6 pb-24 max-w-xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 text-center shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Digital Tasbeeh Counter
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-1">
          {selectedDhikr.arabic}
        </h2>
        <p className="text-white font-semibold text-base">
          {selectedDhikr.transliteration}
        </p>
        <p className="text-xs text-emerald-100/80 mt-0.5">
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

      {/* Target Selector Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-[#b45309]" /> Target Dhikr Count:
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-[#064E3B] border border-gray-200 cursor-pointer flex items-center gap-1 font-semibold text-[11px]"
            title="Toggle Sound"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#064E3B]" /> Sound On
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" /> Muted
              </>
            )}
          </button>
        </div>

        {/* Target Buttons Grid: 33, 100, 300, 313, 500, 1000 & Custom */}
        <div className="flex flex-wrap gap-1.5">
          {presetTargets.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTarget(t);
                setCount(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                target === t
                  ? 'bg-[#064E3B] text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
          <button
            onClick={() => setShowCustomTargetModal(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#D4AF37]/20 text-[#064E3B] hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 flex items-center gap-1 cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3" /> Custom
          </button>
        </div>
      </div>

      {/* Giant Interactive Tap Area */}
      <div className="text-center space-y-4">
        <button
          onClick={handleIncrement}
          className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#064E3B] border-8 border-[#D4AF37] shadow-xl hover:scale-102 active:scale-95 transition-all flex flex-col items-center justify-center cursor-pointer group select-none"
        >
          {/* Progress Indicator Ring */}
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

      {/* Custom Target Modal */}
      {showCustomTargetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-gray-200 text-gray-900 space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#064E3B]" /> Set Custom Target
            </h3>
            <p className="text-xs text-gray-600">
              Enter any target number for your Tasbeeh (e.g. 70, 300, 1000, 3000):
            </p>
            <form onSubmit={handleSetCustomTarget} className="space-y-3">
              <input
                type="number"
                min="1"
                placeholder="Target count..."
                value={customTargetInput}
                onChange={(e) => setCustomTargetInput(e.target.value)}
                className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 font-mono font-bold text-lg focus:outline-none focus:border-[#064E3B]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomTargetModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white text-xs font-bold hover:bg-[#064E3B]/90 shadow-sm"
                >
                  Apply Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Goal Completion Alarm Celebration Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#064E3B] text-white border border-[#D4AF37] rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] animate-bounce">
              <BellRing className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#D4AF37] text-[#064E3B] text-xs font-extrabold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" /> Target Completed!
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">
              MashaAllah! 🎉
            </h3>

            <p className="text-sm text-emerald-100/90 leading-relaxed font-sans">
              You have successfully completed your target of <strong className="text-white font-mono text-base">{target}</strong> recitations of <strong>{selectedDhikr.transliteration}</strong>!
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-2xl bg-[#D4AF37] hover:bg-amber-400 text-[#064E3B] font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Start New Loop
              </button>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition cursor-pointer"
              >
                Keep Counting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
