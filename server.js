const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const Task = require('./models/Task');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Running Successfully');
});

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            status: 'Pending'
        });

        const savedTask = await newTask.save();

        res.json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});