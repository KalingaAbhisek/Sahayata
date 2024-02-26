const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.REACT_APP_PORT_BACKEND;
const API_KEY = process.env.REACT_APP_CONTEST_API_KEY; // Your API key
const API_URL = `https://clist.by:443/api/v4/contest/?limit=1000&upcoming=true&username=adskguest&api_key=${API_KEY}`
const allowedOrigins = [`http://localhost:${process.env.PORT}`, 'http://sahayata-app-1.web.app/','http://sahayata-app-1.firebaseapp.com/'];

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_APP_NAME}.zhsxrdu.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB_APP_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Define a Mongoose schema
const contestSchema = new mongoose.Schema({
  event: String,
  start: Date,
  end: Date,
  host: String,
  resource: String,
  href: String,
});

const Contest = mongoose.model('Contest', contestSchema);

app.use(cors({ origin: allowedOrigins }));

cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get(API_URL);
    const responseData = response.data.objects;

    // Process the response and save it to MongoDB
    await Contest.deleteMany();
    console.log('Previous data from MongoDB is deleted');
    await Contest.insertMany(responseData);
    console.log('API response saved to MongoDB');
  } catch (error) {
    console.error('Error fetching and saving API response:', error);
  }
});

// Retrieve data from MongoDB
app.get('/api/data', async (req, res) => {
  try {
    const contests = await Contest.find().lean();
    res.json(contests);
  } catch (error) {
    console.error('Error retrieving contests:', error);
    res.status(500).send('Error retrieving contests');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
