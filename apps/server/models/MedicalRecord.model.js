const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    type: { type: String, enum: ['report', 'prescription', 'vaccination', 'other'], required: true },
    title: { type: String, required: true },
    description: String,
    fileUrl: String,
    date: { type: Date, default: Date.now },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }]
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
