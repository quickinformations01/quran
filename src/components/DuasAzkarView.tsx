import React, { useState } from 'react';
import { Sparkles, Search, Bookmark, Copy, Check, Volume2, Shield, Heart } from 'lucide-react';

interface DuaItem {
  id: string;
  category: string;
  title: string;
  arabic: string;
  transliteration: string;
  urdu: string;
  english: string;
  reference: string;
  countTarget?: number;
}

const DUAS_DATA: DuaItem[] = [
  // Morning Azkar
  {
    id: 'm1',
    category: 'Morning Azkar',
    title: 'Ayat al-Kursi (Morning Protection)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...',
    transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum...',
    urdu: 'اللہ کے سوا کوئی معبود نہیں۔ وہ زندہ ہے، سب کا سنبھالنے والا ہے...',
    english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence...',
    reference: 'Surah Al-Baqarah 2:255 (Recite 1x)',
    countTarget: 1,
  },
  {
    id: 'm2',
    category: 'Morning Azkar',
    title: 'Sayyidul Istighfar (Chief Dua for Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana ‘abduka...',
    urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں...',
    english: 'O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant...',
    reference: 'Sahih Al-Bukhari (Recite 1x Morning & Evening)',
    countTarget: 1,
  },
  {
    id: 'm3',
    category: 'Morning Azkar',
    title: 'Protection from All Harm',
    arabic: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahil-ladhi la yadurru ma’as-mihi shai’un fil-ardi wa la fis-sama’i wa Huwas-Sami’ul-‘Aleem.',
    urdu: 'اللہ کے نام کے ساتھ، جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی...',
    english: 'In the Name of Allah with Whose Name nothing can cause harm in the earth nor in the heavens...',
    reference: 'Sunan Abu Dawud & At-Tirmidhi (Recite 3x)',
    countTarget: 3,
  },

  // Evening Azkar
  {
    id: 'e1',
    category: 'Evening Azkar',
    title: 'Protection of Divine Words',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A’udhu bikalimatil-lahit-tammati min sharri ma khalaq.',
    urdu: 'میں اللہ کے مکمل کلمات کی پناہ مانگتا ہوں اس کی تمام مخلوق کے شر سے۔',
    english: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    reference: 'Sahih Muslim (Recite 3x in Evening)',
    countTarget: 3,
  },
  {
    id: 'e2',
    category: 'Evening Azkar',
    title: 'Pleasure with Allah & Islam',
    arabic: 'رَضِيتُ بِاللهِ رَبَّاً وَبِالإِسْلاَمِ دِيناً وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيَّاً',
    transliteration: 'Radeetu billahi Rabban, wa bil-Islami deenan, wa bi-Muhammadin sallallahu alayhi wa sallama Nabiyya.',
    urdu: 'میں اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد ﷺ کے نبی ہونے پر راضی ہوں۔',
    english: 'I am pleased with Allah as my Lord, Islam as my religion and Muhammad (pbuh) as my Prophet.',
    reference: 'Sunan Abu Dawud (Recite 3x Morning & Evening)',
    countTarget: 3,
  },

  // Daily Life Duas
  {
    id: 'd1',
    category: 'Daily Life',
    title: 'Dua Before Sleep',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika-Allahumma amutu wa ahya.',
    urdu: 'اے اللہ! تیری ہی نام کے ساتھ میں مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں۔',
    english: 'In Your Name, O Allah, I die and I live.',
    reference: 'Sahih Al-Bukhari',
    countTarget: 1,
  },
  {
    id: 'd2',
    category: 'Daily Life',
    title: 'Dua Upon Waking Up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-ladhi ahyana ba’da ma amatana wa ilaihin-nushur.',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف لوٹنا ہے۔',
    english: 'All praise is due to Allah who gave us life after having taken it from us and unto Him is the resurrection.',
    reference: 'Sahih Al-Bukhari',
    countTarget: 1,
  },
  {
    id: 'd3',
    category: 'Daily Life',
    title: 'Dua for Travel (Safar)',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen. Wa inna ila Rabbina lamunqaliboon.',
    urdu: 'پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے تابع کر دیا اور ہم خود اسے قابو میں لانے والے نہ تھے...',
    english: 'Glory be to Him Who has subjected this to us, though we were not capable of it by ourselves...',
    reference: 'Surah Az-Zukhruf 43:13-14',
    countTarget: 1,
  },
  {
    id: 'd4',
    category: 'Daily Life',
    title: 'Dua for Entering Mosque',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allahummaf-tah li abwaba rahmatik.',
    urdu: 'اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔',
    english: 'O Allah, open for me the doors of Your mercy.',
    reference: 'Sahih Muslim',
    countTarget: 1,
  },

  // Protection & Relief
  {
    id: 'p1',
    category: 'Protection & Relief',
    title: 'Dua of Yunus (AS) in Distress',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta Subhanaka inni kuntu minaz-zalimeen.',
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بیشک میں ہی ظالموں میں سے تھا۔',
    english: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya 21:87',
    countTarget: 100,
  },
];

