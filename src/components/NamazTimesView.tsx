import React, { useState, useEffect } from 'react';
import { 
  Clock, Compass, MapPin, Navigation, ChevronRight, 
  Sparkles, RefreshCw, AlertCircle, Check, Info, Shield, Sun, Moon
} from 'lucide-react';
import { LocationData, AppSettings, FiqhSchool, CalculationMethodName } from '../types';
import { 
  calculatePrayerTimes, getQiblaDegree, PRESET_CITIES 
} from '../utils/prayerCalculator';

interface Props {
  location: LocationData;
  setLocation: (loc: LocationData) => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onOpenLocationModal: () => void;
}

export const NamazTimesView: React.FC<Props> = ({
  location,
  setLocation,
  settings,
  setSettings,
  onOpenLocationModal,
}) => {
  const [now, setNow] = useState(new Date());
  const [qiblaAngle, setQiblaAngle] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);

  // Update clock every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate Prayer Times
  const prayerData = calculatePrayerTimes(location, settings.fiqh, settings.calculationMethod, now);

  // Qibla Degree
  useEffect(() => {
    const angle = getQiblaDegree(location.latitude, location.longitude);
    setQiblaAngle(angle);
  }, [location]);

  // Gyroscope / Compass Device Orientation for Qibla
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setDeviceHeading(360 - e.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Calculate Countdown to Next Prayer
  const getCountdownString = () => {
    if (!prayerData.nextTargetDate) return '00:00:00';
    const diff = prayerData.nextTargetDate.getTime() - now.getTime();
    if (diff <= 0) return '00:00:00';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle Fiqh quickly
  const toggleFiqh = (newFiqh: FiqhSchool) => {
    setSettings((prev) => ({ ...prev, fiqh: newFiqh }));
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Hero Card: Next Prayer & Live Countdown */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 sm:p-8 shadow-xl">
        {/* Subtle Background Pattern */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Next Namaz
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight">
              {prayerData.nextSlot ? prayerData.nextSlot.name : 'Fajr'}
            </h2>
            <p className="text-emerald-100/90 text-sm font-medium mt-0.5">
              {prayerData.nextSlot ? prayerData.nextSlot.arabicName : 'الفجر'} • Scheduled at {prayerData.nextSlot ? prayerData.nextSlot.time : '--:--'}
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="bg-black/20 border border-[#D4AF37]/30 rounded-2xl p-4 text-center min-w-[160px] shadow-inner">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block mb-1">Time Remaining</span>
            <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wider">
              {getCountdownString()}
            </span>
          </div>
        </div>

        {/* Suhoor & Iftar Fast Tracker */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs sm:text-sm">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-emerald-100/80 block text-[11px]">Sehri Ends (Fajr)</span>
              <span className="font-bold text-white">{prayerData.slots[0].time}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <span className="text-emerald-100/80 block text-[11px]">Iftar Time (Maghrib)</span>
              <span className="font-bold text-white">{prayerData.slots[4].time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fiqh & Location Selector Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-gray-200/90 rounded-2xl p-4 shadow-sm">
        {/* Fiqh School Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fiqa:</span>
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              onClick={() => toggleFiqh('Hanafi')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                settings.fiqh === 'Hanafi'
                  ? 'bg-[#064E3B] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hanafi
            </button>
            <button
              onClick={() => toggleFiqh('Shafi')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                settings.fiqh === 'Shafi'
                  ? 'bg-[#064E3B] text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Shafi'i / Maliki / Hanbali
            </button>
          </div>
        </div>

        {/* Method & Location */}
        <button
          onClick={onOpenLocationModal}
          className="flex items-center justify-between sm:justify-end gap-2 text-xs text-[#064E3B] font-semibold hover:underline cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#b45309]" />
            <span>{location.city}, {location.country}</span>
          </div>
          <span className="text-gray-500 text-[11px]">({settings.calculationMethod})</span>
        </button>
      </div>

      {/* Prayer Time Cards List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {prayerData.slots.map((slot) => {
          const isNext = slot.isNext;
          const isPassed = slot.isPassed;

          return (
            <div
              key={slot.id}
              className={`relative overflow-hidden rounded-xl p-4 border transition-all text-center ${
                isNext
                  ? 'bg-[#064E3B] border-[#D4AF37] text-white shadow-md'
                  : isPassed
                  ? 'bg-gray-50/80 border-gray-200 text-gray-400'
                  : 'bg-white border-gray-200 text-gray-800 shadow-sm hover:border-[#064E3B]/40'
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-wider ${isNext ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                {slot.name}
              </p>
              <p className={`text-xl sm:text-2xl font-bold my-1 ${isNext ? 'text-white' : 'text-gray-900'}`}>
                {slot.time}
              </p>
              <p className={`text-xs font-serif ${isNext ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                {slot.arabicName}
              </p>
              {isNext && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#D4AF37] text-[#064E3B] text-[10px] font-bold uppercase tracking-wider">
                  Next Prayer
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Qibla Compass Widget */}
      <div className="rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-[#064E3B]" />
          <h3 className="text-lg font-bold font-serif text-gray-900">Qibla Direction</h3>
        </div>
        <p className="text-xs text-gray-600 mb-6">
          Direction to Holy Kaaba (Makkah): <strong className="text-[#064E3B]">{qiblaAngle}° Clockwise from True North</strong>
        </p>

        {/* Graphical Compass Dial */}
        <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-gray-200 bg-[#FDFCF0] flex items-center justify-center shadow-inner">
          {/* Compass Degrees Marking */}
          <div className="absolute top-2 text-[10px] font-bold text-[#b45309]">N</div>
          <div className="absolute right-2 text-[10px] font-bold text-gray-400">E</div>
          <div className="absolute bottom-2 text-[10px] font-bold text-gray-400">S</div>
          <div className="absolute left-2 text-[10px] font-bold text-gray-400">W</div>

          {/* Qibla Needle Pointing to Makkah Angle */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-700"
            style={{ transform: `rotate(${qiblaAngle - (deviceHeading || 0)}deg)` }}
          >
            <div className="w-full flex justify-between items-center px-4 pointer-events-none">
              <div className="w-1/2 flex items-center justify-end pr-2">
                <div className="flex items-center gap-1 bg-[#064E3B] text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-md">
                  <span>🕋</span>
                  <span>Kaaba</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-white border-2 border-[#064E3B] flex items-center justify-center z-10 text-[#064E3B] font-bold text-xs shadow-sm">
            {qiblaAngle}°
          </div>
        </div>
      </div>
    </div>
  );
};
