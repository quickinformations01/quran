import React, { useState, useEffect } from 'react';
import { RefreshCw, Sparkles, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { forceAppUpdateAndClearCache, APP_VERSION } from '../utils/updateManager';

export const UpdateNotificationBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    // Check if user dismissed banner for this session
    const isDismissed = sessionStorage.getItem('alquran_update_dismissed');
    const savedVersion = localStorage.getItem('alquran_app_version');

    if (!isDismissed && savedVersion !== APP_VERSION) {
      setShowBanner(true);
    }
  }, []);

  const handleApplyUpdate = async () => {
    setIsUpdating(true);
    await forceAppUpdateAndClearCache();
  };

  const handleDismiss = () => {
    sessionStorage.setItem('alquran_update_dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-[#D4AF37] text-emerald-950 px-4 py-2.5 shadow-md border-b border-amber-300 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-bold">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-950 shrink-0 animate-bounce" />
          <span>
            New Update Available ({APP_VERSION}) — Clear cache & load latest offline features!
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleApplyUpdate}
            disabled={isUpdating}
            className="px-3.5 py-1.5 rounded-xl bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold text-xs transition cursor-pointer shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${isUpdating ? 'animate-spin' : ''}`} />
            <span>{isUpdating ? 'Clearing Cache & Updating...' : 'Update & Clear Cache'}</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-lg hover:bg-black/10 text-emerald-950 transition cursor-pointer"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
