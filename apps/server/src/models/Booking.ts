import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId: mongoose.Types.ObjectId;
    hospitalId: mongoose.Types.ObjectId;
    type: 'Bed' | 'Appointment';
    subType?: 'ICU' | 'Emergency' | 'General' | 'Private'; // For Bed
    doctorName?: string; // For Appointment
    date: Date;
    time?: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    reason?: string;
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
    type: { type: String, enum: ['Bed', 'Appointment'], required: true },
    subType: { type: String },
    doctorName: { type: String },
    date: { type: Date, required: true },
    time: { type: String },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
