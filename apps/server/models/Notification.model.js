const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'alert', 'reminder', 'system'], default: 'info' },
    read: { type: Boolean, default: false },
    data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
