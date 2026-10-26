// RequestForm.js

import React, { useState } from 'react';
import { FaPaperPlane, FaSave } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi'; // Add this import

const RequestForm = ({ onSend, loading, onSave }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const handleSend = (e) => {
    e.preventDefault();
    const headersObj = headers.reduce((acc, { key, value }) => {
      if (key.trim()) acc[key.trim()] = value.trim();
      return acc;
    }, {});
    
    onSend({ method, url, body, headers: headersObj });
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
    }
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <form className="request-form" onSubmit={handleSend}>
      <div className="request-controls">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="method-select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="url-input"
          required
        />
        <button type="submit" className="send-button" disabled={loading}>
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <>
              <FaPaperPlane /> Send
            </>
          )}
        </button>
        <button 
          type="button" 
          className="save-button"
          onClick={onSave}
          disabled={!url}
        >
          <FaSave /> Save
        </button>
      </div>

     <div className="headers-section">
  <h3>Headers</h3>
  {headers.map((header, index) => (
    <div key={index} className="header-row">
      <input
        type="text"
        placeholder="Content-Type"
        value={header.key}
        onChange={(e) => updateHeader(index, 'key', e.target.value)}
      />
      <input
        type="text"
        placeholder="application/json"
        value={header.value}
        onChange={(e) => updateHeader(index, 'value', e.target.value)}
      />
      <button 
        type="button" 
        className="remove-header"
        onClick={() => removeHeader(index)}
        aria-label="Remove header"
      >
        ×
      </button>
    </div>
  ))}
  <button 
    type="button" 
    onClick={addHeader} 
    className="add-header"
  >
    <FiPlus /> Add Header
  </button>
</div>

      {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
        <div className="body-section">
          <h3>Request Body</h3>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{"key": "value"}'
            className="body-textarea"
          />
        </div>
      )}
    </form>
  );
};

export default RequestForm;