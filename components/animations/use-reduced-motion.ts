'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  // Keep the server output and first client render identical during hydration.
  return false;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
