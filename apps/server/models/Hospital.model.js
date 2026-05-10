const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photos: [{ type: String }],
    description: { type: String },
    address: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    specialties: [{ type: String }],
    facilities: [{ type: String }],
    rating: {
        overall: { type: Number, default: 0 },
        cleanliness: { type: Number, default: 0 },
        staff: { type: Number, default: 0 },
        food: { type: Number, default: 0 },
        treatment: { type: Number, default: 0 }
    },
    reviewCount: { type: Number, default: 0 },
    accreditations: [{ type: String }],
    beds: {
        icu: { total: { type: Number, default: 0 }, available: { type: Number, default: 0 }, pricePerDay: { type: Number, default: 0 } },
        nicu: { total: { type: Number, default: 0 }, available: { type: Number, default: 0 }, pricePerDay: { type: Number, default: 0 } },
        emergency: { total: { type: Number, default: 0 }, available: { type: Number, default: 0 }, pricePerDay: { type: Number, default: 0 } },
        general: { total: { type: Number, default: 0 }, available: { type: Number, default: 0 }, pricePerDay: { type: Number, default: 0 } },
        private: { total: { type: Number, default: 0 }, available: { type: Number, default: 0 }, pricePerDay: { type: Number, default: 0 } },
        suite: { total: { type: Number, default: 0 }, available: { type: Number, default: 0 }, pricePerDay: { type: Number, default: 0 } }
    },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    insuranceAccepted: [{ type: String }],
    costRange: {
        min: { type: Number },
        max: { type: Number }
    },
    emergencyAvailable: { type: Boolean, default: true },
    ambulanceAvailable: { type: Boolean, default: true },
    teleconsultationAvailable: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hospital', HospitalSchema);
