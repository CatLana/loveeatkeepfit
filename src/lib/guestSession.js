/**
 * Guest Session Context
 * Provides a lightweight, localStorage-only guest identity for unauthenticated users.
 * No database record is created — name is stored in localStorage only.
 * A short-lived client cookie (lekf_guest=1) is also set so the middleware
 * can allow guests through to Lesson 1 without a real JWT session.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const GuestContext = createContext({
  isGuest: false,
  guestName: null,
  enterAsGuest: () => {},
  clearGuest: () => {},
});

const STORAGE_KEY = 'lekf_guest';
// Cookie lives for 24 hours — long enough for a reading session
const COOKIE_MAX_AGE = 60 * 60 * 24;

export function GuestProvider({ children }) {
  const [isGuest, setIsGuest] = useState(false);
  const [guestName, setGuestName] = useState(null);

  // Hydrate from localStorage on first client render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.isGuest && parsed?.name) {
          setIsGuest(true);
          setGuestName(parsed.name);
        }
      }
    } catch {
      // Silently ignore storage errors (private browsing, blocked cookies, etc.)
    }
  }, []);

  /**
   * enterAsGuest(name)
   * Saves the guest name to localStorage and sets a presence cookie so the
   * middleware can allow the request through to /app/lesson/1 without a JWT.
   */
  const enterAsGuest = (name) => {
    const trimmed = (name || '').trim() || 'Guest';
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ isGuest: true, name: trimmed })
      );
      // Client-accessible (no HttpOnly) so JS can set it; not sensitive
      document.cookie = `lekf_guest=1; path=/; SameSite=Lax; max-age=${COOKIE_MAX_AGE}`;
    } catch {
      // Silently ignore
    }
    setIsGuest(true);
    setGuestName(trimmed);
  };

  /**
   * clearGuest()
   * Removes the guest state from localStorage and expires the cookie.
   * Called when the guest signs up or signs in.
   */
  const clearGuest = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = 'lekf_guest=; path=/; max-age=0';
    } catch {
      // Silently ignore
    }
    setIsGuest(false);
    setGuestName(null);
  };

  return (
    <GuestContext.Provider value={{ isGuest, guestName, enterAsGuest, clearGuest }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  return useContext(GuestContext);
}
