const express = require('express');
const bodyParser = require('body-parser');
const Disaster = require('./models/disaster'); // sesuaikan path

const app = express();
app.use(bodyParser.json());

// POST new disaster
app.post('/disasters', async (req, res) => {
  try {
    const { name, description, date } = req.body;
    const disaster = await Disaster.create({ name, description, date });
    res.status(201).json(disaster);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// GET all disasters
app.get('/disasters', async (req, res) => {
  try {
    const disasters = await Disaster.findAll();
    res.json(disasters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET disaster by ID
app.get('/disasters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const disaster = await Disaster.findByPk(id);
    if (!disaster) {
      res.status(404).json({ error: 'Disaster not found' });
    } else {
      res.json(disaster);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PUT update disaster by ID
app.put('/disasters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { name, description, date } = req.body;
    let disaster = await Disaster.findByPk(id);
    if (!disaster) {
      res.status(404).json({ error: 'Disaster not found' });
    } else {
      disaster.name = name;
      disaster.description = description;
      disaster.date = date;
      await disaster.save();
      res.json(disaster);
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// DELETE disaster by ID
app.delete('/disasters/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const disaster = await Disaster.findByPk(id);
    if (!disaster) {
      res.status(404).json({ error: 'Disaster not found' });
    } else {
      await disaster.destroy();
      res.json({ message: 'Disaster deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Port server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
