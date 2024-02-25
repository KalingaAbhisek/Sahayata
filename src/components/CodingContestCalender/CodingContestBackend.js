require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.REACT_APP_PORT_BACKEND;
const API_KEY = process.env.REACT_APP_CONTEST_API_KEY; // Your API key
const API_URL = `https://clist.by:443/api/v4/contest/?limit=1000&upcoming=true&username=adskguest&api_key=${API_KEY}`
const allowedOrigins = [`http://localhost:${process.env.port}`, 'https://sahayata-app-1.web.app'];

app.use(cors({ origin: allowedOrigins }));

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data.objects);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
