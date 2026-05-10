const mongoose = require('mongoose');

const InsuranceSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    provider: { type: String, required: true },
    policyNumber: { type: String, required: true },
    groupNumber: String,
    coverageAmount: Number,
    validFrom: Date,
    validUntil: Date,
    type: { type: String, enum: ['personal', 'corporate', 'government'], required: true },
    status: { type: String, enum: ['active', 'expired', 'verifying'], default: 'verifying' },
    documentUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Insurance', InsuranceSchema);
