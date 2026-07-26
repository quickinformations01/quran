import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeGridView } from './components/HomeGridView';
import { NamazTimesView } from './components/NamazTimesView';
import { QuranView } from './components/QuranView';
import { ManzilView } from './components/ManzilView';
import { PunchSurahView } from './components/PunchSurahView';
import { TasbeehView } from './components/TasbeehView';
import { RemindersView } from './components/RemindersView';
import { NamesOfAllahView } from './components/NamesOfAllahView';
import { DuasAzkarView } from './components/DuasAzkarView';
import { IslamicCalendarView } from './components/IslamicCalendarView';
import { BackupRestoreView } from './components/BackupRestoreView';
import { SettingsModal } from './components/SettingsModal';
import { LocationModal } from './components/LocationModal';
import { PWAInstallOverlay } from './components/PWAInstallOverlay';
import { UpdateNotificationBanner } from './components/UpdateNotificationBanner';
import { AppSettings, LocationData, Bookmark } from './types';
import { PRESET_CITIES } from './utils/prayerCalculator';
import { checkAndTriggerPrayerReminders } from './utils/notificationService';
import { Download } from 'lucide-react';

export default function App() {
  // PWA Installation state (Always unlocked by default so users have instant access)
  const [isAppUnlocked, setIsAppUnlocked] = useState<boolean>(true);

  // Check if currently running standalone PWA
  const isStandalone = typeof window !== 'undefined' && (
    window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true
  );

  // Navigation Tab ('home', 'quran', 'namaz', 'tasbeeh', 'reminders', 'manzil', 'punch')
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('alquran_active_tab') || 'home';
  });

  // Location State
  const [location, setLocation] = useState<LocationData>(() => {
    const saved = localStorage.getItem('alquran_location');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return PRESET_CITIES[2]; // Default to Karachi (Pakistan / South Asia standard)
  });

  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('alquran_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {
      fiqh: 'Hanafi',
      calculationMethod: 'Karachi',
      arabicFontSize: 28,
      showTranslation: true,
      showUrdu: true,
      showTransliteration: true,
      arabicFontFamily: 'Amiri',
      nightMode: true,
    };
  });

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('alquran_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // Currently playing global audio
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);

  // Modal visibility
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('alquran_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('alquran_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('alquran_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Scroll to top and save active tab whenever activeTab changes
  useEffect(() => {
    localStorage.setItem('alquran_active_tab', activeTab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Periodic Background Local Prayer Reminder Checker (runs every 30 seconds)
  useEffect(() => {
    const checkReminders = () => {
      try {
        const saved = localStorage.getItem('alquran_reminders');
        if (saved) {
          const list = JSON.parse(saved);
          checkAndTriggerPrayerReminders(list);
        }
      } catch (e) {
        /* ignore */
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlockApp = (initialTab?: string) => {
    localStorage.setItem('alquran_pwa_unlocked', 'true');
    setIsAppUnlocked(true);
    if (initialTab) {
      setActiveTab(initialTab);
    }
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const stopAllAudio = () => {
    setCurrentlyPlayingAudio(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-gray-900 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#064E3B]">
      {/* Top App Update Notification Banner */}
      <UpdateNotificationBanner />

      {/* Installation Gate Overlay */}
      {!isAppUnlocked && (
        <PWAInstallOverlay onInstalledOrUnlocked={handleUnlockApp} />
      )}

      {/* Main Application Container */}
      {isAppUnlocked && (
        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto shadow-xl bg-[#FDFCF0] min-h-screen border-x border-gray-200/80">
          {/* Header Bar */}
          <Header
            activeTab={activeTab}
            setActiveTab={handleSelectTab}
            location={location}
            settings={settings}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenLocation={() => setIsLocationOpen(true)}
            currentlyPlayingAudio={currentlyPlayingAudio}
            onStopAudio={stopAllAudio}
          />

          {/* Main View Area */}
          <main className="flex-1 px-4 sm:px-6 py-6">
            {activeTab === 'home' && (
              <HomeGridView
                onSelectTab={handleSelectTab}
                location={location}
                settings={settings}
                onOpenLocationModal={() => setIsLocationOpen(true)}
              />
            )}

            {activeTab === 'quran' && (
              <QuranView
                settings={settings}
                setSettings={setSettings}
                currentlyPlayingAudio={currentlyPlayingAudio}
                setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
              />
            )}

            {activeTab === 'manzil' && (
              <ManzilView
                settings={settings}
                currentlyPlayingAudio={currentlyPlayingAudio}
                setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
              />
            )}

            {activeTab === 'punch' && (
              <PunchSurahView
                settings={settings}
                currentlyPlayingAudio={currentlyPlayingAudio}
                setCurrentlyPlayingAudio={setCurrentlyPlayingAudio}
              />
            )}

            {activeTab === 'namaz' && (
              <NamazTimesView
                location={location}
                setLocation={setLocation}
                settings={settings}
                setSettings={setSettings}
                onOpenLocationModal={() => setIsLocationOpen(true)}
              />
            )}

            {activeTab === 'tasbeeh' && <TasbeehView />}

            {activeTab === 'reminders' && <RemindersView />}

            {activeTab === 'names' && <NamesOfAllahView />}

            {activeTab === 'duas' && <DuasAzkarView />}

            {activeTab === 'calendar' && <IslamicCalendarView />}

            {activeTab === 'backup' && <BackupRestoreView />}
          </main>

          {/* Floating Install Shortcut Button if not standalone PWA */}
          {!isStandalone && (
            <button
              onClick={() => setIsAppUnlocked(false)}
              className="fixed bottom-20 right-4 z-30 p-3 rounded-full bg-[#064E3B] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl hover:scale-105 active:scale-95 transition flex items-center gap-1.5 font-bold text-xs cursor-pointer"
              title="Install App as PWA"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          {/* Bottom Tab Bar */}
          <BottomNav activeTab={activeTab} setActiveTab={handleSelectTab} />

          {/* Modals */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            setSettings={setSettings}
          />

          <LocationModal
            isOpen={isLocationOpen}
            onClose={() => setIsLocationOpen(false)}
            currentLocation={location}
            onSelectLocation={setLocation}
          />
        </div>
      )}
    </div>
  );
}
