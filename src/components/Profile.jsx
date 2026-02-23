import React from 'react';
import { Github, Linkedin, Mail, Smartphone } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    return (
        <section className="profile-section container animate-fade-in" id="profile">
            <div className="profile-content">
                <h2 className="greeting">Hello, I'm</h2>
                <h1 className="name gradient-text">Ozair Mehmood</h1>
                <h3 className="role">Android Application Developer</h3>
                <p className="bio text-muted">
                    Highly motivated Android Application Developer with 2+ years of hands-on experience
                    in designing, developing, and deploying scalable Android applications using Kotlin and
                    Java. Strong expertise in MVVM & Clean Architecture, offline-first applications using
                    Room/SQLite, and performance optimization. Experienced in Google AdMob Ads,
                    RESTful API integration, and Play Store–ready apps. Passionate about building user-focused
                    mobile applications with clean, maintainable code.
                </p>

                <div className="social-links">
                    <a href="#contact" className="social-btn primary">
                        <Mail size={20} /> Contact Me
                    </a>
                    <a href="https://github.com/ozairmehmood" className="social-icon" target="_blank" rel="noreferrer">
                        <Github size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/ozair-mehmood-188294301" className="social-icon" target="_blank" rel="noreferrer">
                        <Linkedin size={24} />
                    </a>
                    <a href="tel:+923169493425" className="social-icon">
                        <Smartphone size={24} />
                    </a>
                </div>
            </div>

            <div className="profile-image-container animate-float">
                <div className="image-wrapper glow-effect">
                    <div className="animated-border"></div>
                    <div className="avatar-placeholder" style={{ padding: '6px' }}>
                        <img
                            src="/profile.jpeg"
                            alt="Ozair Mehmood"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                </div>
                <div className="floating-badge badge-1 glass-card">
                    <span className="badge-icon">📱</span> Android Native
                </div>
                <div className="floating-badge badge-2 glass-card">
                    <span className="badge-icon">⚡</span> Kotlin
                </div>
            </div>
        </section>
    );
};

export default Profile;
