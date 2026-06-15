import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

/**
 * Sends an email using EmailJS
 * @param {Object} templateParams - Parameters to send (name, email, subject, message)
 * @returns {Promise} Resolves if email sends successfully, rejects otherwise
 */
export const sendEmail = async (templateParams) => {
    // Basic validation
    if (!templateParams.name || !templateParams.email || !templateParams.message) {
        throw new Error('Please fill in all required fields (Name, Email, Message).');
    }

    // Check if configuration is available (fallback mock behavior if not configured)
    if (
        !SERVICE_ID ||
        !TEMPLATE_ID ||
        !PUBLIC_KEY ||
        SERVICE_ID === 'service_yzjgyli' ||
        TEMPLATE_ID === 'template_nln1d86' ||
        PUBLIC_KEY === 'gWulrHyPLIKZaCCoY'
    ) {
        console.warn('EmailJS environment variables are not set or are using placeholders. Simulating successful send.');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: 200, text: 'MOCK_SUCCESS' });
            }, 1000);
        });
    }

    try {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            {
                from_name: templateParams.name,
                from_email: templateParams.email,
                subject: templateParams.subject || 'Portfolio Contact Form',
                message: templateParams.message,
            },
            PUBLIC_KEY
        );
        return response;
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw new Error(error?.text || 'Failed to send message. Please try again later.');
    }
};
