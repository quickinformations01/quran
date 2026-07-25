import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, ShieldCheck, Sparkles, Smartphone, Share, PlusSquare, ArrowRight, Laptop, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onInstalledOrUnlocked: () => void;
}

export const PWAInstallOverlay: React.FC<Props> = ({ onInstalledOrUnlocked }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (already installed & opened)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (isInStandaloneMode) {
      setIsStandalone(true);
      // Auto unlock directly
      onInstalledOrUnlocked();
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for standard PWA beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA] captured beforeinstallprompt event');
    };

    // Listen for appinstalled event (AUTO-OPEN behavior)
    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully!');
      setInstallSuccess(true);
      setTimeout(() => {
        onInstalledOrUnlocked();
      }, 1200);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [onInstalledOrUnlocked]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`[PWA] User response to install prompt: ${outcome}`);
        if (outcome === 'accepted') {
          setInstallSuccess(true);
          setTimeout(() => {
            onInstalledOrUnlocked();
          }, 1200);
        } else {
          setIsInstalling(false);
        }
      } catch (err) {
        console.warn('[PWA] Install prompt error:', err);
        setIsInstalling(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback if browser suppresses PWA prompt in preview iframe or desktop
      setIsInstalling(true);
      setInstallSuccess(true);
      setTimeout(() => {
        onInstalledOrUnlocked();
      }, 1000);
    }
  };

  if (isStandalone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg bg-[#064E3B] text-white border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
      >
        {/* Islamic Ornament Top Motif */}
        <div className="mx-auto mb-4 w-20 h-20 rounded-2xl bg-[#D4AF37] p-1 shadow-lg flex items-center justify-center">
          <div className="w-full h-full bg-[#064E3B] rounded-xl flex items-center justify-center border border-[#D4AF37]/50">
            <Sparkles className="w-10 h-10 text-[#D4AF37] animate-pulse" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wide uppercase mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> PWA Installation Required
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mb-2">
          Al-Quran & Namaz App
        </h1>
        <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          To access the complete Holy Quran, Manzil, Punch Surah, and accurate offline prayer times, please install this Progressive Web App on your device.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2.5 text-left mb-6 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg text-[#D4AF37]">📖</div>
            <div>
              <p className="font-semibold text-white">114 Surahs</p>
              <p className="text-emerald-100/80 text-[11px]">Full Quran with translations</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg text-[#D4AF37]">🕋</div>
            <div>
              <p className="font-semibold text-white">Namaz Times</p>
              <p className="text-emerald-100/80 text-[11px]">Hanafi & Shafi'i Offline Math</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg text-[#D4AF37]">🛡️</div>
            <div>
              <p className="font-semibold text-white">Manzil Verses</p>
              <p className="text-emerald-100/80 text-[11px]">Daily protection & Ruqyah</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/10 border border-white/10">
            <div className="p-1.5 bg-[#D4AF37]/20 rounded-lg text-[#D4AF37]">⚡</div>
            <div>
              <p className="font-semibold text-white">Punch Surahs</p>
              <p className="text-emerald-100/80 text-[11px]">Yaseen, Ar-Rahman, Mulk...</p>
            </div>
          </div>
        </div>

        {/* Install Action Button */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleInstallClick}
            disabled={isInstalling || installSuccess}
            className="w-full py-4 px-6 rounded-2xl bg-[#D4AF37] hover:bg-amber-400 text-[#064E3B] font-bold text-base shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-80"
          >
            {installSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-[#064E3B] animate-bounce" />
                <span>Installed! Opening Dashboard...</span>
              </>
            ) : isInstalling ? (
              <>
                <div className="w-5 h-5 border-2 border-[#064E3B] border-t-transparent rounded-full animate-spin" />
                <span>Installing Application...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5 text-[#064E3B]" />
                <span>Install App & Launch Dashboard</span>
              </>
            )}
          </motion.button>

          {/* Secondary Direct Unlock Trigger for Sandboxed Browsers / Desktop Web Preview */}
          <button
            onClick={() => {
              setInstallSuccess(true);
              setTimeout(onInstalledOrUnlocked, 600);
            }}
            className="w-full py-2.5 px-4 rounded-xl text-emerald-100 hover:text-white text-xs font-medium hover:bg-white/10 transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Preview in Web Browser</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>

        {/* iOS Safari Guided Steps Modal */}
        {isIOS && (
          <div className="mt-4 pt-3 border-t border-white/10 text-left text-xs text-emerald-100">
            <p className="font-semibold text-[#D4AF37] mb-1.5 flex items-center gap-1">
              <Smartphone className="w-4 h-4" /> Safari / iOS Installation Steps:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-emerald-100/90 text-[11px]">
              <li>Tap the <Share className="w-3.5 h-3.5 inline text-[#D4AF37] mx-0.5" /> <strong>Share</strong> button at the bottom of Safari.</li>
              <li>Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline text-[#D4AF37] mx-0.5" /> <strong>Add to Home Screen</strong>.</li>
              <li>Tap <strong>Add</strong> in the top right corner.</li>
            </ol>
          </div>
        )}

        <div className="mt-5 text-[11px] text-emerald-200/80 flex items-center justify-center gap-1">
          <HelpCircle className="w-3 h-3 text-[#D4AF37]" />
          <span>100% Free, Offline Compatible & Privacy Respecting</span>
        </div>
      </motion.div>
    </div>
  );
};
