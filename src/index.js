import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SessionProvider } from './SessionProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* SessionProviderの下にAppを書くことで他のページでも引用することが可能 */}
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
);
