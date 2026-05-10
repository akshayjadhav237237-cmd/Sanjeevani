import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import hospitalRoutes from './routes/hospital';
import sosRoutes from './routes/sos';
import aiRoutes from './routes/ai';
import recordRoutes from './routes/record';
import bookingRoutes from './routes/booking';
import medicineRoutes from './routes/medicine';

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/medicines', medicineRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Sanjeevni Healthcare API is running',
        version: '1.0.0',
        platform: 'Sanjeevni — When Every Second Matters',
        timestamp: new Date().toISOString(),
        status: 'healthy',
        documentation: '/api/docs',
        endpoints: {
            auth: '/api/auth',
            patients: '/api/patients',
            hospitals: '/api/hospitals',
            beds: '/api/beds',
            appointments: '/api/appointments',
            medicines: '/api/medicines',
            records: '/api/records',
            emergency: '/api/emergency',
            insurance: '/api/insurance',
            notifications: '/api/notifications',
            ai: '/api/ai'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Sanjeevni API is running' });
});

const startServer = async () => {
    try {
        if (process.env.MONGODB_URI) {
            mongoose.set('strictQuery', false);
            mongoose.connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            })
                .then((conn) => {
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    console.log('✅ MongoDB Connected Successfully');
                    console.log(`   Host: ${conn.connection.host}`);
                    console.log(`   DB:   ${conn.connection.name}`);
                    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                })
                .catch((err) => {
                    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    console.error('❌ MongoDB Connection FAILED');
                    console.error(`   Error: ${err.message}`);
                    console.error('   Check your MONGODB_URI in .env');
                    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    // We don't exit process in dev, just let it be known
                });

            mongoose.connection.on('disconnected', () => {
                console.log('❌ MongoDB Disconnected. Retrying...');
            });
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
