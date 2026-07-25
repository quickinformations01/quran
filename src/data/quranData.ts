import { SurahMeta, DetailedSurah, Verse } from '../types';

export const SURAH_INDEX: SurahMeta[] = [
  { number: 1, name: "الفاتحة", transliteration: "Al-Fatiha", englishMeaning: "The Opening", versesCount: 7, revelationType: "Meccan", juzStart: 1 },
  { number: 2, name: "البقرة", transliteration: "Al-Baqarah", englishMeaning: "The Cow", versesCount: 286, revelationType: "Medinan", juzStart: 1 },
  { number: 3, name: "آل عمران", transliteration: "Ali 'Imran", englishMeaning: "Family of Imran", versesCount: 200, revelationType: "Medinan", juzStart: 3 },
  { number: 4, name: "النساء", transliteration: "An-Nisa", englishMeaning: "The Women", versesCount: 176, revelationType: "Medinan", juzStart: 4 },
  { number: 5, name: "المائدة", transliteration: "Al-Ma'idah", englishMeaning: "The Table Spread", versesCount: 120, revelationType: "Medinan", juzStart: 6 },
  { number: 6, name: "الأنعام", transliteration: "Al-An'am", englishMeaning: "The Cattle", versesCount: 165, revelationType: "Meccan", juzStart: 7 },
  { number: 7, name: "الأعراف", transliteration: "Al-A'raf", englishMeaning: "The Heights", versesCount: 206, revelationType: "Meccan", juzStart: 8 },
  { number: 8, name: "الأنفال", transliteration: "Al-Anfal", englishMeaning: "The Spoils of War", versesCount: 75, revelationType: "Medinan", juzStart: 9 },
  { number: 9, name: "التوبة", transliteration: "At-Tawbah", englishMeaning: "The Repentance", versesCount: 129, revelationType: "Medinan", juzStart: 10 },
  { number: 10, name: "يونس", transliteration: "Yunus", englishMeaning: "Jonah", versesCount: 109, revelationType: "Meccan", juzStart: 11 },
  { number: 11, name: "هود", transliteration: "Hud", englishMeaning: "Hud", versesCount: 123, revelationType: "Meccan", juzStart: 11 },
  { number: 12, name: "يوسف", transliteration: "Yusuf", englishMeaning: "Joseph", versesCount: 111, revelationType: "Meccan", juzStart: 12 },
  { number: 13, name: "الرعد", transliteration: "Ar-Ra'd", englishMeaning: "The Thunder", versesCount: 43, revelationType: "Medinan", juzStart: 13 },
  { number: 14, name: "إبراهيم", transliteration: "Ibrahim", englishMeaning: "Abraham", versesCount: 52, revelationType: "Meccan", juzStart: 13 },
  { number: 15, name: "الحجر", transliteration: "Al-Hijr", englishMeaning: "The Rocky Tract", versesCount: 99, revelationType: "Meccan", juzStart: 14 },
  { number: 16, name: "النحل", transliteration: "An-Nahl", englishMeaning: "The Bee", versesCount: 128, revelationType: "Meccan", juzStart: 14 },
  { number: 17, name: "الإسراء", transliteration: "Al-Isra", englishMeaning: "The Night Journey", versesCount: 111, revelationType: "Meccan", juzStart: 15 },
  { number: 18, name: "الكهف", transliteration: "Al-Kahf", englishMeaning: "The Cave", versesCount: 110, revelationType: "Meccan", juzStart: 15 },
  { number: 19, name: "مريم", transliteration: "Maryam", englishMeaning: "Mary", versesCount: 98, revelationType: "Meccan", juzStart: 16 },
  { number: 20, name: "طه", transliteration: "Taha", englishMeaning: "Ta-Ha", versesCount: 135, revelationType: "Meccan", juzStart: 16 },
  { number: 21, name: "الأنبياء", transliteration: "Al-Anbiya", englishMeaning: "The Prophets", versesCount: 112, revelationType: "Meccan", juzStart: 17 },
  { number: 22, name: "الحج", transliteration: "Al-Hajj", englishMeaning: "The Pilgrimage", versesCount: 78, revelationType: "Medinan", juzStart: 17 },
  { number: 23, name: "المؤمنون", transliteration: "Al-Mu'minun", englishMeaning: "The Believers", versesCount: 118, revelationType: "Meccan", juzStart: 18 },
  { number: 24, name: "النور", transliteration: "An-Nur", englishMeaning: "The Light", versesCount: 64, revelationType: "Medinan", juzStart: 18 },
  { number: 25, name: "الفرقان", transliteration: "Al-Furqan", englishMeaning: "The Criterion", versesCount: 77, revelationType: "Meccan", juzStart: 18 },
  { number: 26, name: "الشعراء", transliteration: "Ash-Shu'ara", englishMeaning: "The Poets", versesCount: 227, revelationType: "Meccan", juzStart: 19 },
  { number: 27, name: "النمل", transliteration: "An-Naml", englishMeaning: "The Ant", versesCount: 93, revelationType: "Meccan", juzStart: 19 },
  { number: 28, name: "القصص", transliteration: "Al-Qasas", englishMeaning: "The Stories", versesCount: 88, revelationType: "Meccan", juzStart: 20 },
  { number: 29, name: "العنكبوت", transliteration: "Al-'Ankabut", englishMeaning: "The Spider", versesCount: 69, revelationType: "Meccan", juzStart: 20 },
  { number: 30, name: "الروم", transliteration: "Ar-Rum", englishMeaning: "The Romans", versesCount: 60, revelationType: "Meccan", juzStart: 21 },
  { number: 31, name: "لقمان", transliteration: "Luqman", englishMeaning: "Luqman", versesCount: 34, revelationType: "Meccan", juzStart: 21 },
  { number: 32, name: "السجدة", transliteration: "As-Sajdah", englishMeaning: "The Prostration", versesCount: 30, revelationType: "Meccan", juzStart: 21 },
  { number: 33, name: "الأحزاب", transliteration: "Al-Ahzab", englishMeaning: "The Combined Forces", versesCount: 73, revelationType: "Medinan", juzStart: 21 },
  { number: 34, name: "سبإ", transliteration: "Saba", englishMeaning: "Sheba", versesCount: 54, revelationType: "Meccan", juzStart: 22 },
  { number: 35, name: "فاطر", transliteration: "Fatir", englishMeaning: "Originator", versesCount: 45, revelationType: "Meccan", juzStart: 22 },
  { number: 36, name: "يس", transliteration: "Ya-Sin", englishMeaning: "Ya Sin", versesCount: 83, revelationType: "Meccan", juzStart: 22 },
  { number: 37, name: "الصافات", transliteration: "As-Saffat", englishMeaning: "Those who set the Ranks", versesCount: 182, revelationType: "Meccan", juzStart: 23 },
  { number: 38, name: "ص", transliteration: "Sad", englishMeaning: "The Letter Sad", versesCount: 88, revelationType: "Meccan", juzStart: 23 },
  { number: 39, name: "الزمر", transliteration: "Az-Zumar", englishMeaning: "The Troops", versesCount: 75, revelationType: "Meccan", juzStart: 23 },
  { number: 40, name: "غافر", transliteration: "Ghafir", englishMeaning: "The Forgiver", versesCount: 85, revelationType: "Meccan", juzStart: 24 },
  { number: 41, name: "فصلت", transliteration: "Fussilat", englishMeaning: "Explained in Detail", versesCount: 54, revelationType: "Meccan", juzStart: 24 },
  { number: 42, name: "الشورى", transliteration: "Ash-Shura", englishMeaning: "The Consultation", versesCount: 53, revelationType: "Meccan", juzStart: 25 },
  { number: 43, name: "الزخرف", transliteration: "Az-Zukhruf", englishMeaning: "The Ornaments of Gold", versesCount: 89, revelationType: "Meccan", juzStart: 25 },
  { number: 44, name: "الدخان", transliteration: "Ad-Dukhan", englishMeaning: "The Smoke", versesCount: 59, revelationType: "Meccan", juzStart: 25 },
  { number: 45, name: "الجاثية", transliteration: "Al-Jathiyah", englishMeaning: "The Crouching", versesCount: 37, revelationType: "Meccan", juzStart: 25 },
  { number: 46, name: "الأحقاف", transliteration: "Al-Ahqaf", englishMeaning: "The Wind-Curved Sandhills", versesCount: 35, revelationType: "Meccan", juzStart: 26 },
  { number: 47, name: "محمد", transliteration: "Muhammad", englishMeaning: "Muhammad", versesCount: 38, revelationType: "Medinan", juzStart: 26 },
  { number: 48, name: "الفتح", transliteration: "Al-Fath", englishMeaning: "The Victory", versesCount: 29, revelationType: "Medinan", juzStart: 26 },
  { number: 49, name: "الحجرات", transliteration: "Al-Hujurat", englishMeaning: "The Dwellings", versesCount: 18, revelationType: "Medinan", juzStart: 26 },
  { number: 50, name: "ق", transliteration: "Qaf", englishMeaning: "The Letter Qaf", versesCount: 45, revelationType: "Meccan", juzStart: 26 },
  { number: 51, name: "الذاريات", transliteration: "Adh-Dhariyat", englishMeaning: "The Winnowing Winds", versesCount: 60, revelationType: "Meccan", juzStart: 26 },
  { number: 52, name: "الطور", transliteration: "At-Tur", englishMeaning: "The Mount", versesCount: 49, revelationType: "Meccan", juzStart: 27 },
  { number: 53, name: "النجم", transliteration: "An-Najm", englishMeaning: "The Star", versesCount: 62, revelationType: "Meccan", juzStart: 27 },
  { number: 54, name: "القمر", transliteration: "Al-Qamar", englishMeaning: "The Moon", versesCount: 55, revelationType: "Meccan", juzStart: 27 },
  { number: 55, name: "الرحمن", transliteration: "Ar-Rahman", englishMeaning: "The Beneficent", versesCount: 78, revelationType: "Medinan", juzStart: 27 },
  { number: 56, name: "الواقعة", transliteration: "Al-Waqi'ah", englishMeaning: "The Inevitable", versesCount: 96, revelationType: "Meccan", juzStart: 27 },
  { number: 57, name: "الحديد", transliteration: "Al-Hadid", englishMeaning: "The Iron", versesCount: 29, revelationType: "Medinan", juzStart: 27 },
  { number: 58, name: "المجادلة", transliteration: "Al-Mujadila", englishMeaning: "The Pleading Woman", versesCount: 22, revelationType: "Medinan", juzStart: 28 },
  { number: 59, name: "الحشر", transliteration: "Al-Hashr", englishMeaning: "The Exile", versesCount: 24, revelationType: "Medinan", juzStart: 28 },
  { number: 60, name: "الممتحنة", transliteration: "Al-Mumtahanah", englishMeaning: "She that is to be examined", versesCount: 13, revelationType: "Medinan", juzStart: 28 },
  { number: 61, name: "الصف", transliteration: "As-Saff", englishMeaning: "The Ranks", versesCount: 14, revelationType: "Medinan", juzStart: 28 },
  { number: 62, name: "الجمعة", transliteration: "Al-Jumu'ah", englishMeaning: "Friday", versesCount: 11, revelationType: "Medinan", juzStart: 28 },
  { number: 63, name: "المنافقون", transliteration: "Al-Munafiqun", englishMeaning: "The Hypocrites", versesCount: 11, revelationType: "Medinan", juzStart: 28 },
  { number: 64, name: "التغابن", transliteration: "At-Taghabun", englishMeaning: "The Mutual Disillusion", versesCount: 18, revelationType: "Medinan", juzStart: 28 },
  { number: 65, name: "الطلاق", transliteration: "At-Talaq", englishMeaning: "The Divorce", versesCount: 12, revelationType: "Medinan", juzStart: 28 },
  { number: 66, name: "التحريم", transliteration: "At-Tahrim", englishMeaning: "The Prohibition", versesCount: 12, revelationType: "Medinan", juzStart: 28 },
  { number: 67, name: "الملك", transliteration: "Al-Mulk", englishMeaning: "The Sovereignty", versesCount: 30, revelationType: "Meccan", juzStart: 29 },
  { number: 68, name: "القلم", transliteration: "Al-Qalam", englishMeaning: "The Pen", versesCount: 52, revelationType: "Meccan", juzStart: 29 },
  { number: 69, name: "الحاقة", transliteration: "Al-Haqqah", englishMeaning: "The Inevitable Reality", versesCount: 52, revelationType: "Meccan", juzStart: 29 },
  { number: 70, name: "المعارج", transliteration: "Al-Ma'arij", englishMeaning: "The Ascending Stairways", versesCount: 44, revelationType: "Meccan", juzStart: 29 },
  { number: 71, name: "نوح", transliteration: "Nuh", englishMeaning: "Noah", versesCount: 28, revelationType: "Meccan", juzStart: 29 },
  { number: 72, name: "الجن", transliteration: "Al-Jinn", englishMeaning: "The Jinn", versesCount: 28, revelationType: "Meccan", juzStart: 29 },
  { number: 73, name: "المزمل", transliteration: "Al-Muzzammil", englishMeaning: "The Enshrouded One", versesCount: 20, revelationType: "Meccan", juzStart: 29 },
  { number: 74, name: "المدثر", transliteration: "Al-Muddaththir", englishMeaning: "The Cloaked One", versesCount: 56, revelationType: "Meccan", juzStart: 29 },
  { number: 75, name: "القيامة", transliteration: "Al-Qiyamah", englishMeaning: "The Resurrection", versesCount: 40, revelationType: "Meccan", juzStart: 29 },
  { number: 76, name: "الإنسان", transliteration: "Al-Insan", englishMeaning: "Man", versesCount: 31, revelationType: "Medinan", juzStart: 29 },
  { number: 77, name: "المرسلات", transliteration: "Al-Mursalat", englishMeaning: "The Emissaries", versesCount: 50, revelationType: "Meccan", juzStart: 29 },
  { number: 78, name: "النبإ", transliteration: "An-Naba", englishMeaning: "The Tidings", versesCount: 40, revelationType: "Meccan", juzStart: 30 },
  { number: 79, name: "النازعات", transliteration: "An-Nazi'at", englishMeaning: "Those who drag forth", versesCount: 46, revelationType: "Meccan", juzStart: 30 },
  { number: 80, name: "عبس", transliteration: "'Abasa", englishMeaning: "He Frowned", versesCount: 42, revelationType: "Meccan", juzStart: 30 },
  { number: 81, name: "التكوير", transliteration: "At-Takwir", englishMeaning: "The Overthrowing", versesCount: 29, revelationType: "Meccan", juzStart: 30 },
  { number: 82, name: "الانفطار", transliteration: "Al-Infitar", englishMeaning: "The Cleaving", versesCount: 19, revelationType: "Meccan", juzStart: 30 },
  { number: 83, name: "المطففين", transliteration: "Al-Mutaffifin", englishMeaning: "The Defrauding", versesCount: 36, revelationType: "Meccan", juzStart: 30 },
  { number: 84, name: "الانشقاق", transliteration: "Al-Inshiqaq", englishMeaning: "The Sundering", versesCount: 25, revelationType: "Meccan", juzStart: 30 },
  { number: 85, name: "البروج", transliteration: "Al-Buruj", englishMeaning: "The Mansions of the Stars", versesCount: 22, revelationType: "Meccan", juzStart: 30 },
  { number: 86, name: "الطارق", transliteration: "At-Tariq", englishMeaning: "The Nightcomer", versesCount: 17, revelationType: "Meccan", juzStart: 30 },
  { number: 87, name: "الأعلى", transliteration: "Al-A'la", englishMeaning: "The Most High", versesCount: 19, revelationType: "Meccan", juzStart: 30 },
  { number: 88, name: "الغاشية", transliteration: "Al-Ghashiyah", englishMeaning: "The Overwhelming", versesCount: 26, revelationType: "Meccan", juzStart: 30 },
  { number: 89, name: "الفجر", transliteration: "Al-Fajr", englishMeaning: "The Dawn", versesCount: 30, revelationType: "Meccan", juzStart: 30 },
  { number: 90, name: "البلد", transliteration: "Al-Balad", englishMeaning: "The City", versesCount: 20, revelationType: "Meccan", juzStart: 30 },
  { number: 91, name: "الشمس", transliteration: "Ash-Shams", englishMeaning: "The Sun", versesCount: 15, revelationType: "Meccan", juzStart: 30 },
  { number: 92, name: "الليل", transliteration: "Al-Layl", englishMeaning: "The Night", versesCount: 21, revelationType: "Meccan", juzStart: 30 },
  { number: 93, name: "الضحى", transliteration: "Ad-Duha", englishMeaning: "The Morning Hours", versesCount: 11, revelationType: "Meccan", juzStart: 30 },
  { number: 94, name: "الشرح", transliteration: "Ash-Sharh", englishMeaning: "The Relief", versesCount: 8, revelationType: "Meccan", juzStart: 30 },
  { number: 95, name: "التين", transliteration: "At-Tin", englishMeaning: "The Fig", versesCount: 8, revelationType: "Meccan", juzStart: 30 },
  { number: 96, name: "العلق", transliteration: "Al-'Alaq", englishMeaning: "The Clot", versesCount: 19, revelationType: "Meccan", juzStart: 30 },
  { number: 97, name: "القدر", transliteration: "Al-Qadr", englishMeaning: "The Power", versesCount: 5, revelationType: "Meccan", juzStart: 30 },
  { number: 98, name: "البينة", transliteration: "Al-Bayyinah", englishMeaning: "The Clear Proof", versesCount: 8, revelationType: "Medinan", juzStart: 30 },
  { number: 99, name: "الزلزلة", transliteration: "Az-Zalzalah", englishMeaning: "The Earthquake", versesCount: 8, revelationType: "Medinan", juzStart: 30 },
  { number: 100, name: "العاديات", transliteration: "Al-'Adiyat", englishMeaning: "The Courser", versesCount: 11, revelationType: "Meccan", juzStart: 30 },
  { number: 101, name: "القارعة", transliteration: "Al-Qari'ah", englishMeaning: "The Calamity", versesCount: 11, revelationType: "Meccan", juzStart: 30 },
  { number: 102, name: "التكاثر", transliteration: "At-Takathur", englishMeaning: "Rivalry in world increase", versesCount: 8, revelationType: "Meccan", juzStart: 30 },
  { number: 103, name: "العصر", transliteration: "Al-'Asr", englishMeaning: "The Declining Day", versesCount: 3, revelationType: "Meccan", juzStart: 30 },
  { number: 104, name: "الهمزة", transliteration: "Al-Humazah", englishMeaning: "The Traducer", versesCount: 9, revelationType: "Meccan", juzStart: 30 },
  { number: 105, name: "الفيل", transliteration: "Al-Fil", englishMeaning: "The Elephant", versesCount: 5, revelationType: "Meccan", juzStart: 30 },
  { number: 106, name: "قريش", transliteration: "Quraysh", englishMeaning: "Quraysh", versesCount: 4, revelationType: "Meccan", juzStart: 30 },
  { number: 107, name: "المواعون", transliteration: "Al-Ma'un", englishMeaning: "The Small Kindnesses", versesCount: 7, revelationType: "Meccan", juzStart: 30 },
  { number: 108, name: "الكوثر", transliteration: "Al-Kawthar", englishMeaning: "The Abundance", versesCount: 3, revelationType: "Meccan", juzStart: 30 },
  { number: 109, name: "الكافرون", transliteration: "Al-Kafirun", englishMeaning: "The Disbelievers", versesCount: 6, revelationType: "Meccan", juzStart: 30 },
  { number: 110, name: "النصر", transliteration: "An-Nasr", englishMeaning: "The Divine Support", versesCount: 3, revelationType: "Medinan", juzStart: 30 },
  { number: 111, name: "المسد", transliteration: "Al-Masad", englishMeaning: "The Palm Fiber", versesCount: 5, revelationType: "Meccan", juzStart: 30 },
  { number: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", englishMeaning: "The Sincerity", versesCount: 4, revelationType: "Meccan", juzStart: 30 },
  { number: 113, name: "الفلق", transliteration: "Al-Falaq", englishMeaning: "The Daybreak", versesCount: 5, revelationType: "Meccan", juzStart: 30 },
  { number: 114, name: "الناس", transliteration: "An-Nas", englishMeaning: "Mankind", versesCount: 6, revelationType: "Meccan", juzStart: 30 }
];

// Offline Pre-bundled Offline Surah Text Data for key Surahs
export const PREBUNDLED_SURAHS: Record<number, DetailedSurah> = {
  1: {
    number: 1,
    name: "الفاتحة",
    transliteration: "Al-Fatiha",
    englishMeaning: "The Opening",
    versesCount: 7,
    revelationType: "Meccan",
    juzStart: 1,
    bismillahPre: false,
    verses: [
      { numberInSurah: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Bismillaahir Rahmaanir Raheem", translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.", urduTranslation: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے" },
      { numberInSurah: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "Alhamdu lillaahi Rabbil 'aalameen", translation: "[All] praise is [due] to Allah, Lord of the worlds -", urduTranslation: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پرورش کرنے والا ہے" },
      { numberInSurah: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "Ar-Rahmaanir-Raheem", translation: "The Entirely Merciful, the Especially Merciful,", urduTranslation: "بہت مہربان نہایت رحم والا" },
      { numberInSurah: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "Maaliki Yawmid-Deen", translation: "Sovereign of the Day of Recompense.", urduTranslation: "روزِ جزا کا مالک" },
      { numberInSurah: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "Iyyaaka na'budu wa iyyaaka nasta'een", translation: "It is You we worship and You we ask for help.", urduTranslation: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں" },
      { numberInSurah: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "Ihdinas-Siraatal-Mustaqeem", translation: "Guide us to the straight path -", urduTranslation: "ہمیں سیدھے راستے پر چلا" },
      { numberInSurah: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", transliteration: "Siraatal-lazeena an'amta 'alaihim ghayril-maghdoobi 'alaihim wa lad-daalleen", translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", urduTranslation: "ان لوگوں کے راستے پر جن پر تو نے انعام کیا، نہ کہ ان کے جن پر غضب ہوا اور نہ گمراہوں کے" }
    ]
  },
  112: {
    number: 112,
    name: "الإخلاص",
    transliteration: "Al-Ikhlas",
    englishMeaning: "The Sincerity",
    versesCount: 4,
    revelationType: "Meccan",
    juzStart: 30,
    bismillahPre: true,
    verses: [
      { numberInSurah: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "Qul huwal laahu ahad", translation: "Say, 'He is Allah, [who is] One,'", urduTranslation: "کہہ دیجئے کہ وہ اللہ ایک ہے" },
      { numberInSurah: 2, arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allah us-samad", translation: "Allah, the Eternal Refuge.", urduTranslation: "اللہ بے نیاز ہے" },
      { numberInSurah: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "Lam yalid wa lam yoolad", translation: "He neither begets nor is born,", urduTranslation: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے" },
      { numberInSurah: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", transliteration: "Wa lam yakul-lahu kufuwan ahad", translation: "Nor is there to Him any equivalent.", urduTranslation: "اور نہ اس کے برابر کا کوئی ہے" }
    ]
  },
  113: {
    number: 113,
    name: "الفلق",
    transliteration: "Al-Falaq",
    englishMeaning: "The Daybreak",
    versesCount: 5,
    revelationType: "Meccan",
    juzStart: 30,
    bismillahPre: true,
    verses: [
      { numberInSurah: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "Qul a'oozu birabbil-falaq", translation: "Say, 'I seek refuge in the Lord of daybreak'", urduTranslation: "کہہ دیجئے میں صبح کے رب کی پناہ مانگتا ہوں" },
      { numberInSurah: 2, arabic: "مِن شَرِّ مَا خَلَقَ", transliteration: "Min sharri maa khalaq", translation: "From the evil of that which He created", urduTranslation: "ہر مخلوق کے شر سے" },
      { numberInSurah: 3, arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Wa min sharri ghaasiqin izaa waqab", translation: "And from the evil of darkness when it settles", urduTranslation: "اور اندھیری رات کے شر سے جب وہ چھا جائے" },
      { numberInSurah: 4, arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "Wa min sharrin-naffaathaati fil 'uqad", translation: "And from the evil of the blowers in knots", urduTranslation: "اور گرہوں میں پھونکنے والیوں کے شر سے" },
      { numberInSurah: 5, arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "Wa min sharri haasidin izaa hasad", translation: "And from the evil of an envier when he envies.", urduTranslation: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے" }
    ]
  },
  114: {
    number: 114,
    name: "الناس",
    transliteration: "An-Nas",
    englishMeaning: "Mankind",
    versesCount: 6,
    revelationType: "Meccan",
    juzStart: 30,
    bismillahPre: true,
    verses: [
      { numberInSurah: 1, arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "Qul a'oozu birabbin naas", translation: "Say, 'I seek refuge in the Lord of mankind,'", urduTranslation: "کہہ دیجئے میں انسانوں کے رب کی پناہ مانگتا ہوں" },
      { numberInSurah: 2, arabic: "مَلِكِ النَّاسِ", transliteration: "Malikin naas", translation: "The Sovereign of mankind.", urduTranslation: "انسانوں کے بادشاہ کی" },
      { numberInSurah: 3, arabic: "إِلَٰهِ النَّاسِ", transliteration: "Ilaahin naas", translation: "The God of mankind,", urduTranslation: "انسانوں کے معبود کی" },
      { numberInSurah: 4, arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "Min sharril waswaasil khannaas", translation: "From the evil of the retreating whisperer -", urduTranslation: "وسوسہ ڈالنے والے پیچھے ہٹ جانے والے کے شر سے" },
      { numberInSurah: 5, arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "Allazee yuwaswisu fee sudoorin naas", translation: "Who whispers [evil] into the breasts of mankind -", urduTranslation: "جو لوگوں کے سینوں میں وسوسے ڈالتا ہے" },
      { numberInSurah: 6, arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "Minal jinnati wan naas", translation: "From among the jinn and mankind.", urduTranslation: "جاہل جنوں میں سے ہو یا انسانوں میں سے" }
    ]
  }
};

// Memory cache for dynamically fetched Surahs
const fetchedSurahCache: Map<number, DetailedSurah> = new Map();

export async function fetchFullSurahText(surahNumber: number): Promise<DetailedSurah> {
  // Check prebundled first
  if (PREBUNDLED_SURAHS[surahNumber]) {
    return PREBUNDLED_SURAHS[surahNumber];
  }

  // Check cache
  if (fetchedSurahCache.has(surahNumber)) {
    return fetchedSurahCache.get(surahNumber)!;
  }

  const meta = SURAH_INDEX.find(s => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah #${surahNumber} not found.`);
  }

  try {
    // Fetch Arabic Uthmani + English Sahih + Urdu Jalandhry text from open public Quran API
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();
    if (data.code === 200 && Array.isArray(data.data) && data.data.length >= 2) {
      const arabicEdition = data.data[0];
      const englishEdition = data.data[1];
      const urduEdition = data.data[2] || null;

      const verses: Verse[] = arabicEdition.ayahs.map((ayah: any, idx: number) => {
        let text: string = ayah.text;
        // Strip Bismillah prefix if present in verse 1 for surahs other than Al-Fatiha and At-Tawbah
        if (surahNumber !== 1 && surahNumber !== 9 && idx === 0 && text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ")) {
          text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim();
        }

        return {
          numberInSurah: ayah.numberInSurah,
          arabic: text,
          translation: englishEdition?.ayahs[idx]?.text || "",
          urduTranslation: urduEdition?.ayahs[idx]?.text || "",
          audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`
        };
      });

      const detailedSurah: DetailedSurah = {
        ...meta,
        bismillahPre: surahNumber !== 1 && surahNumber !== 9,
        verses,
      };

      fetchedSurahCache.set(surahNumber, detailedSurah);
      return detailedSurah;
    }
  } catch (err) {
    console.warn(`Failed to fetch live Quran text for Surah ${surahNumber}, constructing fallback view:`, err);
  }

  // Fallback structure if network is completely offline for non-prebundled Surahs
  const fallbackVerses: Verse[] = Array.from({ length: meta.versesCount }, (_, idx) => ({
    numberInSurah: idx + 1,
    arabic: `آية ${idx + 1} من سورة ${meta.name}`,
    translation: `Verse ${idx + 1} of Surah ${meta.transliteration}. (Connect to internet once to cache complete text for offline mode).`,
    audioUrl: ''
  }));

  const fallbackSurah: DetailedSurah = {
    ...meta,
    bismillahPre: surahNumber !== 1 && surahNumber !== 9,
    verses: fallbackVerses
  };

  return fallbackSurah;
}
