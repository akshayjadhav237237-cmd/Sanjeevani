import { z } from 'zod';

export const UserRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  phone: z.string(),
});

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;

export const HospitalSchema = z.object({
  name: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string(),
  }),
  specialties: z.array(z.string()),
  beds: z.object({
    icu: z.number(),
    nicu: z.number(),
    emergency: z.number(),
    general: z.number(),
    private: z.number(),
  }),
});

export type Hospital = z.infer<typeof HospitalSchema>;
