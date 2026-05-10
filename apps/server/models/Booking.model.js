const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    bedType: { type: String, required: true, enum: ['icu', 'nicu', 'emergency', 'general', 'private', 'suite'] },
    admissionDate: { type: Date, required: true },
    estimatedDays: { type: Number },
    status: { type: String, enum: ['pending', 'confirmed', 'admitted', 'discharged', 'cancelled'], default: 'pending' },
    totalCost: { type: Number },
    insuranceCoverage: { type: Number, default: 0 },
    selfPayAmount: { type: Number },
    paymentStatus: { type: String, enum: ['pending', 'partial', 'completed', 'refunded'], default: 'pending' },
    paymentId: { type: String },
    specialRequirements: { type: String },
    doctorAssigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', BookingSchema);
