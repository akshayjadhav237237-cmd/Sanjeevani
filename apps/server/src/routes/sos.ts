import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Hospital from '../models/Hospital';

const router = express.Router();

router.post('/trigger', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const { lat, lng } = req.body;
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Find nearest hospital with available emergency beds
        const hospitals = await Hospital.find({
            'beds.emergency.available': { $gt: 0 }
        });

        // Simple nearest hospital logic (placeholder for geospatial query)
        let nearest = hospitals[0];
        let minDistance = Infinity;

        hospitals.forEach(h => {
            const dist = Math.sqrt(Math.pow(h.location.lat - lat, 2) + Math.pow(h.location.lng - lng, 2));
            if (dist < minDistance) {
                minDistance = dist;
                nearest = h;
            }
        });

        // In a real app, we'd trigger socket.io event to the hospital dashboard
        // and notify emergency contacts.

        res.json({
            message: 'Emergency SOS Triggered',
            hospital: nearest,
            eta: '8 mins',
            ambulanceContact: '+91 98765 43210'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
