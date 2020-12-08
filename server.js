const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});


app.listen(7890, () => {
  console.log ('listening on 7890');
});


module.exports = app;