const express = require('express');
const axios = require('axios');
const app = express();
const port = 9090;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>SSRF Demo</h1>
        <h4> The URL should be in the format "http://169.254.169.254/latest/meta-data/..."
        <form action="/fetch-url" method="post">
            <label for="url">Enter URL:</label>
            <input type="text" id="url" name="url" required>
            <button type="submit">Fetch URL</button>
        </form>
        <div id="result"></div>
    `);
});

app.post('/fetch-url', async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(url);
        // Check if response data is an object before stringifying.
        const responseData = typeof response.data === 'object' ? JSON.stringify(response.data, null, 2) : response.data;
        res.send(`
            <h1>SSRF Demo</h1>
            ... (form) ...
            <div id="result">
                <h2>Fetched Content:</h2>
                <pre>${responseData}</pre>
            </div>
        `);
    } catch (error) {
        res.send(`
            <h1>SSRF Demo</h1>
            ... (form) ...
            <div id="result">
                <h2>Error fetching content:</h2>
                <pre>${error.message}</pre>
            </div>
        `);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
