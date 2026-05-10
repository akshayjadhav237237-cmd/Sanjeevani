const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );

        logger.info(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected. Reconnecting...');
            setTimeout(connectDB, 5000);
        });

        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB error:', err);
        });

    } catch (error) {
        logger.error('MongoDB connection failed:', error.message);
        logger.error('Make sure MongoDB is running locally or');
        logger.error('check your MONGODB_URI in .env file');
        // process.exit(1); // commented out to allow server to run for testing
    }
};

module.exports = connectDB;
