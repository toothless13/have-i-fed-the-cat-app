const express = require('express');
const { Cat } = require('./models');


const app = express();


app.use(express.json());

app.post('/cats', async (req, res) => {
  Cat.create(req.body).then(cat => res.status(201).json(cat))
  .catch(error => {
    console.log("Error caught");
    res.sendStatus(400);
  });
});

app.get('/cats', async (req, res) => {
  Cat.findAll({ where: req.query }).then(cats => res.status(200).json(cats))
  .catch(error => {
    console.log("Error caught");
    res.sendStatus(400);
  });
});

app.get('/cats/:catId', async (req, res) => {
  Cat.findByPk(req.params.catId).then(cat => res.status(200).json(cat))
  .catch(error => {
    console.log("Error caught");
    res.sendStatus(400);
  });
});

app.patch('/cats/:catId', async (req, res) => {
  Cat.update(req.body, { where: { id: req.params.catId } }).then(cat => res.status(200).json(cat))
  .catch(error => {
    console.log("Error caught");
    res.sendStatus(400);
  });
});

app.patch('/feed/cat/:catId', async (req, res) => {
  Cat.update({ lastFed: new Date() }, { where: { id: req.params.catId } }).then(cat => res.status(200).json(cat))
  .catch(error => {
    console.log("Error caught");
    res.sendStatus(400);
  });
});

app.delete('/cats/:catId', async (req, res) => {
  Cat.destroy({ where: { id: req.params.catId } }).then(cat => res.status(204).json(cat))
  .catch(error => {
    console.log("Error caught");
    res.sendStatus(400);
  });
});

module.exports = app;