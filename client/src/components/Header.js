// Header.js

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className="app-header" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#6c5ce7' }}>
      <div className="header-content">
        <h1>API Tester</h1>
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;