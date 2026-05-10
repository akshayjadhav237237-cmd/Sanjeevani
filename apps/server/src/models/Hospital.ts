import mongoose, { Schema, Document } from 'mongoose';

export interface IHospital extends Document {
    name: string;
    location: {
        address: string;
        city: string;
        lat: number;
        lng: number;
    };
    specialties: string[];
    rating: number;
    priceRange: string;
    insuranceAccepted: string[];
    beds: {
        icu: { total: number; available: number };
        nicu: { total: number; available: number };
        emergency: { total: number; available: number };
        general: { total: number; available: number };
        private: { total: number; available: number };
    };
    facilities: string[];
    images: string[];
    createdAt: Date;
}

const HospitalSchema: Schema = new Schema({
    name: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    specialties: [{ type: String }],
    rating: { type: Number, default: 0 },
    priceRange: { type: String, enum: ['$', '$$', '$$$', '$$$$'] },
    insuranceAccepted: [{ type: String }],
    beds: {
        icu: { total: { type: Number }, available: { type: Number } },
        nicu: { total: { type: Number }, available: { type: Number } },
        emergency: { total: { type: Number }, available: { type: Number } },
        general: { total: { type: Number }, available: { type: Number } },
        private: { total: { type: Number }, available: { type: Number } },
    },
    facilities: [{ type: String }],
    images: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Hospital || mongoose.model<IHospital>('Hospital', HospitalSchema);
