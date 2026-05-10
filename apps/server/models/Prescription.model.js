const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    medicines: [{
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        customName: String,
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String
    }],
    notes: String,
    validUntil: Date,
    fileUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
