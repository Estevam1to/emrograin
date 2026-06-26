import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';

// Signal CSS that JS is active (enables reveal animations)
document.documentElement.classList.add('js');

// Respect user's motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.dataset.motion = 'reduced';
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found in index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
