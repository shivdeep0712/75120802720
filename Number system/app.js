const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8008;

app.use(express.json());

// Define endpoints to return the numbers
app.get('/numbers/primes', (req, res) => {
  // Replace this logic with your prime number generation algorithm or API call
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
  res.json({ numbers: primes });
});

app.get('/numbers/fibo', (req, res) => {
  // Replace this logic with your fibonacci number generation algorithm or API call
  const fibo = [1, 2, 3, 5, 8, 13, 21];
  res.json({ numbers: fibo });
});

app.get('/numbers/odd', (req, res) => {

  const odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
  res.json({ numbers: odd });
});


// Endpoint to merge numbers from different URLs
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'URL parameter "url" is required.' });
  }

  try {
    const urlArray = Array.isArray(urls) ? urls : [urls]; // Always convert to an array
    const promises = urlArray.map(url => axios.get(url, { timeout: 500 }));
    const results = await Promise.all(promises);
    const numbersArray = results.map(response => response.data.numbers).flat();
    const mergedNumbers = Array.from(new Set(numbersArray)).sort((a, b) => a - b);
    return res.json({ numbers: mergedNumbers });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
