const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    location: {
        address: { type: String },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    status: { type: String, enum: ['active', 'ambulanceDispatched', 'hospitalReached', 'resolved'], default: 'active' },
    ambulance: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    alertsSent: [{
        contact: { type: String },
        method: { type: String },
        sentAt: { type: Date, default: Date.now }
    }],
    patientProfileSent: { type: Boolean, default: false },
    resolvedAt: { type: Date }
}, {
    timestamps: true
});

module.exports = mongoose.model('Emergency', EmergencySchema);
