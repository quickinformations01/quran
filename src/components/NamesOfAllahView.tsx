import React, { useState } from 'react';
import { Sparkles, Search, Heart, Volume2, ShieldCheck, ArrowLeft } from 'lucide-react';

interface AsmaUlHusna {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  meaning: string;
  virtue: string;
}

const NAMES_DATA: AsmaUlHusna[] = [
  { id: 1, arabic: 'الرَّحْمَنُ', transliteration: 'Ar-Rahman', english: 'The Most Gracious', urdu: 'بے حد رحم کرنے والا', meaning: 'The One who has plenty of mercy for the believers and the blasphemers in this world.', virtue: 'Reciting 100 times after Fajr enhances memory and clears hardship.' },
  { id: 2, arabic: 'الرَّحِيمُ', transliteration: 'Ar-Raheem', english: 'The Most Merciful', urdu: 'نهایت مہربان', meaning: 'The One who has plenty of mercy for the believers in the hereafter.', virtue: 'Reciting 100 times after every prayer protects from all afflictions.' },
  { id: 3, arabic: 'الْمَلِكُ', transliteration: 'Al-Malik', english: 'The King and Owner', urdu: 'حقیقی بادشاہ', meaning: 'The Sovereign Lord, Absolute Ruler over the entire universe.', virtue: 'Reciting 121 times daily grants spiritual independence and dignity.' },
  { id: 4, arabic: 'الْقُدُّوسُ', transliteration: 'Al-Quddus', english: 'The Most Sacred', urdu: 'ہر عیب سے پاک', meaning: 'The Pure One, free from any flaw, imperfection, or defect.', virtue: 'Reciting frequently purifies the heart from anxiety and evil thoughts.' },
  { id: 5, arabic: 'السَّلاَمُ', transliteration: 'As-Salam', english: 'The Source of Peace', urdu: 'سلامتی دینے والا', meaning: 'The One who is free from every imperfection and grants peace.', virtue: 'Reciting 160 times over a sick person brings divine healing by Allah’s leave.' },
  { id: 6, arabic: 'الْمُؤْمِنُ', transliteration: 'Al-Mu’min', english: 'The Giver of Faith & Security', urdu: 'امن و ایمان دینے والا', meaning: 'The Granter of Security, Who affirms the truth of His word.', virtue: 'Reciting 630 times in times of fear safeguards from all harm.' },
  { id: 7, arabic: 'الْمُهَيْمِنُ', transliteration: 'Al-Muhaymin', english: 'The Guardian & Protector', urdu: 'نگہبان اور حفاظت کرنے والا', meaning: 'The Protector who oversees, guards, and preserves all creation.', virtue: 'Reciting 100 times after ghusl brings spiritual illumination.' },
  { id: 8, arabic: 'الْعَزِيزُ', transliteration: 'Al-Aziz', english: 'The Mighty & Unconquerable', urdu: 'غالب اور زبردست', meaning: 'The All-Mighty, Honorable, Supreme in Might and Majesty.', virtue: 'Reciting 41 times after Fajr for 40 days brings self-sufficiency.' },
  { id: 9, arabic: 'الْجَبَّارُ', transliteration: 'Al-Jabbar', english: 'The Compeller & Restorer', urdu: 'زبردست اور نقصان پورا کرنے والا', meaning: 'The One who repairs all broken conditions and compels all things.', virtue: 'Reciting 226 times morning and evening protects against tyranny.' },
  { id: 10, arabic: 'الْمُتَكَبِّرُ', transliteration: 'Al-Mutakabbir', english: 'The Majestic & Supreme', urdu: 'بزرگی والا', meaning: 'The One who is clear from the attributes of the creation and supreme in greatness.', virtue: 'Reciting before important tasks ensures divine success.' },
  { id: 11, arabic: 'الْخَالِقُ', transliteration: 'Al-Khaliq', english: 'The Creator', urdu: 'پیدا کرنے والا', meaning: 'The One who brings everything from non-existence into existence.', virtue: 'Reciting 100 times for 7 consecutive days protects against calamities.' },
  { id: 12, arabic: 'الْبَارِئُ', transliteration: 'Al-Bari', english: 'The Evolver & Maker', urdu: 'ٹھیک بنانے والا', meaning: 'The One who creates harmony and forms without any pre-existing model.', virtue: 'Reciting for barakah in creative endeavors and problem solving.' },
  { id: 13, arabic: 'الْمُصَوِّرُ', transliteration: 'Al-Musawwir', english: 'The Fashioner & Shaper', urdu: 'صورت گری کرنے والا', meaning: 'The One who forms and designs every creation in unique beauty.', virtue: 'Fast 7 days and recite 21 times over water for blessed children.' },
  { id: 14, arabic: 'الْغَفَّارُ', transliteration: 'Al-Ghaffar', english: 'The Constant Forgiver', urdu: 'بہت بخشنے والا', meaning: 'The One who forgives sins repeatedly and hides faults graciously.', virtue: 'Reciting 100 times after Jumuah prayer grants forgiveness of sins.' },
  { id: 15, arabic: 'الْقَهَّارُ', transliteration: 'Al-Qahhar', english: 'The Subduer & Dominant', urdu: 'سب پر غالب', meaning: 'The All-Dominant Who subdues all creation under His supreme authority.', virtue: 'Reciting frequently frees the soul from worldly passions and desires.' },
  { id: 16, arabic: 'الْوَهَّابُ', transliteration: 'Al-Wahhab', english: 'The Supreme Bestower', urdu: 'بے حساب دینے والا', meaning: 'The One who gives abundantly without expecting any return.', virtue: 'Reciting 7 times in Sujood brings abundance in provision.' },
  { id: 17, arabic: 'الرَّزَّاقُ', transliteration: 'Ar-Razzaq', english: 'The Provider', urdu: 'رزق دینے والا', meaning: 'The One who creates all means of nourishment and provision.', virtue: 'Reciting 10 times before morning prayer increases halal rizq.' },
  { id: 18, arabic: 'الْفَتَّاحُ', transliteration: 'Al-Fattah', english: 'The Opener & Supreme Judge', urdu: 'مشکل کشا اور راستہ کھولنے والا', meaning: 'The One who opens closed doors, grants victory, and reveals truth.', virtue: 'Reciting 71 times with hands on chest after Fajr clears confusion.' },
  { id: 19, arabic: 'الْعَلِيمُ', transliteration: 'Al-Aleem', english: 'The All-Knowing', urdu: 'سب کچھ جاننے والا', meaning: 'The One whose knowledge encompasses everything seen and unseen.', virtue: 'Reciting 100 times daily illuminates the heart with wisdom.' },
  { id: 20, arabic: 'الْقَابِضُ', transliteration: 'Al-Qabid', english: 'The Withholder', urdu: 'تنگ کرنے والا', meaning: 'The One who constricts provision or soul according to divine wisdom.', virtue: 'Reciting 50 times over food for 40 days wards off hunger.' },
  { id: 21, arabic: 'الْبَاسِطُ', transliteration: 'Al-Basit', english: 'The Extender & Expander', urdu: 'کشادہ کرنے والا', meaning: 'The One who expands provision, mercy, and guidance to creation.', virtue: 'Reciting 10 times after Ishraq with raised hands brings wealth.' },
  { id: 22, arabic: 'الْخَافِضُ', transliteration: 'Al-Khafid', english: 'The Abaser & Humbler', urdu: 'پست کرنے والا', meaning: 'The One who lowers the arrogant and the oppressors.', virtue: 'Reciting 500 times fulfills desires and humbles enemies.' },
  { id: 23, arabic: 'الرَّافِعُ', transliteration: 'Ar-Rafi', english: 'The Exalter & Elevator', urdu: 'بلند کرنے والا', meaning: 'The One who raises the ranks of the righteous believers.', virtue: 'Reciting 100 times on Sunday nights grants honor and dignity.' },
  { id: 24, arabic: 'الْمُعِزُّ', transliteration: 'Al-Mu’izz', english: 'The Bestower of Honor', urdu: 'عزت دینے والا', meaning: 'The One who gives honor and dignity to whom He wills.', virtue: 'Reciting 140 times after Isha on Monday or Friday grants respect.' },
  { id: 25, arabic: 'الْمُذِلُّ', transliteration: 'Al-Mudhill', english: 'The Dishonorer & Humbler', urdu: 'ذلیل کرنے والا', meaning: 'The One who humbles the tyrannical oppressors.', virtue: 'Reciting 75 times in Sujood protects against malicious adversaries.' },
  { id: 26, arabic: 'السَّمِيعُ', transliteration: 'As-Sami’', english: 'The All-Hearing', urdu: 'سب کچھ سننے والا', meaning: 'The One who hears every sound, prayer, and silent thought.', virtue: 'Reciting 500 times after Chisht/Ishraq ensures prayers are accepted.' },
  { id: 27, arabic: 'الْبَصِيرُ', transliteration: 'Al-Baseer', english: 'The All-Seeing', urdu: 'سب کچھ دیکھنے والا', meaning: 'The One who sees all actions, secrets, and subtle movements.', virtue: 'Reciting 100 times after Jumuah prayer sharpens spiritual insight.' },
  { id: 28, arabic: 'الْحَكَمُ', transliteration: 'Al-Hakam', english: 'The Absolute Judge', urdu: 'حاکم اور فیصلہ کرنے والا', meaning: 'The One whose judgment is final and perfectly just.', virtue: 'Reciting 99 times at night grants wisdom and understanding.' },
  { id: 29, arabic: 'الْعَدْلُ', transliteration: 'Al-Adl', english: 'The Utterly Just', urdu: 'عدل کرنے والا', meaning: 'The One who is completely equitable and never commits injustice.', virtue: 'Reciting on Friday night instills justice in one’s household.' },
  { id: 30, arabic: 'اللَّطِيفُ', transliteration: 'Al-Lateef', english: 'The Subtle & Kind', urdu: 'مہربان اور باریک بین', meaning: 'The One who is subtle, gentle, and knows the finest details.', virtue: 'Reciting 129 times brings relief from poverty and distress.' },
  { id: 31, arabic: 'الْخَبِيرُ', transliteration: 'Al-Khabeer', english: 'The All-Aware', urdu: 'باخبر', meaning: 'The One from whom no secret is hidden in the heavens or earth.', virtue: 'Reciting continuously frees one from bad habits.' },
  { id: 32, arabic: 'الْحَلِيمُ', transliteration: 'Al-Haleem', english: 'The Most Forbearing', urdu: 'بردبار اور حلم والا', meaning: 'The One who does not hasten punishment for sinners.', virtue: 'Write on paper and wash in water to sprinkle on belongings for safety.' },
  { id: 33, arabic: 'الْعَظِيمُ', transliteration: 'Al-Azeem', english: 'The Magnificent', urdu: 'عظمت والا', meaning: 'The One whose greatness exceeds all human comprehension.', virtue: 'Reciting repeatedly grants respect among people.' },
  { id: 34, arabic: 'الْغَفُورُ', transliteration: 'Al-Ghafoor', english: 'The All-Forgiving', urdu: 'بہت بخشنے والا', meaning: 'The One who covers sins and forgives endlessly.', virtue: 'Reciting cures headaches and relieves sorrow.' },
  { id: 35, arabic: 'الشَّكُورُ', transliteration: 'Ash-Shakoor', english: 'The Most Appreciative', urdu: 'قادر داں', meaning: 'The One who rewards small good deeds with immense blessings.', virtue: 'Reciting 41 times over water and washing eyes relieves heavy heart.' },
  { id: 36, arabic: 'الْعَلِيُّ', transliteration: 'Al-Aliyy', english: 'The Most High', urdu: 'بہت بلند', meaning: 'The One who is higher than all creation in status and majesty.', virtue: 'Reciting regularly ensures high position and success.' },
  { id: 37, arabic: 'الْكَبِيرُ', transliteration: 'Al-Kabeer', english: 'The Greatest', urdu: 'بہت بڑا', meaning: 'The One whose grandeur cannot be measured.', virtue: 'Reciting 100 times daily opens doors of spiritual enlightenment.' },
  { id: 38, arabic: 'الْحَفِيظُ', transliteration: 'Al-Hafiz', english: 'The Preserver & Guardian', urdu: 'حفاظت کرنے والا', meaning: 'The One who protects all creation from harm and destruction.', virtue: 'Reciting 16 times daily safeguards from all dangers.' },
  { id: 39, arabic: 'الْمُقِيتُ', transliteration: 'Al-Muqeet', english: 'The Sustainer & Maintainer', urdu: 'روزمرہ روزی دینے والا', meaning: 'The One who supplies strength and nourishment for all beings.', virtue: 'Reciting over a glass of water for unruly children brings gentleness.' },
  { id: 40, arabic: 'الْحَسِيبُ', transliteration: 'Al-Haseeb', english: 'The Reckoner & Sufficient', urdu: 'کفایت کرنے والا', meaning: 'The One who suffices all needs and takes account of everything.', virtue: 'Reciting 77 times starting Thursday morning protects from harm.' },
  { id: 41, arabic: 'الْجَلِيلُ', transliteration: 'Al-Jaleel', english: 'The Majestic & Sublime', urdu: 'بزرگ اور شان والا', meaning: 'The One who possesses ultimate majesty and glory.', virtue: 'Write with musk and saffron on paper for immense reverence.' },
  { id: 42, arabic: 'الْكَرِيمُ', transliteration: 'Al-Kareem', english: 'The Most Generous', urdu: 'بہت کرم کرنے والا', meaning: 'The One who gives without stinting and excuses without hesitation.', virtue: 'Reciting before sleeping brings honor among scholars.' },
  { id: 43, arabic: 'الرَّقِيبُ', transliteration: 'Ar-Raqeeb', english: 'The Watchful', urdu: 'نگران', meaning: 'The One who observes all thoughts, words, and deeds continuously.', virtue: 'Reciting 7 times over family and home protects from theft.' },
  { id: 44, arabic: 'الْمُجِيبُ', transliteration: 'Al-Mujeeb', english: 'The Responsive', urdu: 'دعا قبول کرنے والا', meaning: 'The One who answers every caller when they call upon Him.', virtue: 'Continuous recitation grants speedy fulfillment of prayers.' },
  { id: 45, arabic: 'الْوَاسِعُ', transliteration: 'Al-Wasi’', english: 'The All-Encompassing', urdu: 'وسعت والا', meaning: 'The One whose capacity, mercy, and knowledge know no bounds.', virtue: 'Reciting brings spiritual wealth and ease in livelihood.' },
  { id: 46, arabic: 'الْحَكِيمُ', transliteration: 'Al-Hakeem', english: 'The All-Wise', urdu: 'حکمت والا', meaning: 'The One who creates and directs everything with ultimate wisdom.', virtue: 'Reciting continuously opens the secrets of knowledge.' },
  { id: 47, arabic: 'الْوَدُودُ', transliteration: 'Al-Wadud', english: 'The Loving', urdu: 'محبت کرنے والا', meaning: 'The One who loves His righteous servants and is loved by them.', virtue: 'Reciting 1000 times over food and sharing brings love in marriage.' },
  { id: 48, arabic: 'الْمَجِيدُ', transliteration: 'Al-Majeed', english: 'The Glorious', urdu: 'بزرگی والا', meaning: 'The One who is infinitely glorious, noble, and praised.', virtue: 'Reciting 99 times on the 13th, 14th, and 15th of Hijri month cures illness.' },
  { id: 49, arabic: 'الْبَاعِثُ', transliteration: 'Al-Ba’ith', english: 'The Resurrector', urdu: 'دوبارہ اٹھانے والا', meaning: 'The One who will raise all beings on the Day of Judgment.', virtue: 'Reciting 101 times at bedtime fills heart with fear of God and light.' },
  { id: 50, arabic: 'الشَّهِيدُ', transliteration: 'Ash-Shaheed', english: 'The All-Witnessing', urdu: 'حاضر و ناظر', meaning: 'The One who witnesses every event and action in reality.', virtue: 'Reciting 21 times with hand on rebellious child brings obedience.' },
  { id: 51, arabic: 'الْحَقُّ', transliteration: 'Al-Haqq', english: 'The Absolute Truth', urdu: 'سچا اور قائم', meaning: 'The One whose existence is unchangeable, absolute truth.', virtue: 'Reciting over lost item brings it back by Allah’s mercy.' },
  { id: 52, arabic: 'الْوَكِيلُ', transliteration: 'Al-Wakeel', english: 'The Trustee & Disposer of Affairs', urdu: 'کارساز', meaning: 'The One who manages all affairs with complete trustworthiness.', virtue: 'Reciting in times of danger shields from all evil.' },
  { id: 53, arabic: 'الْقَوِيُّ', transliteration: 'Al-Qawiyy', english: 'The All-Strong', urdu: 'بہت طاقتور', meaning: 'The One with perfect, infinite strength.', virtue: 'Reciting protects against physical weakness and enemies.' },
  { id: 54, arabic: 'الْمَتِينُ', transliteration: 'Al-Mateen', english: 'The Firm & Steadfast', urdu: 'مضبوط اور پکا', meaning: 'The One whose power is unshakeable and steadfast.', virtue: 'Reciting over nursing mother increases milk supply.' },
  { id: 55, arabic: 'الْوَلِيُّ', transliteration: 'Al-Waliyy', english: 'The Protecting Friend', urdu: 'دوست اور مددگار', meaning: 'The One who supports and guides His righteous allies.', virtue: 'Reciting frequently transforms one into a friend of Allah.' },
  { id: 56, arabic: 'الْحَمِيدُ', transliteration: 'Al-Hameed', english: 'The Praiseworthy', urdu: 'تعریف کے لائق', meaning: 'The One who alone deserves all praise and adoration.', virtue: 'Reciting 93 times in solitude brings spiritual purity.' },
  { id: 57, arabic: 'الْمُحْصِي', transliteration: 'Al-Muhsi', english: 'The Accounter & Numberer', urdu: 'شمار کرنے والا', meaning: 'The One who knows the precise count of all things.', virtue: 'Reciting 20 times over bread slices grants mental sharpness.' },
  { id: 58, arabic: 'الْمُبْدِئُ', transliteration: 'Al-Mubdi’', english: 'The Originator', urdu: 'پہلی بار پیدا کرنے والا', meaning: 'The One who began creation without any prior template.', virtue: 'Reciting over pregnant woman safeguards pregnancy.' },
  { id: 59, arabic: 'الْمُعِيدُ', transliteration: 'Al-Mu’eed', english: 'The Restorer', urdu: 'دوبارہ لوٹانے والا', meaning: 'The One who restores creation back to life.', virtue: 'Reciting 70 times for missing person brings safe return.' },
  { id: 60, arabic: 'الْمُحْيِي', transliteration: 'Al-Muhyi', english: 'The Giver of Life', urdu: 'زندگی دینے والا', meaning: 'The One who gives life to bodies and spiritual life to hearts.', virtue: 'Reciting 7 times daily cures severe illness.' },
  { id: 61, arabic: 'الْمُمِيتُ', transliteration: 'Al-Mumeet', english: 'The Bringer of Death', urdu: 'موت دینے والا', meaning: 'The One who decrees death for all living beings.', virtue: 'Reciting destroys inner ego and arrogance.' },
  { id: 62, arabic: 'الْحَيُّ', transliteration: 'Al-Hayy', english: 'The Ever-Living', urdu: 'ہمیشہ زندہ رہنے والا', meaning: 'The One who is alive eternally without beginning or end.', virtue: 'Reciting 3000 times daily grants long healthy life.' },
  { id: 63, arabic: 'الْقَيُّومُ', transliteration: 'Al-Qayyum', english: 'The Self-Sustaining Sustainer', urdu: 'قائم رکھنے والا', meaning: 'The One who sustains Himself and upholds the entire cosmos.', virtue: 'Reciting Ya Hayyu Ya Qayyumu cures lethargy and sadness.' },
  { id: 64, arabic: 'الْوَاجِدُ', transliteration: 'Al-Wajid', english: 'The Finder & Unfailing', urdu: 'پانے والا', meaning: 'The One who lacks nothing and finds whatever He decrees.', virtue: 'Reciting over meals grants strength of heart.' },
  { id: 65, arabic: 'الْمَاجِدُ', transliteration: 'Al-Majid', english: 'The Illustrious', urdu: 'بزرگی والا', meaning: 'The One who is distinguished by grandeur and generosity.', virtue: 'Reciting in solitude illuminates the heart.' },
  { id: 66, arabic: 'الْوَاحِدُ', transliteration: 'Al-Wahid', english: 'The Unique & One', urdu: 'ایک اور اکیلا', meaning: 'The One who is absolute, without partners or equals.', virtue: 'Reciting 1000 times removes fear of worldly rulers.' },
  { id: 67, arabic: 'الأَحَدُ', transliteration: 'Al-Ahad', english: 'The Indivisible One', urdu: 'واحد و یکتا', meaning: 'The One and Only, indivisible in essence.', virtue: 'Reciting 1000 times opens spiritual doors.' },
  { id: 68, arabic: 'الصَّمَدُ', transliteration: 'As-Samad', english: 'The Eternal & Absolute', urdu: 'بے نیاز', meaning: 'The Eternal Refuge upon whom all creation depends.', virtue: 'Reciting 125 times after Fajr frees from dependence on people.' },
  { id: 69, arabic: 'الْقَادِرُ', transliteration: 'Al-Qadir', english: 'The Omnipotent & Able', urdu: 'قدرت والا', meaning: 'The One who has power to decree whatever He wills.', virtue: 'Reciting 41 times fulfills difficult desires.' },
  { id: 70, arabic: 'الْمُقْتَدِرُ', transliteration: 'Al-Muqtadir', english: 'The Powerful Determiner', urdu: 'کامل قدرت والا', meaning: 'The One whose power executes divine decrees perfectly.', virtue: 'Reciting upon waking brings divine assistance in daily tasks.' },
  { id: 71, arabic: 'الْمُقَدِّمُ', transliteration: 'Al-Muqaddim', english: 'The Expediter & Promoter', urdu: 'آگے کرنے والا', meaning: 'The One who advances things in priority and status.', virtue: 'Reciting in battlefield or exam grants victory.' },
  { id: 72, arabic: 'الْمُؤَخِّرُ', transliteration: 'Al-Mu’akkhir', english: 'The Delayer', urdu: 'پیچھے کرنے والا', meaning: 'The One who delays things according to supreme wisdom.', virtue: 'Reciting 100 times daily helps in sincere repentance.' },
  { id: 73, arabic: 'الأَوَّلُ', transliteration: 'Al-Awwal', english: 'The First', urdu: 'سب سے پہلے', meaning: 'The One before whom there was nothing.', virtue: 'Reciting 1000 times for 40 Fridays grants blessed children.' },
  { id: 74, arabic: 'الأَخِرُ', transliteration: 'Al-Akhir', english: 'The Last', urdu: 'سب سے آخر', meaning: 'The One after whom there is nothing.', virtue: 'Reciting 1000 times grants good end (Husn-al-Khatimah).' },
  { id: 75, arabic: 'الظَّاهِرُ', transliteration: 'Az-Zahir', english: 'The Manifest', urdu: 'عیاں اور ظاہر', meaning: 'The One who is evident through His creation.', virtue: 'Reciting 15 times after Ishraq illuminates vision.' },
  { id: 76, arabic: 'الْبَاطِنُ', transliteration: 'Al-Batin', english: 'The Hidden', urdu: 'پوشیدہ اور نہاں', meaning: 'The One who cannot be perceived by physical eyes.', virtue: 'Reciting 33 times daily brings inner peace.' },
  { id: 77, arabic: 'الْوَالِي', transliteration: 'Al-Wali', english: 'The Governor & Master', urdu: 'مالک اور کارساز', meaning: 'The One who rules and manages all created realms.', virtue: 'Reciting over house shields against lightning and storms.' },
  { id: 78, arabic: 'الْمُتَعَالِي', transliteration: 'Al-Muta’ali', english: 'The Exalted & Supreme', urdu: 'بہت بلند', meaning: 'The One exalted far above creation.', virtue: 'Reciting continuously brings high status.' },
  { id: 79, arabic: 'الْبَرُّ', transliteration: 'Al-Barr', english: 'The Source of All Goodness', urdu: 'احسان کرنے والا', meaning: 'The One who is infinitely kind and beneficial.', virtue: 'Reciting 7 times over newborn child protects from harm.' },
  { id: 80, arabic: 'التَّوَّابُ', transliteration: 'At-Tawwab', english: 'The Ever-Accepting of Repentance', urdu: 'توبہ قبول کرنے والا', meaning: 'The One who grants repentance and accepts it repeatedly.', virtue: 'Reciting 360 times after Duha grants accepted repentance.' },
  { id: 81, arabic: 'الْمُنْتَقِمُ', transliteration: 'Al-Muntaqim', english: 'The Avenger of Wrongdoers', urdu: 'بدلہ لینے والا', meaning: 'The One who justly punishes oppressors.', virtue: 'Reciting for 3 Fridays protects against tyrant oppressors.' },
  { id: 82, arabic: 'العَفُوُّ', transliteration: 'Al-Afuww', english: 'The Supreme Pardoner', urdu: 'معاف کرنے والا', meaning: 'The One who effaces sins completely as if they never happened.', virtue: 'Reciting frequently wipes away minor sins.' },
  { id: 83, arabic: 'الرَّؤُوفُ', transliteration: 'Ar-Ra’oof', english: 'The Most Compassionate', urdu: 'بہت شفقت والا', meaning: 'The One with intense tenderness and affection for creation.', virtue: 'Reciting 10 times in anger brings instant calmness.' },
  { id: 84, arabic: 'مَالِكُ الْمُلْكِ', transliteration: 'Malik-ul-Mulk', english: 'Master of All Sovereignty', urdu: 'ملک کا مالک', meaning: 'The Absolute Owner of all dominion and kingdoms.', virtue: 'Reciting grants wealth and independence.' },
  { id: 85, arabic: 'ذُو الْجَلاَلِ وَالإِكْرَامِ', transliteration: 'Dhul-Jalali wal-Ikram', english: 'Lord of Majesty & Generosity', urdu: 'عظمت اور کرم والا', meaning: 'The Possessor of supreme glory, majesty, and bountiful honor.', virtue: 'Reciting continuously grants dignity and fulfillment of prayers.' },
  { id: 86, arabic: 'الْمُقْسِطُ', transliteration: 'Al-Muqsit', english: 'The Equitable', urdu: 'انصاف کرنے والا', meaning: 'The One who acts with perfect fairness.', virtue: 'Reciting protects against evil whispering during prayer.' },
  { id: 87, arabic: 'الْجَامِعُ', transliteration: 'Al-Jami’', english: 'The Gatherer', urdu: 'جمع کرنے والا', meaning: 'The One who gathers all creation on the Judgment Day.', virtue: 'Reciting brings back lost family members or items.' },
  { id: 88, arabic: 'الْغَنِيُّ', transliteration: 'Al-Ghaniyy', english: 'The Self-Sufficient', urdu: 'بے نیاز اور غنی', meaning: 'The One who is free of all needs whatsoever.', virtue: 'Reciting 70 times cures illness and brings wealth.' },
  { id: 89, arabic: 'الْمُغْنِي', transliteration: 'Al-Mughni', english: 'The Enricher', urdu: 'غنی کرنے والا', meaning: 'The One who grants self-sufficiency and riches to whom He wills.', virtue: 'Reciting 1000 times for 10 Fridays grants rich provision.' },
  { id: 90, arabic: 'الْمَانِعُ', transliteration: 'Al-Mani’', english: 'The Withholder & Preventer', urdu: 'روکنے والا', meaning: 'The One who prevents harm or withhold things out of wisdom.', virtue: 'Reciting during marital disagreement restores harmony.' },
  { id: 91, arabic: 'الضَّارُّ', transliteration: 'Ad-Darr', english: 'The Creator of Harm', urdu: 'نقصان پہنچانے والا', meaning: 'The One in whose power alone lies distress and testing.', virtue: 'Reciting on Friday night elevates spiritual rank.' },
  { id: 92, arabic: 'النَّافِعُ', transliteration: 'An-Nafi’', english: 'The Creator of Good & Benefit', urdu: 'نفع پہنچانے والا', meaning: 'The One who brings benefit to whoever He wills.', virtue: 'Reciting prior to embarking on a journey ensures safety.' },
  { id: 93, arabic: 'النُّورُ', transliteration: 'An-Nur', english: 'The Light', urdu: 'روشنی اور نور', meaning: 'The Light of the heavens and earth who guides souls.', virtue: 'Reciting Surah An-Nur verse 35 with this name illuminates heart.' },
  { id: 94, arabic: 'الْهَادِي', transliteration: 'Al-Hadi', english: 'The Guide', urdu: 'ہدایت دینے والا', meaning: 'The One who provides guidance to truth and righteousness.', virtue: 'Reciting grants spiritual wisdom and right path.' },
  { id: 95, arabic: 'الْبَدِيعُ', transliteration: 'Al-Badi’', english: 'The Incomparable Originator', urdu: 'انسان کا ایجاد کرنے والا', meaning: 'The One who creates wondrous things without precedent.', virtue: 'Reciting 70 times when distressed grants divine relief.' },
  { id: 96, arabic: 'الْبَاقِي', transliteration: 'Al-Baqi', english: 'The Everlasting', urdu: 'ہمیشہ رہنے والا', meaning: 'The One whose existence endures forever, without end.', virtue: 'Reciting 100 times before sunrise keeps good deeds accepted.' },
  { id: 97, arabic: 'الْوَارِثُ', transliteration: 'Al-Warith', english: 'The Ultimate Inheritor', urdu: 'وارث', meaning: 'The One who inherits all when creation passes away.', virtue: 'Reciting 100 times grants long life and safety.' },
  { id: 98, arabic: 'الرَّشِيدُ', transliteration: 'Ar-Rasheed', english: 'The Guide to Right Path', urdu: 'ہدایت دینے والا رہنما', meaning: 'The One who directs all matters toward their beneficial outcome.', virtue: 'Reciting 1000 times between Maghrib and Isha solves complex problems.' },
  { id: 99, arabic: 'الصَّبُورُ', transliteration: 'As-Saboor', english: 'The Most Patient', urdu: 'بہت صبر کرنے والا', meaning: 'The One who is patient and does not hasten penalty.', virtue: 'Reciting 33 times daily grants endurance in trials.' },
];

