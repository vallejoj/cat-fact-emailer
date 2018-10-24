const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;
const emailer = require('./routes/emailer');

app.use(bodyparser.json());

app.use('/emailer', emailer);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
