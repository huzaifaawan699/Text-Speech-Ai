const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


// Allow requests from React frontend
app.use(cors());
app.use(express.json());
app.get("/", (req,res) => {
    res.send("Server Is fully Ready")

});
app.post('/api/speak', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const apiUrl = `https://api.voicerss.org/?key=${process.env.VOICERSS_API_KEY}&hl=en-us&src=${encodeURIComponent(text)}&c=mp3`;
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to process the request" });
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
