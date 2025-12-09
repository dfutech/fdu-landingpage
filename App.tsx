/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { DFULabsPage, FoodemPage } from './components/LandingViews';

export type ViewState = 'dfulabs' | 'foodem';
export type Language = 'vn' | 'en';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dfulabs');
  const [language, setLanguage] = useState<Language>('vn');
  const [theme, setTheme] = useState<Theme>('light');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Handle Dark Mode Class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-text-main dark:text-gray-100">
      {currentView === 'dfulabs' ? (
        <DFULabsPage 
          onNavigate={() => setCurrentView('foodem')} 
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />
      ) : (
        <FoodemPage 
          onNavigate={() => setCurrentView('dfulabs')} 
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
        />
      )}
    </div>
  );
};

export default App;