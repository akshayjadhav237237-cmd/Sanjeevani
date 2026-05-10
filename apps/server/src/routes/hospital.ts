import express from 'express';
import Hospital from '../models/Hospital';

const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        const { query, specialty, city, insurance } = req.query;

        let filter: any = {};

        if (query) {
            filter.name = { $regex: query, $options: 'i' };
        }
        if (specialty) {
            filter.specialties = { $in: [specialty] };
        }
        if (city) {
            filter['location.city'] = city;
        }
        if (insurance) {
            filter.insuranceAccepted = { $in: [insurance] };
        }

        const hospitals = await Hospital.find(filter);
        res.json(hospitals);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
        res.json(hospital);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin/System: Seed some data
router.post('/seed', async (req, res) => {
    try {
        const dummyHospitals = [
            {
                name: "Apollo Hospital",
                location: { address: "Bannerghatta Road", city: "Bangalore", lat: 12.893, lng: 77.599 },
                specialties: ["Cardiology", "Neurology", "Emergency"],
                rating: 4.8,
                priceRange: "$$$",
                insuranceAccepted: ["Star Health", "HDFC ERGO"],
                beds: {
                    icu: { total: 20, available: 5 },
                    emergency: { total: 15, available: 2 },
                    general: { total: 50, available: 12 }
                },
                facilities: ["24/7 Pharmacy", "Ambulance", "Cafeteria"]
            },
            {
                name: "Fortis Hospital",
                location: { address: "Cunningham Road", city: "Bangalore", lat: 12.988, lng: 77.594 },
                specialties: ["Orthopedics", "Pediatrics", "Emergency"],
                rating: 4.6,
                priceRange: "$$",
                insuranceAccepted: ["ICICI Lombard", "Star Health"],
                beds: {
                    icu: { total: 15, available: 0 },
                    emergency: { total: 10, available: 4 },
                    general: { total: 40, available: 18 }
                },
                facilities: ["MRI", "Diagnostics", "Ambulance"]
            }
        ];
        await Hospital.insertMany(dummyHospitals);
        res.json({ message: "Seeded data successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error seeding" });
    }
});

export default router;
