const express = require('express');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: '*'
    })
);

const connectDB = require('./config/db');

const Task = require('./models/Task');
const User = require('./models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('./middleware/authMiddleware');

connectDB();

app.use(express.json());

// ================= HOME ROUTE =================

app.get('/', (req, res) => {

    res.send('Server Running Successfully');

});



// ================= REGISTER =================

app.post('/api/register', async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: 'User already exists'
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const newUser = new User({

            name,
            email,
            password: hashedPassword

        });

        await newUser.save();

        res.json({
            message: 'Registration Successful'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// ================= LOGIN =================

app.post('/api/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email
        });

        if (!user) {

            return res.status(400).json({
                message: 'User not found'
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: 'Wrong password'
            });

        }

        const token = jwt.sign(

            {
                id: user._id
            },

            'nanu_secret_key',

            {
                expiresIn: '7d'
            }

        );

        res.json({

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});



// ================= GET TASKS =================

app.get(
    '/api/tasks',
    authMiddleware,

    async (req, res) => {

        try {

            const tasks = await Task.find({

                userId: req.user.id

            });

            res.json(tasks);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);



// ================= ADD TASK =================

app.post(
    '/api/tasks',
    authMiddleware,

    async (req, res) => {

        try {

            console.log('ADD TASK API CALLED');

            console.log(req.user);

            const user =
                await User.findById(req.user.id);

            console.log(user);

            const newTask = new Task({

                title: req.body.title,

                status: 'Pending',

                userId: req.user.id,

                email: user.email

            });

            console.log(newTask);

            const savedTask =
                await newTask.save();

            console.log(savedTask);

            res.json(savedTask);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: error.message
            });

        }

    }
);

// ================= UPDATE TASK =================

app.put(
    '/api/tasks/:id',
    authMiddleware,

    async (req, res) => {

        try {

            const task = await Task.findOne({

                _id: req.params.id,

                userId: req.user.id

            });

            if (!task) {

                return res.status(404).json({
                    message: 'Task not found'
                });

            }

            task.status =
                task.status === 'Pending'
                    ? 'Completed'
                    : 'Pending';

            const updatedTask =
                await task.save();

            res.json(updatedTask);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);



// ================= DELETE TASK =================

app.delete(
    '/api/tasks/:id',
    authMiddleware,

    async (req, res) => {

        try {

            const task = await Task.findOne({

                _id: req.params.id,

                userId: req.user.id

            });

            if (!task) {

                return res.status(404).json({
                    message: 'Task not found'
                });

            }

            await task.deleteOne();

            res.json({
                message: 'Task deleted'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server is running on port ${PORT}`
    );

});