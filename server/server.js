const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// API endpoints
app.post('/api/nutrients', async (req, res) => {
    try {
        const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': process.env.NUTRITIONIX_APP_ID,
                'x-app-key': process.env.NUTRITIONIX_API_KEY
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching nutrition data' });
    }
});

app.post('/api/exercise', async (req, res) => {
    try {
        const response = await fetch('https://trackapi.nutritionix.com/v2/natural/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': process.env.NUTRITIONIX_APP_ID,
                'x-app-key': process.env.NUTRITIONIX_API_KEY
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exercise data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});