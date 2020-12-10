require('dotenv').config();
const express = require('express');
const app = express();
const CyberTruck = require('./tesla/CyberTruck');
app.use(express.json());

// ---------------------------------------------

app.get('/tesla/cyber_truck', (req, res) => {
  CyberTruck
    .find()
    .then(cybertruck => res.send(cybertruck));
  console.log('im here');
});

// -------------------------------------------

app.get('/tesla/cyber_truck/:id', (req, res) => {
  CyberTruck
    .findById(req.params.id)
    .then(cybertruck => res.send(cybertruck));
});

// -------------------------------------------

app.post('/tesla/cyber_truck', async(req, res) => {
  CyberTruck 
    .insert(req.body)
    .then(cybertruck => res.send(cybertruck));
});

// ---------------------------------------------

app.put('/tesla/cyber_truck/:id', (req, res) => {
  CyberTruck
    .update(req.params.id, req.body)
    .then(cybertruck => res.send(cybertruck));
});

// ----------------------------------------------

app.delete('/tesla/cyber_truck/:id', (req, res) => {
  CyberTruck
    .delete(req.params.id)
    .then(cybertruck => res.send(cybertruck));
}); 


module.exports = app ;