export const DuasAzkarView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const categories = ['All', 'Morning Azkar', 'Evening Azkar', 'Daily Life', 'Protection & Relief'];

  const handleCopy = (dua: DuaItem) => {
    const textToCopy = `${dua.title}\n${dua.arabic}\n${dua.transliteration}\nUrdu: ${dua.urdu}\nEnglish: ${dua.english}\nRef: ${dua.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleIncrement = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const filteredDuas = DUAS_DATA.filter((dua) => {
    const matchesCategory = selectedCategory === 'All' || dua.category === selectedCategory;
    const matchesSearch =
      dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dua.urdu.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#D4AF37]/40 p-6 sm:p-8 text-white border border-[#D4AF37]/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Fortress of the Muslim (الأذكار والأدعية)
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">Daily Duas & Authentic Azkar</h1>
        <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-sans max-w-2xl">
          Complete collection of Sunnah morning/evening remembrances, daily life supplications, and relief prayers with built-in counters.
        </p>

        {/* Categories Pills */}
        <div className="pt-2 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#064E3B] shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search duas by title, meaning, or keywords..."
          className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#064E3B] shadow-sm"
        />
      </div>

      {/* Duas List */}
      <div className="space-y-4">
        {filteredDuas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-200">
            <p className="text-gray-500 text-sm font-medium">No supplications found matching your search.</p>
          </div>
        ) : (
          filteredDuas.map((dua) => {
            const currentCount = counts[dua.id] || 0;
            return (
              <div
                key={dua.id}
                className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:border-[#064E3B] transition-all space-y-4"
              >
                {/* Header Title & Tag */}
                <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-100">
                      {dua.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900 mt-2">
                      {dua.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(dua)}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-emerald-50 hover:text-[#064E3B] text-gray-600 transition cursor-pointer shrink-0"
                    title="Copy Supplication"
                  >
                    {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Arabic Text */}
                <p className="text-2xl sm:text-3xl font-serif text-[#064E3B] font-bold text-right leading-relaxed dir-rtl py-2">
                  {dua.arabic}
                </p>

                {/* Transliteration */}
                <p className="text-xs font-semibold text-gray-700 italic font-sans bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  {dua.transliteration}
                </p>

                {/* Urdu & English Translations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#FDFCF0] p-3 rounded-2xl border border-[#D4AF37]/30">
                    <p className="text-[10px] text-[#064E3B] font-bold uppercase mb-1">اردو ترجمہ</p>
                    <p className="font-serif text-sm text-gray-800 font-bold leading-relaxed">{dua.urdu}</p>
                  </div>

                  <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
                    <p className="text-[10px] text-[#064E3B] font-bold uppercase mb-1">English Translation</p>
                    <p className="font-sans text-xs text-gray-700 leading-relaxed">{dua.english}</p>
                  </div>
                </div>

                {/* Footer Count & Reference */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-gray-500 border-t border-gray-100">
                  <span>Ref: {dua.reference}</span>

                  {dua.countTarget && (
                    <button
                      type="button"
                      onClick={() => handleIncrement(dua.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#064E3B] text-[#D4AF37] font-bold text-xs hover:scale-105 active:scale-95 transition cursor-pointer shadow-md"
                    >
                      <span>Tap Dhikr Counter:</span>
                      <span className="bg-[#D4AF37] text-[#064E3B] px-2 py-0.5 rounded-lg font-mono">
                        {currentCount} / {dua.countTarget}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
