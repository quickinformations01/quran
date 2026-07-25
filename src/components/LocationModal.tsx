import React, { useState } from 'react';
import { X, MapPin, Navigation, Search, Check, Globe } from 'lucide-react';
import { LocationData } from '../types';
import { PRESET_CITIES } from '../utils/prayerCalculator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
}

export const LocationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation
}) => {
  const [search, setSearch] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [customLat, setCustomLat] = useState('');
  const [customLng, setCustomLng] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  if (!isOpen) return null;

  const handleGPSDetect = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const newLoc: LocationData = {
          city: 'My Current Location',
          country: 'GPS Detected',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          isCustomGPS: true,
        };
        onSelectLocation(newLoc);
        onClose();
      },
      (err) => {
        setIsLocating(false);
        setGpsError('GPS permission denied or unavailable. Please select a city below.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      onSelectLocation({
        city: 'Custom Coordinates',
        country: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
        latitude: lat,
        longitude: lng,
        isCustomGPS: true,
      });
      onClose();
    }
  };

  const filteredCities = PRESET_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-6 shadow-2xl text-gray-900 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#064E3B]" />
            <h2 className="text-xl font-bold font-serif text-gray-900">Select Location</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Auto-detect Button */}
        <button
          onClick={handleGPSDetect}
          disabled={isLocating}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#064E3B] hover:bg-[#064E3B]/90 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-70"
        >
          {isLocating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Detecting GPS Coordinates...</span>
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span>Auto-Detect My GPS Location</span>
            </>
          )}
        </button>

        {gpsError && (
          <p className="text-xs text-[#b45309] bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium">
            {gpsError}
          </p>
        )}

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search city or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        {/* City Presets List */}
        <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 text-xs">
          {filteredCities.map((c) => {
            const isSelected = currentLocation.city === c.city;
            return (
              <button
                key={c.city}
                onClick={() => {
                  onSelectLocation(c);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#064E3B]/10 border-[#064E3B] text-[#064E3B] font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div>
                  <span className="block font-semibold">{c.city}</span>
                  <span className="text-[11px] opacity-70">{c.country}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#064E3B]" />}
              </button>
            );
          })}
        </div>

        {/* Custom Coordinates Collapsible */}
        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={() => setShowCustom(!showCustom)}
            className="text-xs text-[#064E3B] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Enter Custom Latitude & Longitude</span>
          </button>

          {showCustom && (
            <form onSubmit={handleCustomSubmit} className="mt-3 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude (e.g. 24.86)"
                  value={customLat}
                  onChange={(e) => setCustomLat(e.target.value)}
                  className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                  required
                />
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude (e.g. 67.00)"
                  value={customLng}
                  onChange={(e) => setCustomLng(e.target.value)}
                  className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#064E3B]/90 transition cursor-pointer"
              >
                Set Custom Location
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
