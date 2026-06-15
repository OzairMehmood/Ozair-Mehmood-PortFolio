import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import './Experience.css'; // Reuse timeline styles for styling consistency

const coursework = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Systems",
    "Software Engineering",
    "Web Application Development",
    "Operating Systems"
];

const Education = () => {
    return (
        <section className="education-section container" id="education" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="section-title gradient-text">Education & Credentials</h2>
                <p className="section-subtitle text-muted">
                    Academic foundation in computer science and key conceptual coursework.
                </p>
            </div>

            <div className="experience-container" style={{ justifyContent: 'center' }}>
                {/* Visual side graphic */}
                <div className="experience-stats" style={{ flex: 0.8, justifyContent: 'center' }}>
                    <motion.div 
                        className="achievement-card glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -5, borderColor: 'var(--accent-secondary)' }}
                        style={{ height: 'auto', minHeight: '220px' }}
                    >
                        <div className="achievement-icon gradient-text">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="achievement-value gradient-text">BSCS</h3>
                        <p className="achievement-label text-muted">Bachelor of Science in Computer Science</p>
                    </motion.div>
                </div>

                {/* Timeline education card */}
                <div className="experience-timeline" style={{ flex: 1.2 }}>
                    <div className="timeline-trail" />

                    <motion.div 
                        className="timeline-card-wrapper"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: 'spring' }}
                    >
                        {/* Timeline node */}
                        <div className="timeline-node" style={{ borderColor: 'var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
                            <GraduationCap size={20} />
                        </div>

                        <div className="timeline-card-content glass-card">
                            <div className="timeline-card-header">
                                <div>
                                    <h3 className="role-title">Bachelor of Science in Computer Science</h3>
                                    <h4 className="company-title gradient-text">Arid Agriculture University</h4>
                                    <p className="location-info text-muted">Rawalpindi, Punjab, Pakistan</p>
                                </div>
                                <div className="duration-tag" style={{ background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-secondary)' }}>
                                    <span>Sep 2022 – Jul 2026</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <h5 style={{ color: 'var(--text-main)', fontWeight: '700', marginBottom: '1rem', fontSize: '1.05rem' }}>
                                    Key Coursework & Domains:
                                </h5>
                                <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                    {coursework.map((course, idx) => (
                                        <span 
                                            key={idx} 
                                            className="skill-tag"
                                            style={{
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                padding: '0.4rem 0.9rem',
                                                borderRadius: '2rem',
                                                background: 'var(--bg-card-hover)',
                                                border: '1px solid var(--border-color)',
                                                color: 'var(--text-muted)'
                                            }}
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Education;
