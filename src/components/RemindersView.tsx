import React, { useState, useEffect } from 'react';
import { Bell, Volume2, Clock, Sparkles, Check, Smartphone, CheckCircle2, Sliders, AlertCircle } from 'lucide-react';
import { playReminderAlarm } from '../utils/soundEffects';

interface ReminderItem {
  id: string;
  label: string;
  time: string;
  type: 'prayer' | 'tasbeeh';
  enabled: boolean;
  offsetMinutes?: number;
}

export const RemindersView: React.FC = () => {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    return typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default';
  });

  const [reminders, setReminders] = useState<ReminderItem[]>(() => {
    const saved = localStorage.getItem('alquran_reminders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      { id: 'fajr', label: 'Fajr Prayer Alarm', time: '05:00', type: 'prayer', enabled: true, offsetMinutes: 5 },
      { id: 'dhuhr', label: 'Dhuhr Prayer Alarm', time: '12:30', type: 'prayer', enabled: true, offsetMinutes: 0 },
      { id: 'asr', label: 'Asr Prayer Alarm', time: '16:15', type: 'prayer', enabled: true, offsetMinutes: 0 },
      { id: 'maghrib', label: 'Maghrib Prayer & Iftar', time: '18:45', type: 'prayer', enabled: true, offsetMinutes: 0 },
      { id: 'isha', label: 'Isha Prayer Alarm', time: '20:00', type: 'prayer', enabled: true, offsetMinutes: 0 },
      { id: 'morning_dhikr', label: 'Morning Adhkar & Tasbeeh', time: '07:00', type: 'tasbeeh', enabled: true },
      { id: 'evening_dhikr', label: 'Evening Adhkar & Tasbeeh', time: '17:30', type: 'tasbeeh', enabled: true },
      { id: 'night_dhikr', label: 'Bedtime Surah Mulk & Dhikr', time: '22:00', type: 'tasbeeh', enabled: true },
    ];
  });

  const [alarmTone, setAlarmTone] = useState<string>(() => {
    return localStorage.getItem('alquran_alarm_tone') || 'sacred_chime';
  });

  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('alquran_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('alquran_alarm_tone', alarmTone);
  }, [alarmTone]);

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const res = await Notification.requestPermission();
        setNotificationPermission(res);
      } catch (e) {
        /* ignore */
      }
    }
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const updateTime = (id: string, newTime: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, time: newTime } : r))
    );
  };

  const updateOffset = (id: string, offset: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, offsetMinutes: offset } : r))
    );
  };

  const handleTestAlarm = () => {
    playReminderAlarm();
    setTestSuccessMessage('🔊 Alarm sound & vibration tested successfully!');
    if (notificationPermission === 'granted' && typeof window !== 'undefined' && 'Notification' in window) {
      new Notification('Al-Quran & Namaz Alarm', {
        body: 'SubhanAllah! Prayer & Tasbeeh reminder notification is working.',
        icon: '/favicon.ico'
      });
    }
    setTimeout(() => setTestSuccessMessage(null), 3500);
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] text-white border border-[#D4AF37]/40 p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-3">
          <Bell className="w-3.5 h-3.5" /> Prayer & Tasbeeh Reminders
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mb-2">
          Namaz & Dhikr Notifications
        </h2>
        <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-sans">
          Never miss a Prayer or daily Adhkar. Set custom alarm times, pre-azan warnings, and audio chimes for your daily spiritual routine.
        </p>

        {/* Permission Switch Card */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-medium text-emerald-100">
              Browser Push Notifications:
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              notificationPermission === 'granted' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-amber-500/20 text-[#D4AF37]'
            }`}>
              {notificationPermission === 'granted' ? 'Enabled' : 'Click to Enable'}
            </span>
          </div>

          {notificationPermission !== 'granted' && (
            <button
              onClick={requestNotificationPermission}
              className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#064E3B] font-bold text-xs hover:bg-amber-400 transition cursor-pointer shadow-sm"
            >
              Enable Notifications
            </button>
          )}
        </div>
      </div>

      {/* Test Alarm Sound Bar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#064E3B]" /> Alarm Sound & Tone
          </h3>
          <p className="text-xs text-gray-500">
            Select your preferred chime and test the sound on your device.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={alarmTone}
            onChange={(e) => setAlarmTone(e.target.value)}
            className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 font-medium focus:outline-none focus:border-[#064E3B]"
          >
            <option value="sacred_chime">Sacred Chime</option>
            <option value="gentle_bell">Gentle Bell Tone</option>
            <option value="soft_beep">Soft Beep Alarm</option>
          </select>

          <button
            onClick={handleTestAlarm}
            className="px-3.5 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#064E3B]/90 transition cursor-pointer shrink-0 shadow-sm flex items-center gap-1.5"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Test Sound</span>
          </button>
        </div>
      </div>

      {testSuccessMessage && (
        <div className="p-3 rounded-2xl bg-[#064E3B]/10 border border-[#064E3B]/30 text-[#064E3B] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />
          <span>{testSuccessMessage}</span>
        </div>
      )}

      {/* Prayer Time Alarms */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#064E3B]" /> Namaz Prayer Alarms
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reminders.filter(r => r.type === 'prayer').map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.enabled
                  ? 'bg-white border-gray-200 shadow-sm'
                  : 'bg-gray-50/80 border-gray-200/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => toggleReminder(item.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#064E3B]" />
                </label>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <input
                    type="time"
                    value={item.time}
                    onChange={(e) => updateTime(item.id, e.target.value)}
                    className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 font-mono font-bold text-xs"
                    disabled={!item.enabled}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[11px] text-gray-500">Alert:</span>
                  <select
                    value={item.offsetMinutes || 0}
                    onChange={(e) => updateOffset(item.id, Number(e.target.value))}
                    disabled={!item.enabled}
                    className="p-1 rounded-lg bg-gray-50 border border-gray-200 text-[11px] font-medium text-gray-700"
                  >
                    <option value={0}>At Exact Time</option>
                    <option value={5}>5 mins before</option>
                    <option value={10}>10 mins before</option>
                    <option value={15}>15 mins before</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasbeeh & Dhikr Daily Practice Alarms */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#064E3B]" /> Daily Tasbeeh & Adhkar Reminders
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {reminders.filter(r => r.type === 'tasbeeh').map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.enabled
                  ? 'bg-white border-gray-200 shadow-sm'
                  : 'bg-gray-50/80 border-gray-200/60 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-900">{item.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => toggleReminder(item.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#064E3B]" />
                </label>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <input
                  type="time"
                  value={item.time}
                  onChange={(e) => updateTime(item.id, e.target.value)}
                  className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 font-mono font-bold text-xs"
                  disabled={!item.enabled}
                />
                <span className="text-[11px] text-[#064E3B] font-semibold bg-[#064E3B]/10 px-2 py-0.5 rounded">
                  Daily Practice
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
