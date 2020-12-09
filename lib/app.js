const express = require('express');
const CyberTruck = require('./tesla/CyberTruck');
const app = express();


app.use(express.json());
// this is where my express app lives and where my endpoints belong 

app.post('/api/v1/tesla/cybertruck', (req, res) => {
  CyberTruck  
    .insert(req.body)
    .then(cybertruck => res.send(cybertruck));
}); 

module.exports = app;
