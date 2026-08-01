import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import './Experience.css'; // Reuse timeline styles for styling consistency
import './Education.css';

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
        <section className="education-section container" id="education">
            <div className="section-header">
                <h2 className="section-title">Education & Credentials</h2>
                <p className="section-subtitle text-muted">
                    Academic foundation in computer science and key conceptual coursework.
                </p>
            </div>

            <div className="experience-container education-container">
                {/* Visual side graphic */}
                <div className="experience-stats education-visual">
                    <motion.div
                        className="achievement-card glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -5, borderColor: 'var(--accent-secondary)' }}
                    >
                        <div className="achievement-icon accent-text">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="achievement-value accent-text">BSCS</h3>
                        <p className="achievement-label text-muted">Bachelor of Science in Computer Science</p>
                    </motion.div>
                </div>

                {/* Timeline education card */}
                <div className="experience-timeline education-timeline">
                    <div className="timeline-trail" />

                    <motion.div
                        className="timeline-card-wrapper"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, type: 'spring' }}
                    >
                        {/* Timeline node */}
                        <div className="timeline-node education-node">
                            <GraduationCap size={20} />
                        </div>

                        <div className="timeline-card-content glass-card">
                            <div className="timeline-card-header">
                                <div>
                                    <h3 className="role-title">Bachelor of Science in Computer Science</h3>
                                    <h4 className="company-title accent-text">Arid Agriculture University</h4>
                                    <p className="location-info text-muted">Rawalpindi, Punjab, Pakistan</p>
                                </div>
                                <div className="duration-tag education-duration-tag">
                                    <span>Sep 2022 – Jul 2026</span>
                                </div>
                            </div>

                            <div className="coursework-block">
                                <h5 className="coursework-heading">
                                    Key Coursework & Domains:
                                </h5>
                                <div className="coursework-tags">
                                    {coursework.map((course, idx) => (
                                        <span key={idx} className="skill-tag">
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
