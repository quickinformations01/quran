import React, { useState } from 'react';
import { Download, Upload, ShieldCheck, Database, CheckCircle2, AlertCircle, RefreshCw, Trash2 } from 'lucide-react';
import { forceAppUpdateAndClearCache, APP_VERSION } from '../utils/updateManager';

export const BackupRestoreView: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isClearingCache, setIsClearingCache] = useState<boolean>(false);

  const handleForceUpdateAndClearCache = async () => {
    setIsClearingCache(true);
    setStatusMessage({
      type: 'success',
      text: 'Clearing Service Worker caches, unregistering stale workers, and refreshing application...',
    });
    await forceAppUpdateAndClearCache();
  };

  const handleExportBackup = () => {
    try {
      const backupData: { [key: string]: any } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('alquran_')) {
          backupData[key] = localStorage.getItem(key);
        }
      }

      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', `AlQuran_App_Backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setStatusMessage({
        type: 'success',
        text: 'Backup JSON successfully exported! You can save this file securely.',
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Failed to generate backup JSON file.',
      });
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          let restoredCount = 0;
          Object.keys(parsed).forEach((key) => {
            if (key.startsWith('alquran_')) {
              localStorage.setItem(key, parsed[key]);
              restoredCount++;
            }
          });

          setStatusMessage({
            type: 'success',
            text: `Restored ${restoredCount} items from backup! Refreshing app state...`,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (err) {
          setStatusMessage({
            type: 'error',
            text: 'Invalid JSON backup file format. Restore aborted.',
          });
        }
      };
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      {/* Banner Card */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#334155] p-6 sm:p-8 text-white border border-slate-700 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
          <Database className="w-4 h-4" /> Local Storage Security & Data Control
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">Offline Backup & Restore</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
          All your bookmarks, reading positions, Tasbeeh history, and prayer preferences stay strictly on your local device. Export your complete data as a JSON file or restore anytime.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 border text-xs font-semibold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:border-[#064E3B] transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-serif font-bold text-gray-900">Export Local Backup</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Downloads a complete `.json` file containing all your bookmarks, custom prayer calculation settings, reading history, and Tasbeeh counts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportBackup}
            className="w-full py-3 px-4 rounded-2xl bg-[#064E3B] text-[#D4AF37] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Export Backup JSON File
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:border-[#064E3B] transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-serif font-bold text-gray-900">Restore From Backup</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Select an exported `.json` file from your device storage to restore all your previously saved bookmarks and settings.
            </p>
          </div>

          <label className="w-full py-3 px-4 rounded-2xl bg-[#D4AF37] text-[#064E3B] font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer shadow-md flex items-center justify-center gap-2 text-center">
            <Upload className="w-4 h-4" /> Select & Restore JSON File
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>
        </div>

        {/* Update & Clear Cache Card */}
        <div className="bg-white rounded-3xl border border-amber-200 bg-amber-50/20 p-6 shadow-sm hover:border-amber-400 transition-all space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#064E3B] flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#064E3B]" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-bold text-gray-900">App Version {APP_VERSION}</h2>
              <span className="bg-amber-200 text-[#064E3B] text-[10px] font-bold px-2 py-0.5 rounded-md">Latest</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Unregisters old Service Worker instances, purges stale offline caches, and reloads the app to ensure you have the latest updates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleForceUpdateAndClearCache}
            disabled={isClearingCache}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isClearingCache ? 'animate-spin' : ''}`} />
            <span>{isClearingCache ? 'Updating & Clearing Cache...' : 'Force App Update & Clear Cache'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
