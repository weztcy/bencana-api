const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Disaster } = require('./models');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use(cors());


// Routes
app.get('/disasters', async (req, res) => {
  try {
    const disasters = await Disaster.findAll();
    res.json(disasters);
  } catch (error) {
    console.error(error); // Log error to the console for debugging
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/disasters', async (req, res) => {
  try {
    const disaster = await Disaster.create(req.body);
    res.json(disaster);
  } catch (error) {
    console.error(error); // Log error to the console for debugging
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/disasters/:id', async (req, res) => {
  try {
    const disaster = await Disaster.findByPk(req.params.id);
    if (disaster) {
      res.json(disaster);
    } else {
      res.status(404).json({ error: 'Disaster not found' });
    }
  } catch (error) {
    console.error(error); // Log error to the console for debugging
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.put('/disasters/:id', async (req, res) => {
  try {
    const disaster = await Disaster.findByPk(req.params.id);
    if (disaster) {
      await disaster.update(req.body);
      res.json(disaster);
    } else {
      res.status(404).json({ error: 'Disaster not found' });
    }
  } catch (error) {
    console.error(error); // Log error to the console for debugging
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/disasters/:id', async (req, res) => {
  try {
    const disaster = await Disaster.findByPk(req.params.id);
    if (disaster) {
      await disaster.destroy();
      res.json({ message: 'Disaster deleted' });
    } else {
      res.status(404).json({ error: 'Disaster not found' });
    }
  } catch (error) {
    console.error(error); // Log error to the console for debugging
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
