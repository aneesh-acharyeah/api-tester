// HistoryPanel.js

import { FaHistory } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { formatDistanceToNow } from 'date-fns';

const HistoryPanel = ({ history, onResend, active }) => {
  const { theme } = useTheme();

  if (!active) return null;

  return (
    <div className="panel history-panel">
      <div className="panel-header">
        <FaHistory /> History
      </div>
      <div className="panel-content">
        {history.length === 0 ? (
          <p className="empty-message">No requests yet</p>
        ) : (
          <ul className="history-list">
            {history.map((req, i) => (
              <li key={i} onClick={() => onResend(req)}>
                <span className={`method-${req.method.toLowerCase()}`}>
                  {req.method}
                </span>
                <span className="url">{req.url}</span>
                <span className="timestamp">
                  {req.timestamp ? formatDistanceToNow(new Date(req.timestamp)) + ' ago' : 'Just now'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;