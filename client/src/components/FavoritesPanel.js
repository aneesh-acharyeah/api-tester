// FavoritesPanel.js

import { FaStar, FaTrash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FavoritesPanel = ({ favorites, onResend, onRemove, active }) => {
  const { theme } = useTheme();

  if (!active) return null;

  return (
    <div className="panel favorites-panel">
      <div className="panel-header">
        <FaStar /> Favorites
      </div>
      <div className="panel-content">
        {favorites.length === 0 ? (
          <p className="empty-message">No favorites saved</p>
        ) : (
          <ul className="favorites-list">
            {favorites.map((fav, i) => (
              <li key={i}>
                <div className="favorite-item" onClick={() => onResend(fav)}>
                  <span className={`method-${fav.method.toLowerCase()}`}>
                    {fav.method}
                  </span>
                  <span className="url">{fav.url}</span>
                </div>
                <button 
                  className="remove-favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(fav.url, fav.method);
                  }}
                >
                  <FaTrash size={12} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;