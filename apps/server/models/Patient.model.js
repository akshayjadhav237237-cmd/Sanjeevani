const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer Not To Say'] },
    dateOfBirth: { type: Date },
    bloodGroup: { type: String },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    healthScore: { type: Number, default: 100 },
    location: {
        address: { type: String },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    medicalHistory: [{
        condition: String,
        diagnosedDate: Date,
        status: String
    }],
    allergies: {
        medicine: [String],
        food: [String],
        environmental: [String]
    },
    currentMedications: [{
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date
    }],
    surgeries: [{
        name: String,
        date: Date,
        hospital: String,
        doctor: String
    }],
    vaccinations: [{
        name: String,
        date: Date,
        nextDue: Date
    }],
    chronicConditions: [String],
    familyHistory: [{
        relation: String,
        condition: String
    }],
    disabilities: [String],
    familyMembers: [{
        name: String,
        relation: String,
        profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' } // Reference to another patient if they have a profile
    }],
    emergencyContacts: [{
        name: String,
        relation: String,
        phone: String
    }],
    insurance: {
        provider: String,
        policyNo: String,
        validity: Date,
        coverage: String
    },
    preferences: {
        language: { type: String, default: 'en' },
        notifications: { type: Boolean, default: true },
        facialRecognition: { type: Boolean, default: false }
    },
    fcmToken: { type: String },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', PatientSchema);
