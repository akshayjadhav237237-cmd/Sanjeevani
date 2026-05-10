import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EmergencyContact {
    name: string;
    phone: string;
    relation: string;
}

export interface InsuranceInfo {
    provider: string;
    policyNumber: string;
    validUntil?: string;
    coverageAmount?: number;
    scheme?: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    onboarded: boolean;
    profileComplete?: boolean;
    healthScore?: number;
    createdAt?: string;

    // Health profile
    dateOfBirth?: string;
    age?: number;
    gender?: string;
    bloodGroup?: string;
    height?: number;
    weight?: number;
    bmi?: number;
    language?: string;
    city?: string;
    abhaId?: string;
    avatar?: string;

    // Medical
    chronicConditions?: string[];
    allergies?: {
        medicine?: string[];
        food?: string[];
    };
    medications?: {
        name: string;
        dosage: string;
        frequency: string;
    }[];
    pastSurgeries?: {
        name: string;
        year: string;
        hospital: string;
    }[];

    // Insurance & Contacts
    insurance?: InsuranceInfo;
    emergencyContacts?: EmergencyContact[];

    // Preferences
    notifications?: {
        medicines: boolean;
        appointments: boolean;
        lab: boolean;
        emergency: boolean;
        tips: boolean;
    };
    facialRecognition?: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    setAuth: (user: User, token: string) => void;
    updateUser: (data: Partial<User>) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,
            setAuth: (user, token) => set({ user, token }),
            updateUser: (data) => {
                const current = get().user;
                if (current) {
                    const updated = { ...current, ...data };
                    set({ user: updated });
                }
            },
            setLoading: (loading) => set({ isLoading: loading }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'sanjeevni-auth',
        }
    )
);
