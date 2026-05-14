const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://NANTHA:Nanu12345@advance-research-cluste.oq60ytc.mongodb.net/task_manager_db?retryWrites=true&w=majority&appName=advance-research-cluster'
        );

        console.log('MongoDB Connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;