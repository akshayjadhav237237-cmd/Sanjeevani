import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import Record from '../models/Record';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, upload.single('file'), async (req: AuthRequest, res) => {
    try {
        const { title, type, date } = req.body;
        const file = (req as any).file;

        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        const newRecord = new Record({
            userId: req.userId,
            title,
            type,
            date,
            fileUrl: file.path, // In real app, upload to S3 and use URL
            tags: [type, 'AI Tagged']
        });

        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const records = await Record.find({ userId: req.userId }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
