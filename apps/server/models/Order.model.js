const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicines: [{
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
        quantity: Number,
        price: Number
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    prescription: String, // URL to uploaded prescription
    deliveryAddress: String,
    trackingId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
