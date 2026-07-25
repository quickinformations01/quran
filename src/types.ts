export type FiqhSchool = 'Hanafi' | 'Shafi'; // Hanafi (Asr shadow ratio 2:1), Shafi/Maliki/Hanbali (Asr shadow ratio 1:1)

export type CalculationMethodName = 
  | 'Karachi' 
  | 'ISNA' 
  | 'MWL' 
  | 'Makkah' 
  | 'Egyptian' 
  | 'Dubai' 
  | 'Qatar' 
  | 'Kuwait' 
  | 'Singapore' 
  | 'Tehran' 
  | 'Turkey';

export interface PrayerTimeSlot {
  id: string;
  name: string;
  arabicName: string;
  time: string; // HH:mm AM/PM
  rawDate: Date;
  isNext: boolean;
  isPassed: boolean;
}

export interface LocationData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  isCustomGPS?: boolean;
}

export interface SurahMeta {
  number: number;
  name: string;
  transliteration: string;
  englishMeaning: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  juzStart: number;
}

export interface Verse {
  numberInSurah: number;
  arabic: string;
  transliteration?: string;
  translation: string;
  urduTranslation?: string;
  audioUrl?: string;
}

export interface DetailedSurah extends SurahMeta {
  bismillahPre?: boolean;
  verses: Verse[];
  fazail?: string;
}

export interface ManzilVerse {
  id: number;
  surahName: string;
  versesRange: string;
  arabic: string;
  translation: string;
  urduTranslation?: string;
  note?: string;
}

export interface PunchSurahInfo {
  id: string;
  surahNumber: number;
  title: string;
  arabicTitle: string;
  meaning: string;
  virtue: string;
  versesCount: number;
  revelationType: string;
}

export interface Bookmark {
  surahNumber: number;
  surahName: string;
  verseNumber: number;
  timestamp: number;
}

export interface AppSettings {
  fiqh: FiqhSchool;
  calculationMethod: CalculationMethodName;
  arabicFontSize: number; // in px
  showTranslation: boolean;
  showUrdu: boolean;
  showTransliteration: boolean;
  arabicFontFamily: 'Amiri' | 'Scheherazade New';
  nightMode: boolean;
}
