// App.js

import { useState, useEffect } from "react";
import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";
import HistoryPanel from "./components/HistoryPanel";
import FavoritesPanel from "./components/FavoritesPanel";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("response");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history")) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = async (req) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/request", req);
      setResponse(res.data);
      setActiveTab("response");
      
      // Update history, removing duplicates and keeping only the last 20
      const newHistory = [
        { ...req, timestamp: new Date().toISOString() },
        ...history.filter(item => item.url !== req.url || item.method !== req.method)
      ].slice(0, 20);
      
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    } catch (err) {
      setResponse({ 
        status: err.response?.status || 500, 
        data: err.response?.data || { error: err.message } 
      });
      setActiveTab("response");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = (req) => handleSend(req);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = () => {
    if (response && history.length) {
      const latest = history[0];
      const alreadyFav = favorites.find(f => f.url === latest.url && f.method === latest.method);
      if (!alreadyFav) {
        setFavorites([{ ...latest, name: `${latest.method} ${latest.url}` }, ...favorites]);
      }
    }
  };

  const removeFavorite = (url, method) => {
    setFavorites(favorites.filter(f => !(f.url === url && f.method === method)));
  };

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <div className="main-container">
          <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <button 
              className="sidebar-toggle" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? '◄' : '►'}
            </button>
            <div className="sidebar-content">
              <HistoryPanel 
                history={history} 
                onResend={handleResend} 
                active={sidebarOpen}
              />
              <FavoritesPanel 
                favorites={favorites} 
                onResend={handleResend} 
                onRemove={removeFavorite}
                active={sidebarOpen}
              />
            </div>
          </div>
          <div className="content-area">
            <RequestForm 
              onSend={handleSend} 
              loading={loading} 
              onSave={addToFavorites}
            />
            <div className="response-tabs">
              <button 
                className={`tab ${activeTab === 'response' ? 'active' : ''}`}
                onClick={() => setActiveTab('response')}
              >
                Response
              </button>
              <button 
                className={`tab ${activeTab === 'headers' ? 'active' : ''}`}
                onClick={() => setActiveTab('headers')}
                disabled={!response}
              >
                Headers
              </button>
            </div>
            <ResponseViewer 
              response={response} 
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;