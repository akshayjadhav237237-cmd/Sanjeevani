const mongoose = require('mongoose');

const AmbulanceSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    type: { type: String, enum: ['basic', 'advanced', 'neonatal'], default: 'basic' },
    location: {
        lat: Number,
        lng: Number
    },
    status: { type: String, enum: ['available', 'dispatched', 'maintenance'], default: 'available' },
    currentEmergency: { type: mongoose.Schema.Types.ObjectId, ref: 'Emergency' }
}, { timestamps: true });

module.exports = mongoose.model('Ambulance', AmbulanceSchema);
