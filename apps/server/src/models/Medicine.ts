import mongoose, { Schema, Document } from 'mongoose';

export interface IMedicine extends Document {
    name: string;
    manufacturer: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    prescriptionRequired: boolean;
    image?: string;
}

const MedicineSchema: Schema = new Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
    prescriptionRequired: { type: Boolean, default: false },
    image: { type: String },
});

export default mongoose.models.Medicine || mongoose.model<IMedicine>('Medicine', MedicineSchema);
