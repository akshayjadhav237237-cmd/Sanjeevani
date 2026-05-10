const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    genericName: { type: String },
    manufacturer: { type: String },
    price: { type: Number, required: true },
    description: String,
    sideEffects: [String],
    interactions: [String]
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);
