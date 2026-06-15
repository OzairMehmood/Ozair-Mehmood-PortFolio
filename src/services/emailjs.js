import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendEmail = async (templateParams) => {
    if (!templateParams.name?.trim()) {
        throw new Error('Name is required');
    }

    if (!templateParams.email?.trim()) {
        throw new Error('Email is required');
    }

    if (!templateParams.message?.trim()) {
        throw new Error('Message is required');
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error(
            'EmailJS configuration missing. Check your .env file.'
        );
    }

    try {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                from_name: templateParams.name,
                from_email: templateParams.email,
                subject:
                    templateParams.subject || 'Portfolio Contact Form',
                message: templateParams.message,
            },
            PUBLIC_KEY
        );

        return response;
    } catch (error) {
        console.error('EmailJS Error:', error);

        throw new Error(
            error?.text ||
            error?.message ||
            'Failed to send email.'
        );
    }
};