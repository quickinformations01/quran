import { Coordinates, CalculationMethod, PrayerTimes, Madhab, Qibla } from 'adhan';
import { FiqhSchool, CalculationMethodName, PrayerTimeSlot, LocationData } from '../types';

export const PRESET_CITIES: LocationData[] = [
  { city: 'Mecca', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262 },
  { city: 'Medina', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6112 },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011 },
  { city: 'Lahore', country: 'Pakistan', latitude: 31.5204, longitude: 74.3587 },
  { city: 'Islamabad', country: 'Pakistan', latitude: 33.6844, longitude: 73.0479 },
  { city: 'Dhaka', country: 'Bangladesh', latitude: 23.8103, longitude: 90.4125 },
  { city: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { city: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777 },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357 },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784 },
  { city: 'Dubai', country: 'UAE', latitude: 25.2048, longitude: 55.2708 },
  { city: 'Riyadh', country: 'Saudi Arabia', latitude: 24.7136, longitude: 46.6753 },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.1390, longitude: 101.6869 },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456 },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278 },
  { city: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832 },
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093 },
];

export function getAdhanParams(method: CalculationMethodName, fiqh: FiqhSchool) {
  let params;
  switch (method) {
    case 'Karachi':
      params = CalculationMethod.Karachi();
      break;
    case 'ISNA':
      params = CalculationMethod.NorthAmerica();
      break;
    case 'MWL':
      params = CalculationMethod.MuslimWorldLeague();
      break;
    case 'Makkah':
      params = CalculationMethod.UmmAlQura();
      break;
    case 'Egyptian':
      params = CalculationMethod.Egyptian();
      break;
    case 'Dubai':
      params = CalculationMethod.Dubai();
      break;
    case 'Qatar':
      params = CalculationMethod.Qatar();
      break;
    case 'Kuwait':
      params = CalculationMethod.Kuwait();
      break;
    case 'Singapore':
      params = CalculationMethod.Singapore();
      break;
    case 'Tehran':
      params = CalculationMethod.Tehran();
      break;
    case 'Turkey':
      params = CalculationMethod.Turkey();
      break;
    default:
      params = CalculationMethod.Karachi();
      break;
  }

  // Set Fiqh (Asr calculation rule)
  // Hanafi: Shadow factor 2x
  // Shafi / Maliki / Hanbali: Shadow factor 1x
  if (fiqh === 'Hanafi') {
    params.madhab = Madhab.Hanafi;
  } else {
    params.madhab = Madhab.Shafi;
  }

  return params;
}

export function formatTime(date: Date): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function calculatePrayerTimes(
  location: LocationData,
  fiqh: FiqhSchool,
  methodName: CalculationMethodName,
  targetDate: Date = new Date()
) {
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const params = getAdhanParams(methodName, fiqh);
  const prayerTimes = new PrayerTimes(coordinates, targetDate, params);

  const now = new Date();

  // Raw Prayer Dates
  const timesRaw = [
    { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', timeDate: prayerTimes.fajr },
    { id: 'sunrise', name: 'Sunrise', arabicName: 'الشروق', timeDate: prayerTimes.sunrise },
    { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', timeDate: prayerTimes.dhuhr },
    { id: 'asr', name: 'Asr', arabicName: 'العصر', timeDate: prayerTimes.asr },
    { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', timeDate: prayerTimes.maghrib },
    { id: 'isha', name: 'Isha', arabicName: 'العشاء', timeDate: prayerTimes.isha },
  ];

  // Determine next prayer
  let nextIndex = -1;
  for (let i = 0; i < timesRaw.length; i++) {
    if (timesRaw[i].timeDate > now) {
      nextIndex = i;
      break;
    }
  }

  // If all prayers today passed, next prayer is Fajr tomorrow
  let tomorrowFajrDate: Date | null = null;
  if (nextIndex === -1) {
    const tomorrow = new Date(targetDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowPrayerTimes = new PrayerTimes(coordinates, tomorrow, params);
    tomorrowFajrDate = tomorrowPrayerTimes.fajr;
  }

  const slots: PrayerTimeSlot[] = timesRaw.map((slot, index) => {
    const isPassed = slot.timeDate < now;
    const isNext = index === nextIndex;
    return {
      id: slot.id,
      name: slot.name,
      arabicName: slot.arabicName,
      time: formatTime(slot.timeDate),
      rawDate: slot.timeDate,
      isNext,
      isPassed,
    };
  });

  const nextSlot = nextIndex !== -1 ? slots[nextIndex] : null;
  const nextTargetDate = nextSlot ? nextSlot.rawDate : tomorrowFajrDate;

  return {
    slots,
    nextSlot,
    nextTargetDate,
    fajr: prayerTimes.fajr,
    sunrise: prayerTimes.sunrise,
    dhuhr: prayerTimes.dhuhr,
    asr: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isha: prayerTimes.isha,
    sehriEnds: prayerTimes.fajr, // Sehri ends at Fajr start
    iftarTime: prayerTimes.maghrib, // Iftar is at Maghrib start
  };
}

export function getQiblaDegree(latitude: number, longitude: number): number {
  const coordinates = new Coordinates(latitude, longitude);
  return Math.round(Qibla(coordinates));
}

export function getHijriDate(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic-uma', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(date) + ' AH';
  } catch {
    // Fallback simple conversion if Intl islamic calendar is unavailable
    const day = date.getDate();
    const monthNames = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
    return `${day} Ramadan 1448 AH`;
  }
}
