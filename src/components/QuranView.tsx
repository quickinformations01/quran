import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, Volume2, Bookmark, Share2, Copy, Check, 
  ArrowLeft, ArrowRight, Play, Pause, Sliders, Sparkles, Filter 
} from 'lucide-react';
import { SURAH_INDEX, fetchFullSurahText } from '../data/quranData';
import { SurahMeta, DetailedSurah, Verse, AppSettings, Bookmark as BookmarkType } from '../types';

interface Props {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  currentlyPlayingAudio: string | null;
  setCurrentlyPlayingAudio: (url: string | null) => void;
  bookmarks: BookmarkType[];
  setBookmarks: React.Dispatch<React.SetStateAction<BookmarkType[]>>;
}

export const QuranView: React.FC<Props> = ({
  settings,
  setSettings,
  currentlyPlayingAudio,
  setCurrentlyPlayingAudio,
  bookmarks,
  setBookmarks
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Meccan' | 'Medinan'>('All');
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [currentDetailedSurah, setCurrentDetailedSurah] = useState<DetailedSurah | null>(null);
  const [loadingSurah, setLoadingSurah] = useState(false);
  const [copiedVerseNum, setCopiedVerseNum] = useState<number | null>(null);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [activeVerseAudioIndex, setActiveVerseAudioIndex] = useState<number | null>(null);

  // Load detailed surah when selectedSurahNumber changes
  useEffect(() => {
    if (selectedSurahNumber === null) {
      setCurrentDetailedSurah(null);
      return;
    }

    setLoadingSurah(true);
    fetchFullSurahText(selectedSurahNumber)
      .then((data) => {
        setCurrentDetailedSurah(data);
        setLoadingSurah(false);
      })
      .catch((err) => {
        console.error('Error fetching surah:', err);
        setLoadingSurah(false);
      });
  }, [selectedSurahNumber]);

  // Filter surahs
  const filteredSurahs = SURAH_INDEX.filter((s) => {
    const matchesSearch =
      s.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.includes(searchQuery) ||
      s.number.toString() === searchQuery.trim();

    const matchesType = filterType === 'All' || s.revelationType === filterType;

    return matchesSearch && matchesType;
  });

  // Play audio for verse
  const playVerseAudio = (verse: Verse, index: number) => {
    if (!verse.audioUrl) return;

    if (currentlyPlayingAudio === verse.audioUrl) {
      if (audioRef) {
        audioRef.pause();
      }
      setCurrentlyPlayingAudio(null);
      setActiveVerseAudioIndex(null);
    } else {
      if (audioRef) {
        audioRef.pause();
      }
      const newAudio = new Audio(verse.audioUrl);
      newAudio.play().catch((err) => console.log('Audio playback error:', err));
      newAudio.onended = () => {
        setCurrentlyPlayingAudio(null);
        setActiveVerseAudioIndex(null);
      };
      setAudioRef(newAudio);
      setCurrentlyPlayingAudio(verse.audioUrl);
      setActiveVerseAudioIndex(index);
    }
  };

  // Bookmark toggle
  const toggleBookmark = (surahNumber: number, surahName: string, verseNumber: number) => {
    const exists = bookmarks.some(
      (b) => b.surahNumber === surahNumber && b.verseNumber === verseNumber
    );

    if (exists) {
      setBookmarks(bookmarks.filter((b) => !(b.surahNumber === surahNumber && b.verseNumber === verseNumber)));
    } else {
      setBookmarks([...bookmarks, { surahNumber, surahName, verseNumber, timestamp: Date.now() }]);
    }
  };

  const copyVerse = (arabic: string, translation: string, verseNum: number) => {
    const text = `${arabic}\n\n"${translation}"\n[Surah ${currentDetailedSurah?.transliteration} ${currentDetailedSurah?.number}:${verseNum}]`;
    navigator.clipboard.writeText(text);
    setCopiedVerseNum(verseNum);
    setTimeout(() => setCopiedVerseNum(null), 1500);
  };

  // If a surah is selected, render the Surah Reader
  if (selectedSurahNumber !== null) {
    return (
      <div className="space-y-6 pb-24">
        {/* Top Sticky Surah Header Bar */}
        <div className="sticky top-14 z-30 bg-[#064E3B] text-white py-3 px-4 rounded-2xl border border-[#D4AF37]/30 shadow-md flex items-center justify-between gap-2">
          <button
            onClick={() => {
              if (audioRef) audioRef.pause();
              setCurrentlyPlayingAudio(null);
              setSelectedSurahNumber(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#D4AF37] font-bold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Index
          </button>

          {currentDetailedSurah && (
            <div className="text-center">
              <h2 className="text-base sm:text-lg font-serif font-bold text-white leading-tight">
                {currentDetailedSurah.transliteration} ({currentDetailedSurah.name})
              </h2>
              <span className="text-[11px] text-emerald-100/80">
                Surah #{currentDetailedSurah.number} • {currentDetailedSurah.versesCount} Verses • {currentDetailedSurah.revelationType}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedSurahNumber(Math.max(1, selectedSurahNumber - 1))}
              disabled={selectedSurahNumber <= 1}
              className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-40"
              title="Previous Surah"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSelectedSurahNumber(Math.min(114, selectedSurahNumber + 1))}
              disabled={selectedSurahNumber >= 114}
              className="p-1.5 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-40"
              title="Next Surah"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {loadingSurah ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 mx-auto border-3 border-[#064E3B] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#064E3B] font-semibold text-sm">Loading Holy Quran Text...</p>
          </div>
        ) : currentDetailedSurah ? (
          <div className="space-y-6">
            {/* Bismillah Header */}
            {currentDetailedSurah.bismillahPre && (
              <div className="py-6 px-4 text-center rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm my-4">
                <p 
                  className="text-2xl sm:text-3xl text-[#064E3B] font-serif"
                  style={{ fontFamily: settings.arabicFontFamily }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-xs text-gray-600 mt-2 font-sans">
                  In the name of Allah, the Entirely Merciful, the Especially Merciful
                </p>
              </div>
            )}

            {/* Verses List */}
            <div className="space-y-4">
              {currentDetailedSurah.verses.map((v, idx) => {
                const isBookmarked = bookmarks.some(
                  (b) => b.surahNumber === currentDetailedSurah.number && b.verseNumber === v.numberInSurah
                );
                const isPlaying = activeVerseAudioIndex === idx;

                return (
                  <div
                    key={v.numberInSurah}
                    className={`rounded-2xl p-5 border transition-all ${
                      isPlaying
                        ? 'bg-[#FDFCF0] border-[#D4AF37] shadow-md'
                        : 'bg-white border-gray-200/90 shadow-sm hover:border-gray-300'
                    }`}
                  >
                    {/* Verse Toolbar Top */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#064E3B] text-[#D4AF37] font-serif text-xs font-bold flex items-center justify-center">
                          {v.numberInSurah}
                        </span>
                        <span className="text-xs text-gray-500 font-semibold">
                          Ayah {v.numberInSurah}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {v.audioUrl && (
                          <button
                            onClick={() => playVerseAudio(v, idx)}
                            className={`p-2 rounded-xl transition cursor-pointer ${
                              isPlaying
                                ? 'bg-[#D4AF37] text-[#064E3B] font-bold'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            title="Play Verse Audio"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                        )}

                        <button
                          onClick={() => toggleBookmark(currentDetailedSurah.number, currentDetailedSurah.transliteration, v.numberInSurah)}
                          className={`p-2 rounded-xl transition cursor-pointer ${
                            isBookmarked
                              ? 'bg-[#D4AF37]/20 text-[#b45309]'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          title="Bookmark Verse"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#b45309]' : ''}`} />
                        </button>

                        <button
                          onClick={() => copyVerse(v.arabic, v.translation, v.numberInSurah)}
                          className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                          title="Copy Verse"
                        >
                          {copiedVerseNum === v.numberInSurah ? <Check className="w-4 h-4 text-[#064E3B]" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Verse Text */}
                    <p
                      className="text-right text-gray-900 leading-loose mb-4 tracking-wide dir-rtl font-serif"
                      style={{
                        fontFamily: settings.arabicFontFamily,
                        fontSize: `${settings.arabicFontSize}px`,
                      }}
                    >
                      {v.arabic}
                    </p>

                    {/* English Translation */}
                    {settings.showTranslation && v.translation && (
                      <p className="text-sm text-gray-700 leading-relaxed font-sans mb-2">
                        {v.translation}
                      </p>
                    )}

                    {/* Urdu Translation */}
                    {settings.showUrdu && v.urduTranslation && (
                      <p className="text-sm text-[#064E3B] leading-relaxed font-serif text-right mt-2 dir-rtl font-semibold">
                        {v.urduTranslation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // Surah Index View
  return (
    <div className="space-y-6 pb-24">
      {/* Search & Revelation Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Surah by Name, Meaning or Number (1-114)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#064E3B] text-sm shadow-sm transition"
          />
        </div>

        {/* Revelation Type Filter Tabs */}
        <div className="flex items-center gap-2">
          {(['All', 'Meccan', 'Medinan'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                filterType === type
                  ? 'bg-[#064E3B] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Surah List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSurahs.map((surah) => (
          <div
            key={surah.number}
            onClick={() => setSelectedSurahNumber(surah.number)}
            className="group relative overflow-hidden rounded-2xl p-4 bg-white border border-gray-200 hover:border-[#D4AF37] hover:bg-[#FDFCF0] transition-all cursor-pointer shadow-sm flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-white font-serif text-sm font-bold flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-[#064E3B] transition">
                {surah.number}
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-gray-900 group-hover:text-[#064E3B] transition">
                  {surah.transliteration}
                </h3>
                <p className="text-xs text-gray-500">
                  {surah.englishMeaning} • {surah.versesCount} Ayahs
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-serif text-[#064E3B] group-hover:scale-105 transition block font-bold">
                {surah.name}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                {surah.revelationType}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
