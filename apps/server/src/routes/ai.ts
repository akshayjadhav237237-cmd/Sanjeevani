import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Helper to get Groq client safely
const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) return null;
    return new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1"
    });
};

router.post('/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        const client = getGroqClient();

        if (!client) {
            throw new Error('Groq API key missing');
        }

        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are Sanjeevni AI, a helpful healthcare assistant. You help users check symptoms, find hospitals, and understand medical reports. Always provide a disclaimer that you are an AI and not a substitute for professional medical advice. If an emergency is detected, urge the user to press the SOS button."
                },
                ...(history || []),
                { role: "user", content: message }
            ],
        });

        res.json({ message: response.choices[0].message.content });
    } catch (err) {
        console.error('Groq AI Error:', err);
        // Fallback for demo mode
        res.json({
            message: "I am currently in demo mode. Based on your symptoms, you might want to consult a General Physician. In case of severe pain or breathing issues, please use our SOS feature immediately."
        });
    }
});

export default router;
