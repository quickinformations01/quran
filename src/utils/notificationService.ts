import { playReminderAlarm } from './soundEffects';

export interface PrayerReminderSetting {
  id: string;
  label: string;
  time: string;
  type: 'prayer' | 'tasbeeh';
  enabled: boolean;
  offsetMinutes?: number;
}

// Track fired alerts for today so we don't spam multiple times in the same minute
const alertedKeysToday = new Set<string>();

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
    }
  }
  return 'default';
};

export const getNotificationPermission = (): NotificationPermission => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    return Notification.permission;
  }
  return 'denied';
};

export const triggerLocalNotification = (title: string, body: string, icon = '/favicon.ico'): boolean => {
  let fired = false;

  // 1. Play Audio Alarm Sound
  try {
    playReminderAlarm();
  } catch (e) {
    console.warn('Audio playback restricted:', e);
  }

  // 2. Trigger Haptic Vibration if supported on mobile
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate([300, 150, 300, 150, 300]);
    } catch (e) {
      /* ignore */
    }
  }

  // 3. Web Push / Native Notification
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body,
            icon,
            badge: icon,
            tag: 'alquran-prayer-alert',
            vibrate: [300, 150, 300],
            requireInteraction: true
          } as any);
        });
      } else {
        new Notification(title, {
          body,
          icon,
          tag: 'alquran-prayer-alert'
        });
      }
      fired = true;
    } catch (err) {
      console.warn('Error displaying Notification:', err);
    }
  }

  return fired;
};

export const scheduleTestNotification = (delaySeconds = 10, onTriggered?: () => void) => {
  setTimeout(() => {
    triggerLocalNotification(
      '🕌 Test Prayer & Adhkar Alert',
      'SubhanAllah! Local Prayer Notification system is active and working perfectly completely offline.'
    );
    if (onTriggered) onTriggered();
  }, delaySeconds * 1000);
};

export const checkAndTriggerPrayerReminders = (
  reminders: PrayerReminderSetting[],
  onAlertFired?: (reminder: PrayerReminderSetting) => void
) => {
  const now = new Date();
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeString = `${currentHours}:${currentMinutes}`;
  const dateString = now.toISOString().slice(0, 10);

  reminders.forEach((item) => {
    if (!item.enabled || !item.time) return;

    // Calculate effective time with offset if present
    let targetTime = item.time;
    if (item.offsetMinutes && item.offsetMinutes > 0) {
      const [h, m] = item.time.split(':').map(Number);
      const targetDate = new Date();
      targetDate.setHours(h, m - item.offsetMinutes, 0, 0);
      const offH = String(targetDate.getHours()).padStart(2, '0');
      const offM = String(targetDate.getMinutes()).padStart(2, '0');
      targetTime = `${offH}:${offM}`;
    }

    const alertKey = `${dateString}_${item.id}_${targetTime}`;

    if (currentTimeString === targetTime && !alertedKeysToday.has(alertKey)) {
      alertedKeysToday.add(alertKey);

      const title = item.type === 'prayer' ? `🕌 ${item.label} Time` : `📿 ${item.label}`;
      const body = item.type === 'prayer' 
        ? `It is time for ${item.label}. Come to Prayer, Come to Success (Hayya 'alas-Salah)!`
        : `Time for your daily spiritual Adhkar & Tasbeeh practice.`;

      triggerLocalNotification(title, body);

      if (onAlertFired) {
        onAlertFired(item);
      }
    }
  });
};
