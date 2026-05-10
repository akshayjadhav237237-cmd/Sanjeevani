import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Medicine from '../models/Medicine';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/prescriptions/' });

router.get('/search', async (req, res) => {
    try {
        const { query, category } = req.query;
        let filter: any = {};
        if (query) filter.name = { $regex: query, $options: 'i' };
        if (category) filter.category = category;

        const medicines = await Medicine.find(filter);
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/order', authMiddleware, upload.single('prescription'), async (req: AuthRequest, res) => {
    try {
        const { items, address } = req.body;
        // Simplified order logic
        res.status(201).json({
            message: 'Order placed successfully',
            orderId: 'ORD' + Math.floor(Math.random() * 100000)
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Seed data
router.post('/seed', async (req, res) => {
    try {
        const dummyMeds = [
            { name: "Paracetamol 500mg", manufacturer: "GSK", price: 50, category: "Fever", stock: 100, prescriptionRequired: false },
            { name: "Amoxicillin 250mg", manufacturer: "Cipla", price: 120, category: "Antibiotic", stock: 50, prescriptionRequired: true }
        ];
        await Medicine.insertMany(dummyMeds);
        res.json({ message: "Seeded medicines" });
    } catch (err) {
        res.status(500).json({ message: "Error seeding" });
    }
});

export default router;
