'use client';

import { motion } from 'framer-motion';

interface HealthScoreProps {
    score: number;
}

export function HealthScoreIndicator({ score }: HealthScoreProps) {
    const getStatusColor = (s: number) => {
        if (s >= 80) return 'text-secondary';
        if (s >= 50) return 'text-yellow-500';
        return 'text-destructive';
    };

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="64"
                    cy="64"
                    r="45"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-muted"
                />
                <motion.circle
                    cx="64"
                    cy="64"
                    r="45"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={getStatusColor(score)}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold">{score}</span>
                <span className="text-[10px] uppercase font-medium text-muted-foreground">Score</span>
            </div>
        </div>
    );
}
