import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, BookOpen, Play, Pause, ArrowLeft, ArrowRight, Copy, Check, Info } from 'lucide-react';
import { PUNCH_SURAHS } from '../data/punchSurahData';
import { fetchFullSurahText } from '../data/quranData';
import { DetailedSurah, AppSettings } from '../types';

interface Props {
  settings: AppSettings;
  currentlyPlayingAudio: string | null;
  setCurrentlyPlayingAudio: (url: string | null) => void;
}

export const PunchSurahView: React.FC<Props> = ({
  settings,
  currentlyPlayingAudio,
  setCurrentlyPlayingAudio
}) => {
  const [selectedSurahNum, setSelectedSurahNum] = useState<number | null>(null);
  const [detailedSurah, setDetailedSurah] = useState<DetailedSurah | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);
  const [audioObj, setAudioObj] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!selectedSurahNum) {
      setDetailedSurah(null);
      return;
    }

    setLoading(true);
    fetchFullSurahText(selectedSurahNum)
      .then((data) => {
        setDetailedSurah(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching punch surah:', err);
        setLoading(false);
      });
  }, [selectedSurahNum]);

  const activePunchMeta = PUNCH_SURAHS.find((p) => p.surahNumber === selectedSurahNum);

  const playVerseAudio = (url: string | undefined, index: number) => {
    if (!url) return;

    if (currentlyPlayingAudio === url) {
      if (audioObj) audioObj.pause();
      setCurrentlyPlayingAudio(null);
      setActiveAudioIndex(null);
    } else {
      if (audioObj) audioObj.pause();
      const newAud = new Audio(url);
      newAud.play().catch((e) => console.warn(e));
      newAud.onended = () => {
        setCurrentlyPlayingAudio(null);
        setActiveAudioIndex(null);
      };
      setAudioObj(newAud);
      setCurrentlyPlayingAudio(url);
      setActiveAudioIndex(index);
    }
  };

  // Detailed Surah View
  if (selectedSurahNum && activePunchMeta) {
    return (
      <div className="space-y-6 pb-24">
        {/* Top Header */}
        <div className="sticky top-14 z-30 bg-[#064E3B] text-white py-3 px-4 rounded-2xl border border-[#D4AF37]/30 shadow-md flex items-center justify-between">
          <button
            onClick={() => {
              if (audioObj) audioObj.pause();
              setCurrentlyPlayingAudio(null);
              setSelectedSurahNum(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#D4AF37] font-bold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> All Punch Surahs
          </button>

          <div className="text-center">
            <h2 className="text-base sm:text-lg font-serif font-bold text-white">
              {activePunchMeta.title} ({activePunchMeta.arabicTitle})
            </h2>
          </div>

          <div className="w-16" />
        </div>

        {/* Virtue Banner */}
        <div className="p-4 rounded-2xl bg-[#FDFCF0] border border-[#D4AF37]/40 text-gray-800 text-xs sm:text-sm leading-relaxed flex items-start gap-3 shadow-sm">
          <Sparkles className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-[#064E3B] mb-1">Hadith Virtues (Fazail):</span>
            <span>{activePunchMeta.virtue}</span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 mx-auto border-3 border-[#064E3B] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#064E3B] font-semibold text-sm">Loading Surah Verses...</p>
          </div>
        ) : detailedSurah ? (
          <div className="space-y-4">
            {/* Bismillah */}
            {detailedSurah.bismillahPre && (
              <div className="py-6 px-4 text-center rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm my-4">
                <p 
                  className="text-2xl sm:text-3xl text-[#064E3B] font-serif"
                  style={{ fontFamily: settings.arabicFontFamily }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {detailedSurah.verses.map((v, idx) => {
              const isPlaying = activeAudioIndex === idx;
              return (
                <div
                  key={v.numberInSurah}
                  className={`rounded-2xl p-5 border transition-all ${
                    isPlaying
                      ? 'bg-[#FDFCF0] border-[#D4AF37] shadow-md'
                      : 'bg-white border-gray-200/90 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                    <span className="w-8 h-8 rounded-full bg-[#064E3B] text-[#D4AF37] font-serif text-xs font-bold flex items-center justify-center">
                      {v.numberInSurah}
                    </span>

                    {v.audioUrl && (
                      <button
                        onClick={() => playVerseAudio(v.audioUrl, idx)}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isPlaying
                            ? 'bg-[#D4AF37] text-[#064E3B] font-bold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  <p
                    className="text-right text-gray-900 leading-loose mb-3 dir-rtl font-serif"
                    style={{
                      fontFamily: settings.arabicFontFamily,
                      fontSize: `${settings.arabicFontSize}px`,
                    }}
                  >
                    {v.arabic}
                  </p>

                  {settings.showTranslation && (
                    <p className="text-sm text-gray-700 leading-relaxed font-sans">
                      {v.translation}
                    </p>
                  )}

                  {settings.showUrdu && v.urduTranslation && (
                    <p className="text-sm text-[#064E3B] leading-relaxed font-serif text-right mt-2 dir-rtl font-semibold">
                      {v.urduTranslation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  // Cards List View
  return (
    <div className="space-y-6 pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold w-fit mb-3">
          <Flame className="w-3.5 h-3.5" /> Revere Quranic Chapters
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mb-2">
          Punch Surah (پنج سورہ)
        </h2>
        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
          The 5 essential Surahs recited frequently for immense spiritual blessings, sustenance, forgiveness, and protection in life and the grave.
        </p>
      </div>

      {/* 5 Punch Surahs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PUNCH_SURAHS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedSurahNum(item.surahNumber)}
            className="group relative overflow-hidden rounded-3xl p-6 bg-white border border-gray-200 hover:border-[#D4AF37] hover:bg-[#FDFCF0] transition-all cursor-pointer shadow-sm flex flex-col justify-between gap-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs text-[#b45309] font-bold block mb-1">
                  Surah #{item.surahNumber} • {item.versesCount} Ayahs
                </span>
                <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#064E3B] transition">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.meaning}
                </p>
              </div>

              <span className="text-3xl font-serif text-[#064E3B] group-hover:scale-110 transition">
                {item.arabicTitle}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 leading-relaxed font-sans">
              <span className="font-bold text-[#064E3B] block mb-0.5">Hadith Virtue:</span>
              {item.virtue}
            </div>

            <button className="w-full py-2.5 px-4 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#064E3B]/90 transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Read & Listen Surah</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
