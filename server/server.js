// server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan'); // Added for logging

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Log requests to console

app.post('/api/request', async (req, res) => {
  const { method, url, headers, body } = req.body;
  
  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const response = await axios({
      method: method || 'GET',
      url,
      headers: headers || {},
      data: body,
    });

    res.json({
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data || {},
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));