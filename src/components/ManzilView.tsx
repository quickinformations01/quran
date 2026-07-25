import React, { useState } from 'react';
import { Shield, Sparkles, Volume2, Copy, Check, Play, Pause, Info, HeartHandshake } from 'lucide-react';
import { MANZIL_VERSES } from '../data/manzilData';
import { AppSettings } from '../types';

interface Props {
  settings: AppSettings;
  currentlyPlayingAudio: string | null;
  setCurrentlyPlayingAudio: (url: string | null) => void;
}

export const ManzilView: React.FC<Props> = ({
  settings,
  currentlyPlayingAudio,
  setCurrentlyPlayingAudio
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyManzil = (arabic: string, translation: string, id: number) => {
    const text = `${arabic}\n\n"${translation}"\n[Manzil Verses - Protection & Healing]`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold w-fit mb-3">
          <Shield className="w-3.5 h-3.5" /> Daily Protection & Healing
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mb-2">
          Manzil (المنزل)
        </h2>
        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
          A collection of 33 sacred Quranic verses compiled for daily morning and evening recitation. Protects against evil eye, magic, anxiety, sickness, and negative influences.
        </p>
      </div>

      {/* Verses Cards */}
      <div className="space-y-4">
        {MANZIL_VERSES.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-5 bg-white border border-gray-200/90 shadow-sm space-y-4"
          >
            {/* Verse Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-base font-bold font-serif text-[#064E3B]">
                  {item.surahName}
                </span>
                <span className="text-xs text-[#b45309] font-medium block">
                  Verses {item.versesRange}
                </span>
              </div>

              <button
                onClick={() => copyManzil(item.arabic, item.translation, item.id)}
                className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                title="Copy Verse"
              >
                {copiedId === item.id ? <Check className="w-4 h-4 text-[#064E3B]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Arabic Text */}
            <p
              className="text-right text-gray-900 leading-loose tracking-wide dir-rtl font-serif"
              style={{
                fontFamily: settings.arabicFontFamily,
                fontSize: `${settings.arabicFontSize + 2}px`,
              }}
            >
              {item.arabic}
            </p>

            {/* English Translation */}
            {settings.showTranslation && (
              <p className="text-sm text-gray-700 leading-relaxed font-sans pt-2 border-t border-gray-100">
                {item.translation}
              </p>
            )}

            {/* Urdu Translation */}
            {settings.showUrdu && item.urduTranslation && (
              <p className="text-sm text-[#064E3B] leading-relaxed font-serif text-right dir-rtl font-semibold">
                {item.urduTranslation}
              </p>
            )}

            {/* Protective Note */}
            {item.note && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FDFCF0] border border-[#D4AF37]/30 text-xs text-gray-800">
                <Info className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5" />
                <span>{item.note}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
