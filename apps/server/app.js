// app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const routes = require('./routes/index');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// ── SECURITY MIDDLEWARE ────────────────────────────────
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// ── RATE LIMITING ──────────────────────────────────────
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, please try again later.'
    }
});
app.use('/api', globalLimiter);

// ── CORS ───────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ── BODY PARSERS ───────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// ── LOGGING ────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// ── ROOT ROUTE (FIXES "Cannot GET /") ─────────────────
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        platform: 'Sanjeevni Healthcare Platform',
        tagline: 'When Every Second Matters',
        version: '1.0.0',
        status: 'Server is healthy and running ✅',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString(),
        api: {
            base: '/api/v1',
            documentation: '/api/docs',
            health: '/api/health'
        },
        endpoints: {
            authentication: '/api/v1/auth',
            patients: '/api/v1/patients',
            hospitals: '/api/v1/hospitals',
            beds: '/api/v1/beds',
            bookings: '/api/v1/bookings',
            doctors: '/api/v1/doctors',
            appointments: '/api/v1/appointments',
            medicines: '/api/v1/medicines',
            orders: '/api/v1/orders',
            records: '/api/v1/records',
            emergency: '/api/v1/emergency',
            ambulances: '/api/v1/ambulances',
            insurance: '/api/v1/insurance',
            notifications: '/api/v1/notifications',
            ai: '/api/v1/ai'
        }
    });
});

// ── HEALTH CHECK ROUTE ─────────────────────────────────
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'healthy',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

// ── API DOCUMENTATION ──────────────────────────────────
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//  customCss: '.swagger-ui .topbar { background-color: #0A3D6B }',
//  customSiteTitle: 'Sanjeevni API Docs'
// }));

// ── ALL API ROUTES ─────────────────────────────────────
app.use('/api/v1', routes);

// ── 404 HANDLER ────────────────────────────────────────
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        suggestion: 'Visit / to see all available endpoints'
    });
});

// ── GLOBAL ERROR HANDLER ───────────────────────────────
app.use(errorMiddleware);

module.exports = app;
