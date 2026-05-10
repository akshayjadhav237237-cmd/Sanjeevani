import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password?: string;
    // Health profile
    dateOfBirth?: string;
    age?: number;
    gender?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    bmi?: number;
    language?: string;
    city?: string;
    abhaId?: string;
    avatar?: string;
    // Medical
    chronicConditions?: string[];
    allergies?: {
        medicine: string[];
        food: string[];
    };
    medications?: {
        name: string;
        dosage: string;
        frequency: string;
    }[];
    pastSurgeries?: {
        name: string;
        year: string;
        hospital: string;
    }[];
    // Insurance
    insurance?: {
        provider: string;
        policyNumber: string;
        validUntil?: string;
        coverageAmount?: number;
        scheme?: string[];
    };
    // Emergency
    emergencyContacts?: {
        name: string;
        phone: string;
        relation: string;
    }[];
    // Preferences
    notifications?: {
        medicines: boolean;
        appointments: boolean;
        lab: boolean;
        emergency: boolean;
        tips: boolean;
    };
    facialRecognition?: boolean;
    healthScore: number;
    onboarded: boolean;
    profileComplete: boolean;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String },
    dateOfBirth: { type: String },
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    height: { type: Number },
    weight: { type: Number },
    bmi: { type: Number },
    language: { type: String },
    city: { type: String },
    abhaId: { type: String },
    avatar: { type: String },
    chronicConditions: [{ type: String }],
    allergies: {
        medicine: [{ type: String }],
        food: [{ type: String }],
    },
    medications: [
        {
            name: { type: String },
            dosage: { type: String },
            frequency: { type: String },
        }
    ],
    pastSurgeries: [
        {
            name: { type: String },
            year: { type: String },
            hospital: { type: String },
        }
    ],
    insurance: {
        provider: { type: String },
        policyNumber: { type: String },
        validUntil: { type: String },
        coverageAmount: { type: Number },
        scheme: [{ type: String }],
    },
    emergencyContacts: [
        {
            name: { type: String },
            phone: { type: String },
            relation: { type: String },
        },
    ],
    notifications: {
        medicines: { type: Boolean, default: true },
        appointments: { type: Boolean, default: true },
        lab: { type: Boolean, default: false },
        emergency: { type: Boolean, default: true },
        tips: { type: Boolean, default: false },
    },
    facialRecognition: { type: Boolean, default: false },
    healthScore: { type: Number, default: 0 },
    onboarded: { type: Boolean, default: false },
    profileComplete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
