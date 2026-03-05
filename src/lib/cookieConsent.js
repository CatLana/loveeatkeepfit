/**
 * Cookie Consent Context
 * Provides consent state (strictly-necessary, analytics) throughout the app.
 * Persisted to localStorage so the banner does not re-appear on every visit.
 *
 * Usage:
 *   const { consent, acceptAll, rejectAnalytics } = useCookieConsent();
 */

import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'lekf_cookie_consent';

const defaultConsent = {
  necessary: true,   // always true — cannot be disabled
  analytics: false,
  decided: false,    // false until user interacts with banner
};

const CookieConsentContext = createContext(defaultConsent);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(defaultConsent);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent({ ...defaultConsent, ...parsed, necessary: true });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function save(prefs) {
    const next = { ...prefs, necessary: true, decided: true };
    setConsent(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }

  function acceptAll() {
    save({ necessary: true, analytics: true });
  }

  function rejectAnalytics() {
    save({ necessary: true, analytics: false });
  }

  function updateConsent(prefs) {
    save({ ...consent, ...prefs });
  }

  return (
    <CookieConsentContext.Provider value={{ consent, acceptAll, rejectAnalytics, updateConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}
