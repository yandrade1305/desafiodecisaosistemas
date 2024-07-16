const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const ActivityModel = require('./models/activity');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres'
});

const Activity = ActivityModel(sequelize, DataTypes);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/activity/create', async (req, res) => {
  const { description } = req.body;
  const newActivity = await Activity.create({ description, completed: false, creationDate: new Date() });
  res.json(newActivity);
});

app.patch('/api/activity/update/:id', async (req, res) => {
  const { id } = req.params;
  const { description, completed } = req.body;
  
  try {
    const activity = await Activity.findByPk(id);
    
    if (activity) {
      activity.description = description;
      
      const updatedActivity = await activity.save();
      
      res.json({
        id: updatedActivity.id,
        description: updatedActivity.description,
        isCompleted: updatedActivity.completed,
        creationDate: updatedActivity.creationDate,
        conclusionDate: updatedActivity.conclusionDate
      });
    } else {
      res.status(404).send('Activity not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/activity/delete/:id', async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findByPk(id);
  if (activity) {
    await activity.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Activity not found');
  }
});

app.get('/api/activity/get', async (req, res) => {
  const activities = await Activity.findAll();
  res.json(activities);
});

app.post('/api/activity/complete/:id', async (req, res) => {
  const { id } = req.params;
  const activity = await Activity.findByPk(id);
  if (activity) {
    activity.completed = true;
    activity.conclusionDate = new Date();
    await activity.save();
    res.json(activity);
  } else {
    res.status(404).send('Activity not found');
  }
});

app.get('/api/activity/get-complete', async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { completed: true },
      order: [['conclusionDate', 'DESC']]
    });

    res.json(activities);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/activity/get-incomplete', async (req, res) => {
  try {
    const activities = await Activity.findAll({
      where: { completed: false },
      order: [['creationDate', 'DESC']]
    });

    res.json(activities);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
