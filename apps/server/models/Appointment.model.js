const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    type: { type: String, enum: ['in-person', 'video'], default: 'in-person' },
    notes: String,
    files: [String]
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
