const express = require('express');
const axios = require('axios');
const app = express();
const port = 9090;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h1>SSRF Demo</h1>
    <h4> The URL should be in the format "http/s://example.com"
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
    res.send(`
      <h1>SSRF Demo</h1>
      <form action="/fetch-url" method="post">
        <label for="url">Enter URL:</label>
        <input type="text" id="url" name="url" required>
        <button type="submit">Fetch URL</button>
      </form>
      <div id="result">
        <h2>Fetched Content:</h2>
        <pre>${response.data}</pre>
      </div>
    `);
  } catch (error) {
    res.send(`
      <h1>SSRF Demo</h1>
      <form action="/fetch-url" method="post">
        <label for="url">Enter URL:</label>
        <input type="text" id="url" name="url" required>
        <button type="submit">Fetch URL</button>
      </form>
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