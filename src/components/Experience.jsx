import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, Award, Target, Zap } from 'lucide-react';
import './Experience.css';

const accomplishments = [
    { icon: <Award size={20} />, value: "5+", label: "Play Store Apps Released" },
    { icon: <Target size={20} />, value: "100%", label: "AdMob Policy Compliance" },
    { icon: <Zap size={20} />, value: "30%", label: "Startup Performance Boost" },
];

const Experience = () => {
    return (
        <section className="experience-section container" id="experience">
            <div className="section-header">
                <h2 className="section-title gradient-text">Professional Experience</h2>
                <p className="section-subtitle text-muted">
                    My career timeline and technical accomplishments in mobile application engineering.
                </p>
            </div>

            <div className="experience-container">
                {/* Achievement Highlight Counter Cards */}
                <div className="experience-stats">
                    {accomplishments.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="achievement-card glass-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ y: -5, borderColor: 'var(--accent-secondary)' }}
                        >
                            <div className="achievement-icon gradient-text">{item.icon}</div>
                            <h3 className="achievement-value gradient-text">{item.value}</h3>
                            <p className="achievement-label text-muted">{item.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Timeline Card */}
                <div className="experience-timeline">
                    <div className="timeline-trail" />

                    <motion.div 
                        className="timeline-card-wrapper"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: 'spring' }}
                    >
                        {/* Timeline node */}
                        <div className="timeline-node">
                            <Briefcase size={20} />
                        </div>

                        <div className="timeline-card-content glass-card">
                            <div className="timeline-card-header">
                                <div>
                                    <h3 className="role-title">Mobile Application Developer</h3>
                                    <h4 className="company-title gradient-text">ZeeSign Tech</h4>
                                    <p className="location-info text-muted">Rawalpindi, Punjab, Pakistan (On-site)</p>
                                </div>
                                <div className="duration-tag">
                                    <span>Aug 2023 – Present</span>
                                </div>
                            </div>

                            <ul className="achievements-list">
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Developed, optimized, and published 5+ production-level native Android applications using Kotlin and Java.</span>
                                </li>
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Designed responsive, high-fidelity XML layouts using Material Design guidelines to increase user retention.</span>
                                </li>
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Built robust local-first caching databases using SQLite and Room with offline-first synchronization logic.</span>
                                </li>
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Successfully integrated Google AdMob SDK (Banner, Interstitial, and Native Ads), optimizing revenue while strictly maintaining policy standards.</span>
                                </li>
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Integrated RESTful JSON APIs using Retrofit, coroutines, and structured concurrency patterns.</span>
                                </li>
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Refactored legacy codebases to MVVM Architecture & Clean Architecture, enhancing codebase maintainability and testability.</span>
                                </li>
                                <li>
                                    <CheckCircle size={16} className="bullet-icon" />
                                    <span>Collaborated closely with designers, backend engineers, and product owners using Agile/Scrum workflows.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
