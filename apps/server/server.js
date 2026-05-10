require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/database');
const { initializeSockets } = require('./sockets');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSockets(server);


// Start server
server.listen(PORT, () => {
    logger.info(`
  ╔══════════════════════════════════════════════╗
  ║     SANJEEVNI HEALTHCARE API SERVER         ║
  ║     "When Every Second Matters"             ║
  ╠══════════════════════════════════════════════╣
  ║  Status   : Running ✅                      ║
  ║  Port     : ${PORT}                            ║
  ║  Mode     : ${process.env.NODE_ENV}             ║
  ║  Docs     : http://localhost:${PORT}/api/docs   ║
  ╚══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err.message);
    process.exit(1);
});

module.exports = server;
