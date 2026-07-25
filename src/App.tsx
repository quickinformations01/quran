import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NamazTimesView } from './components/NamazTimesView';
import { QuranView } from './components/QuranView';
import { ManzilView } from './components/ManzilView';
import { PunchSurahView } from './components/PunchSurahView';
import { TasbeehView } from './components/TasbeehView';
import { SettingsModal } from './components/SettingsModal';
import { LocationModal } from './components/LocationModal';
import { PWAInstallOverlay } from './components/PWAInstallOverlay';
import { AppSettings, LocationData, Bookmark } from './types';
import { PRESET_CITIES } from './utils/prayerCalculator';

export default function App() {
  // PWA Installation Gate state
  const [isAppUnlocked, setIsAppUnlocked] = useState<boolean>(() => {
    // If running in standalone PWA or user previously unlocked, unlock
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    const unlockedLocal = localStorage.getItem('alquran_pwa_unlocked');
    return isStandalone || unlockedLocal === 'true';
  });

  // Navigation Tab ('namaz', 'quran', 'manzil', 'punch', 'tasbeeh')
  const [activeTab, setActiveTab] = useState<string>('namaz');

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

  const handleUnlockApp = () => {
    localStorage.setItem('alquran_pwa_unlocked', 'true');
    setIsAppUnlocked(true);
  };

  const stopAllAudio = () => {
    setCurrentlyPlayingAudio(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-gray-900 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#064E3B]">
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
            setActiveTab={setActiveTab}
            location={location}
            settings={settings}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenLocation={() => setIsLocationOpen(true)}
            currentlyPlayingAudio={currentlyPlayingAudio}
            onStopAudio={stopAllAudio}
          />

          {/* Main View Area */}
          <main className="flex-1 px-4 sm:px-6 py-6">
            {activeTab === 'namaz' && (
              <NamazTimesView
                location={location}
                setLocation={setLocation}
                settings={settings}
                setSettings={setSettings}
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

            {activeTab === 'tasbeeh' && <TasbeehView />}
          </main>

          {/* Bottom Tab Bar */}
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

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
