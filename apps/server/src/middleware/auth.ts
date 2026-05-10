import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        if (!process.env.JWT_SECRET) {
            console.error('❌ JWT_SECRET is not defined in process.env');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        console.log('✅ Token verified for user:', decoded.userId);
        req.userId = decoded.userId;
        next();
    } catch (err: any) {
        console.error('❌ Token verification failed:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
