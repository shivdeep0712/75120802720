const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8008;

app.use(express.json());


app.get('/numbers/primes', (req, res) => {
  
  const primeNums = [2, 3, 5, 7, 11, 13, 17, 19, 23];
  res.json({ numbers: primeNums });
});

app.get('/numbers/fibo', (req, res) => {

  const fiboNums = [1, 2, 3, 5, 8, 13, 21];
  res.json({ numbers: fiboNums });
});

app.get('/numbers/odd', (req, res) => {

  const oddNums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
  res.json({ numbers: oddNums });
});



app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'URL parameter "url" is required.' });
  }

  try {
    const urlArray = Array.isArray(urls) ? urls : [urls]; 
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
