import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Booking from '../models/Booking';
import Hospital from '../models/Hospital';

const router = express.Router();

router.post('/create', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { hospitalId, type, subType, doctorName, date, time, reason } = req.body;

        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

        // If bed booking, check availability
        if (type === 'Bed' && subType) {
            const bedType = subType.toLowerCase() as keyof typeof hospital.beds;
            if (hospital.beds[bedType].available <= 0) {
                return res.status(400).json({ message: 'No beds of this type available' });
            }
            // Decrement availability (In real app, use transaction)
            (hospital.beds[bedType] as any).available -= 1;
            await hospital.save();
        }

        const booking = new Booking({
            userId: req.userId,
            hospitalId,
            type,
            subType,
            doctorName,
            date,
            time,
            reason,
            status: 'Confirmed'
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/my-bookings', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const bookings = await Booking.find({ userId: req.userId }).populate('hospitalId', 'name location').sort({ date: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
