const mongoose = require('mongoose');

const BedSchema = new mongoose.Schema({
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    type: { type: String, enum: ['icu', 'nicu', 'emergency', 'general', 'private', 'suite'], required: true },
    isAvailable: { type: Boolean, default: true },
    pricePerDay: { type: Number, required: true },
    currentPatient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
}, { timestamps: true });

module.exports = mongoose.model('Bed', BedSchema);
