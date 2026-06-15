import React, { useState } from 'react';
import { Send, MessageCircle, Mail, Phone, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { sendEmail } from '../services/emailjs';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '' // Spam prevention bot-trap field
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Helper to display Toast messages
    const triggerToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: '' });
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Honeypot check (spam prevention)
        if (formData.honeypot) {
            console.warn('Bot detected via honeypot.');
            // Fail silently to the bot by simulating a success response
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                triggerToast('Message sent successfully!', 'success');
                setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
            }, 1000);
            return;
        }

        // 2. Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            triggerToast('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            triggerToast('Please enter a valid email address.', 'error');
            return;
        }

        // 3. Send via EmailJS service
        setLoading(true);
        try {
            await sendEmail({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            });
            triggerToast('Message sent successfully! I will get back to you soon.', 'success');
            setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
        } catch (error) {
            triggerToast(error.message || 'Failed to send message. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const currentYear = new Date().getFullYear();

    return (
        <section className="contact-section container" id="contact">
            {/* Success/Error Toast notification overlay */}
            {toast.show && (
                <div className={`toast-notification ${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                    <span>{toast.message}</span>
                </div>
            )}

            <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="section-title gradient-text">Get In Touch</h2>
                <p className="section-subtitle text-muted">
                    Let's collaborate! Drop me a message and let's build something amazing together.
                </p>
            </div>

            <div className="contact-container">
                {/* Contact Information Side Card */}
                <div className="contact-info glass-card">
                    <h3>Contact Information</h3>
                    <p className="text-muted info-desc">
                        Whether you want to discuss a new Android application project, API systems, or just say hello, my inbox is always open.
                    </p>

                    <div className="info-list">
                        <div className="info-item">
                            <Mail size={20} className="info-icon" />
                            <div>
                                <span className="info-label">Email Me</span>
                                <a href="mailto:ozairabbasi633@gmail.com" className="info-link">ozairabbasi633@gmail.com</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <Phone size={20} className="info-icon" />
                            <div>
                                <span className="info-label">Call Me</span>
                                <a href="tel:+923169493425" className="info-link">+92-316-949-3425</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <MapPin size={20} className="info-icon" />
                            <div>
                                <span className="info-label">Location</span>
                                <span className="info-text">Rawalpindi, Punjab, Pakistan</span>
                            </div>
                        </div>
                    </div>

                    <div className="direct-contact">
                        <a
                            href="https://wa.me/923169493425"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-btn magnetic-btn"
                        >
                            <MessageCircle size={22} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Professional Contact Form */}
                <form className="contact-form glass-card" onSubmit={handleSubmit} noValidate>
                    {/* Honeypot field (hidden from normal users) */}
                    <div className="honeypot-field" style={{ display: 'none' }}>
                        <input
                            type="text"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleChange}
                            tabIndex="-1"
                            autoComplete="off"
                            placeholder="Do not fill this if you are human"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Full Name <span className="required-star">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address <span className="required-star">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Project Inquiry"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message <span className="required-star">*</span></label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project, timeline, and goals..."
                            required
                            disabled={loading}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className={`submit-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span> Sending...
                            </>
                        ) : (
                            <>
                                <Send size={18} /> Send Message
                            </>
                        )}
                    </button>
                </form>
            </div>

            <footer className="footer">
                <p className="text-muted">© {currentYear} Ozair Mehmood. All rights reserved.</p>
                <p className="text-muted small">Android Native & Backend Developer</p>
            </footer>
        </section>
    );
};

export default ContactForm;
