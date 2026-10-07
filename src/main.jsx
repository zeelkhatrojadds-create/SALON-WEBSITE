import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Browser Reload Detection: If the user refreshes any page (F5, Ctrl+R, reload button),
// immediately normalize history to '/' before React Router mounts so there is zero flash of the old subpage.
try {
  const navEntries = window.performance?.getEntriesByType?.('navigation');
  const navEntry = navEntries && navEntries.length > 0 ? navEntries[0] : null;
  const isReload = navEntry
    ? navEntry.type === 'reload'
    : window.performance?.navigation?.type === 1;

  if (isReload && window.location.pathname !== '/') {
    window.history.replaceState(null, '', '/');
  }
} catch (e) {
  // Silent fallback for older environments
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
