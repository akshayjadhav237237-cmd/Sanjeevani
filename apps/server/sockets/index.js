const { Server } = require('socket.io');

const initializeSockets = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        // Patient joins their personal room
        socket.on('join:patient', (patientId) => {
            socket.join(`patient:${patientId}`);
        });

        // Emergency SOS events
        socket.on('emergency:sos', (data) => {
            io.emit('emergency:alert', data);
        });

        // Ambulance location updates
        socket.on('ambulance:location', (data) => {
            io.to(`patient:${data.patientId}`)
                .emit('ambulance:update', data);
        });

        // Bed availability updates
        socket.on('bed:update', (data) => {
            io.emit('bed:availability', data);
        });

        // Doctor chat messages
        socket.on('chat:message', (data) => {
            io.to(`appointment:${data.appointmentId}`)
                .emit('chat:receive', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = { initializeSockets };
