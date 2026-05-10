import mongoose, { Schema, Document } from 'mongoose';

export interface IRecord extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    type: string; // 'Blood Report', 'X-Ray', 'Prescription', etc.
    fileUrl: string;
    tags: string[];
    date: Date;
    aiSummary?: string;
    doctorNotes?: string;
    createdAt: Date;
}

const RecordSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    fileUrl: { type: String, required: true },
    tags: [{ type: String }],
    date: { type: Date, default: Date.now },
    aiSummary: { type: String },
    doctorNotes: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Record || mongoose.model<IRecord>('Record', RecordSchema);
