const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    experience: { type: Number }, // years
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    consultationFee: { type: Number },
    availability: [{
        day: String,
        slots: [String]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
