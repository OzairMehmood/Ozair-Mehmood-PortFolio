import React from 'react';
import { GraduationCap } from 'lucide-react';

const Education = () => {
    return (
        <section className="education-section container" id="education" style={{ paddingTop: '6rem' }}>
            <h2 className="section-title gradient-text">Education</h2>

            <div className="timeline">
                <div className="timeline-item glass-card animate-fade-in">
                    <div className="timeline-icon" style={{ borderColor: 'var(--accent-secondary)' }}>
                        <GraduationCap size={20} />
                    </div>
                    <div className="timeline-content">
                        <h3 className="job-title">Bachelor of Science in Computer Science</h3>
                        <h4 className="company">Arid Agriculture University, Rawalpindi, Pakistan</h4>
                        <span className="duration text-muted">Sep 2022 – Jul 2026</span>

                        <div style={{ marginTop: '1.5rem' }}>
                            <h5 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>Relevant Coursework:</h5>
                            <div className="skill-tags">
                                <span className="skill-tag">Data Structures & Algorithms</span>
                                <span className="skill-tag">Object-Oriented Programming</span>
                                <span className="skill-tag">Database Systems</span>
                                <span className="skill-tag">Software Engineering</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
