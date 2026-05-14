const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const Task = require('./models/Task');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());



// HOME ROUTE
app.get('/', (req, res) => {
    res.send('Server Running Successfully');
});



// GET ALL TASKS
app.get('/api/tasks', async (req, res) => {

    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});




// ADD TASK
app.post('/api/tasks', async (req, res) => {

    try {

        const newTask = new Task({

            title: req.body.title,
            status: 'Pending'

        });

        const savedTask = await newTask.save();

        res.json(savedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});




// UPDATE TASK STATUS
app.put('/api/tasks/:id', async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: 'Task not found'
            });
        }

        task.status =
            task.status === 'Pending'
                ? 'Completed'
                : 'Pending';

        const updatedTask = await task.save();

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});




// DELETE TASK
app.delete('/api/tasks/:id', async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Task Deleted Successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});