export const NamesOfAllahView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('alquran_names_favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'all' | 'favs'>('all');

  const toggleFavorite = (id: number) => {
    let updated: number[];
    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('alquran_names_favs', JSON.stringify(updated));
  };

  const playPronunciation = (name: AsmaUlHusna) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredNames = NAMES_DATA.filter((name) => {
    const matchesSearch =
      name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.urdu.includes(searchTerm) ||
      name.arabic.includes(searchTerm) ||
      name.id.toString() === searchTerm.trim();

    if (activeTab === 'favs') {
      return matchesSearch && favorites.includes(name.id);
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#064E3B] via-[#04382A] to-[#D4AF37]/40 p-6 sm:p-8 text-white border border-[#D4AF37]/50 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Asma-ul-Husna (أسماء الله الحسنى)
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">99 Beautiful Names of Allah</h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans max-w-2xl">
          "And to Allah belong the best names, so invoke Him by them." — Surah Al-A'raf [7:180]. Explore meanings, Urdu translations, and virtues of each divine name offline.
        </p>

        {/* Tab Switcher & Search Bar */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#D4AF37] text-[#064E3B] shadow'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              All Names (99)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('favs')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'favs'
                  ? 'bg-[#D4AF37] text-[#064E3B] shadow'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" /> Favorites ({favorites.length})
            </button>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, English, Urdu or number..."
              className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-emerald-200/60 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* Grid of Names */}
      {filteredNames.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 space-y-2">
          <p className="text-gray-500 font-medium text-sm">No divine names matched your search query.</p>
          <button
            type="button"
            onClick={() => { setSearchTerm(''); setActiveTab('all'); }}
            className="text-xs font-bold text-[#064E3B] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNames.map((name) => {
            const isFav = favorites.includes(name.id);
            return (
              <div
                key={name.id}
                className="bg-white rounded-3xl border border-gray-200/90 hover:border-[#064E3B] shadow-sm hover:shadow-md transition-all p-5 space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar Number & Actions */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                    <span className="w-8 h-8 rounded-xl bg-[#064E3B]/10 text-[#064E3B] font-mono font-bold text-xs flex items-center justify-center">
                      #{name.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => playPronunciation(name)}
                        className="p-2 rounded-xl bg-emerald-50 text-[#064E3B] hover:bg-[#064E3B] hover:text-[#D4AF37] transition cursor-pointer"
                        title="Listen Audio Pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(name.id)}
                        className={`p-2 rounded-xl transition cursor-pointer ${
                          isFav
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-gray-100 text-gray-400 hover:text-rose-500'
                        }`}
                        title="Toggle Favorite"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Arabic Display */}
                  <div className="text-center my-2">
                    <h2 className="text-3xl font-serif text-[#064E3B] font-bold tracking-wide">
                      {name.arabic}
                    </h2>
                    <h3 className="text-sm font-bold text-gray-800 font-sans mt-1">
                      {name.transliteration} — <span className="text-emerald-800">{name.english}</span>
                    </h3>
                  </div>

                  {/* Urdu Translation */}
                  <p className="text-center font-serif text-base text-[#064E3B] font-bold bg-[#FDFCF0] py-1.5 px-3 rounded-xl border border-[#D4AF37]/30 my-2">
                    {name.urdu}
                  </p>

                  {/* English Meaning */}
                  <p className="text-xs text-gray-600 leading-relaxed font-sans mt-2">
                    {name.meaning}
                  </p>
                </div>

                {/* Virtue Box */}
                <div className="pt-3 border-t border-gray-100 mt-2 bg-emerald-50/50 p-2.5 rounded-xl border-emerald-100">
                  <p className="text-[11px] text-[#064E3B] font-medium leading-tight">
                    <strong className="font-bold text-[#D4AF37]">Virtue & Fazail:</strong> {name.virtue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
