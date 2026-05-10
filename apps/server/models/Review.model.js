const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
