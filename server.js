const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('hello world');
});
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
