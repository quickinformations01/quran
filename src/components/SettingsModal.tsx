import React from 'react';
import { X, Settings, Check, Sliders, Type, BookOpen, Bell } from 'lucide-react';
import { AppSettings, FiqhSchool, CalculationMethodName } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  settings,
  setSettings
}) => {
  if (!isOpen) return null;

  const calculationMethods: { id: CalculationMethodName; label: string }[] = [
    { id: 'Karachi', label: 'Univ. of Islamic Sciences, Karachi (Pak/Ind/Bgd)' },
    { id: 'ISNA', label: 'Islamic Society of North America (ISNA)' },
    { id: 'MWL', label: 'Muslim World League (MWL)' },
    { id: 'Makkah', label: 'Umm Al-Qura University, Makkah' },
    { id: 'Egyptian', label: 'Egyptian General Authority of Survey' },
    { id: 'Dubai', label: 'Dubai / UAE Official' },
    { id: 'Qatar', label: 'Qatar Ministry of Awqaf' },
    { id: 'Kuwait', label: 'Kuwait Ministry of Awqaf' },
    { id: 'Singapore', label: 'MUIS, Singapore' },
    { id: 'Turkey', label: 'Diyanet İşleri Başkanlığı, Turkey' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl text-gray-900 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#064E3B]" />
            <h2 className="text-xl font-bold font-serif text-gray-900">Application Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fiqh Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#b45309] uppercase tracking-wider block">
            Select Fiqa / Madhab (Asr Time Calculation)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSettings({ ...settings, fiqh: 'Hanafi' })}
              className={`p-3 rounded-2xl border text-left text-xs font-semibold transition cursor-pointer ${
                settings.fiqh === 'Hanafi'
                  ? 'bg-[#064E3B] text-white border-[#D4AF37] font-bold shadow-sm'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#064E3B]'
              }`}
            >
              <span className="block text-sm mb-0.5">Hanafi (حنيفي)</span>
              <span className="text-[11px] opacity-80">Asr shadow ratio 2:1</span>
            </button>

            <button
              onClick={() => setSettings({ ...settings, fiqh: 'Shafi' })}
              className={`p-3 rounded-2xl border text-left text-xs font-semibold transition cursor-pointer ${
                settings.fiqh === 'Shafi'
                  ? 'bg-[#064E3B] text-white border-[#D4AF37] font-bold shadow-sm'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-[#064E3B]'
              }`}
            >
              <span className="block text-sm mb-0.5">Shafi'i / Maliki / Hanbali</span>
              <span className="text-[11px] opacity-80">Asr shadow ratio 1:1</span>
            </button>
          </div>
        </div>

        {/* Calculation Method Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#b45309] uppercase tracking-wider block">
            Prayer Calculation Method
          </label>
          <select
            value={settings.calculationMethod}
            onChange={(e) => setSettings({ ...settings, calculationMethod: e.target.value as CalculationMethodName })}
            className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium focus:outline-none focus:border-[#064E3B]"
          >
            {calculationMethods.map((m) => (
              <option key={m.id} value={m.id} className="bg-white text-gray-900">
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Customization */}
        <div className="space-y-4 pt-2 border-t border-gray-200">
          <label className="text-xs font-bold text-[#b45309] uppercase tracking-wider block">
            Quran Display & Typography
          </label>

          {/* Size Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-700">
              <span>Arabic Text Size</span>
              <span className="font-bold text-[#064E3B]">{settings.arabicFontSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="44"
              value={settings.arabicFontSize}
              onChange={(e) => setSettings({ ...settings, arabicFontSize: Number(e.target.value) })}
              className="w-full accent-[#064E3B] bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Font Family Choice */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-700">Arabic Calligraphy Font</span>
            <div className="flex gap-1">
              {(['Amiri', 'Scheherazade New'] as const).map((font) => (
                <button
                  key={font}
                  onClick={() => setSettings({ ...settings, arabicFontFamily: font })}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
                    settings.arabicFontFamily === font
                      ? 'bg-[#064E3B] text-white font-bold'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          {/* Translation Toggles */}
          <div className="space-y-2 pt-2">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs cursor-pointer">
              <span className="text-gray-800 font-medium">Show English Translation</span>
              <input
                type="checkbox"
                checked={settings.showTranslation}
                onChange={(e) => setSettings({ ...settings, showTranslation: e.target.checked })}
                className="w-4 h-4 accent-[#064E3B] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs cursor-pointer">
              <span className="text-gray-800 font-medium">Show Urdu Translation</span>
              <input
                type="checkbox"
                checked={settings.showUrdu}
                onChange={(e) => setSettings({ ...settings, showUrdu: e.target.checked })}
                className="w-4 h-4 accent-[#064E3B] rounded"
              />
            </label>
          </div>
        </div>

        {/* Local Prayer Notifications Toggle */}
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <label className="text-xs font-bold text-[#b45309] uppercase tracking-wider block">
            Prayer & Adhkar Notifications
          </label>
          <label className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs cursor-pointer">
            <div className="space-y-0.5 pr-2">
              <span className="text-gray-900 font-bold block flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#064E3B]" /> Enable Offline Local Prayer Alarms
              </span>
              <span className="text-[11px] text-gray-500 block">
                Triggers audio alarms & native browser alerts at computed prayer times.
              </span>
            </div>
            <input
              type="checkbox"
              checked={settings.enablePrayerNotifications !== false}
              onChange={(e) => setSettings({ ...settings, enablePrayerNotifications: e.target.checked })}
              className="w-5 h-5 accent-[#064E3B] rounded cursor-pointer shrink-0"
            />
          </label>
        </div>

        {/* Done Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold text-sm shadow-md transition cursor-pointer"
        >
          Save & Apply Settings
        </button>
      </div>
    </div>
  );
};
