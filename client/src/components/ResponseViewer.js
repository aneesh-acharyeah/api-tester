// ResponseViewer.js

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../context/ThemeContext';
import { FiSend } from 'react-icons/fi'; // Add this import

const ResponseViewer = ({ response, activeTab }) => {
    const { theme } = useTheme();

    if (!response) {
        return (
            <div className="empty-response">
                <FiSend className="empty-icon" />
                <p>Send a request to see the response here</p>
                <small>Try entering a URL and clicking "Send"</small>
            </div>
        );
    }

    const formatHeaders = (headers) => {
        return Object.entries(headers).map(([key, value]) => `${key}: ${value}`).join('\n');
    };

    return (
        <div className="response-viewer">
            {activeTab === 'response' ? (
                <>
                    <div className="status-code">
                        Status: <span className={`status-${Math.floor(response.status / 100)}xx`}>
                            {response.status}
                        </span>
                    </div>
                    <SyntaxHighlighter
                        language="json"
                        style={theme === 'dark' ? atomDark : solarizedlight}
                        customStyle={{ flex: 1, borderRadius: '4px' }}
                        showLineNumbers
                    >
                        {JSON.stringify(response.data, null, 2)}
                    </SyntaxHighlighter>
                </>
            ) : (
                <SyntaxHighlighter
                    language="http"
                    style={theme === 'dark' ? atomDark : solarizedlight}
                    customStyle={{ flex: 1, borderRadius: '4px' }}
                    showLineNumbers
                >
                    {formatHeaders(response.headers)}
                </SyntaxHighlighter>
            )}
        </div>
    );
};

export default ResponseViewer;