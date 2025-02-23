const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get the user's Downloads folder path
const downloadsPath = path.join(os.homedir(), 'Downloads', 'browserData.txt');

// ✅ Fix: Use `app.get('/')` instead of `app.use('/')`
app.get('/', (req, res) => {
    res.send("Hello World");
});

// API route to save data
app.post('/save', (req, res) => {
    const data = req.body.data;

    if (!data) {
        return res.status(400).json({ message: "No data received" });
    }

    fs.writeFile(downloadsPath, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).json({ message: "Failed to save file" });
        }
        res.json({ message: `File saved successfully in Downloads folder!` });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
