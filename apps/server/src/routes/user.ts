import express, { Request, Response } from 'express';
import User from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Helper to calculate BMI
const calcBMI = (height?: number, weight?: number) => {
    if (!height || !weight) return undefined;
    const hm = height / 100;
    return parseFloat((weight / (hm * hm)).toFixed(1));
};

// Helper to calculate health score
const calcHealthScore = (user: any) => {
    let score = 100;
    const conditions = user.chronicConditions || [];
    score -= Math.min(conditions.length * 10, 40);
    const medAllergies = user.allergies?.medicine || [];
    score -= Math.min(medAllergies.length * 5, 20);
    if (user.bmi) {
        if (user.bmi < 18.5 || user.bmi >= 30) score -= 10;
        else if (user.bmi >= 25) score -= 5;
    }
    return Math.max(score, 0);
};

// Helper: safe user response
const safeUser = (user: any) => {
    const obj = user.toObject ? user.toObject() : user;
    const { password, __v, ...safe } = obj;
    return { ...safe, id: safe._id };
};

// GET /api/users/me
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
        const user = await User.findById(authReq.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' }) as any;
        res.json({ success: true, user: safeUser(user) });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /api/users/onboard  (full profile setup)
router.post('/onboard', authMiddleware, async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
        const {
            dateOfBirth, gender, bloodGroup, height, weight, language, city,
            chronicConditions, allergies, medications, pastSurgeries,
            emergencyContacts, insurance,
            notifications, facialRecognition, abhaId
        } = req.body;

        const user = await User.findById(authReq.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' }) as any;

        const bmi = calcBMI(height, weight);

        user.dateOfBirth = dateOfBirth;
        user.gender = gender;
        user.bloodGroup = bloodGroup;
        user.height = height;
        user.weight = weight;
        user.bmi = bmi;
        user.language = language;
        user.city = city;
        user.chronicConditions = chronicConditions || [];
        user.allergies = allergies || { medicine: [], food: [] };
        user.medications = medications || [];
        user.pastSurgeries = pastSurgeries || [];
        user.emergencyContacts = emergencyContacts || [];
        user.insurance = insurance;
        user.notifications = notifications || {
            medicines: true, appointments: true, lab: false, emergency: true, tips: false
        };
        user.facialRecognition = facialRecognition || false;
        user.abhaId = abhaId;
        user.onboarded = true;
        user.profileComplete = true;
        user.healthScore = calcHealthScore(user);

        await user.save();

        res.json({
            success: true,
            message: 'Profile setup complete!',
            user: safeUser(user),
        });
    } catch (err) {
        console.error('Onboard error:', err);
        res.status(500).json({ success: false, message: 'Server error during onboarding' });
    }
});

// PUT /api/users/profile  (edit profile)
router.put('/profile', authMiddleware, async (req: Request, res: Response) => {
    const authReq = req as AuthRequest;
    try {
        const user = await User.findById(authReq.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' }) as any;

        const allowedFields = [
            'name', 'phone', 'dateOfBirth', 'gender', 'bloodGroup',
            'height', 'weight', 'language', 'city', 'abhaId', 'avatar',
            'chronicConditions', 'allergies', 'medications', 'pastSurgeries',
            'emergencyContacts', 'insurance', 'notifications', 'facialRecognition'
        ];

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                (user as any)[field] = req.body[field];
            }
        }

        // Recalculate BMI if height/weight changed
        if (req.body.height || req.body.weight) {
            user.bmi = calcBMI(user.height, user.weight);
        }

        // Recalculate health score
        user.healthScore = calcHealthScore(user);

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully!',
            user: safeUser(user),
        });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(500).json({ success: false, message: 'Server error while updating profile' });
    }
});

export default router;
