import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Helper: build safe user response (no password)
const safeUser = (user: any) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    onboarded: user.onboarded,
    profileComplete: user.profileComplete,
    healthScore: user.healthScore || 0,
    createdAt: user.createdAt,
    dateOfBirth: user.dateOfBirth,
    age: user.age,
    gender: user.gender,
    bloodGroup: user.bloodGroup,
    height: user.height,
    weight: user.weight,
    bmi: user.bmi,
    language: user.language,
    city: user.city,
    abhaId: user.abhaId,
    avatar: user.avatar,
    chronicConditions: user.chronicConditions,
    allergies: user.allergies,
    medications: user.medications,
    pastSurgeries: user.pastSurgeries,
    insurance: user.insurance,
    emergencyContacts: user.emergencyContacts,
    notifications: user.notifications,
    facialRecognition: user.facialRecognition,
});

router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || name.trim().length < 2) {
            return res.status(400).json({ success: false, message: 'Please provide your full name (minimum 2 characters)' });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        if (!phone) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const existing = await User.findOne({ $or: [{ email: email.toLowerCase() }, { phone }] });
        if (existing) {
            return res.status(400).json({ success: false, message: 'Account already exists with this email or phone' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            phone,
            password: hashedPassword,
            profileComplete: false,
            healthScore: 0,
            onboarded: false,
        });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            message: `Welcome to Sanjeevni, ${user.name}!`,
            token,
            user: safeUser(user),
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email?.toLowerCase() });
        if (!user || !user.password) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

        res.json({
            success: true,
            message: `Welcome back, ${user.name}!`,
            token,
            user: safeUser(user),
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

export default router;
