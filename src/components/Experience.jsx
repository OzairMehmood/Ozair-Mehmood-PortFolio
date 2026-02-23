import React from 'react';
import { Briefcase } from 'lucide-react';
import './Experience.css';

const Experience = () => {
    return (
        <section className="experience-section container" id="experience">
            <h2 className="section-title gradient-text">Professional Experience</h2>

            <div className="timeline">
                <div className="timeline-item glass-card animate-fade-in">
                    <div className="timeline-icon">
                        <Briefcase size={20} />
                    </div>
                    <div className="timeline-content">
                        <h3 className="job-title">Mobile Application Developer</h3>
                        <h4 className="company">ZeeSign Tech — Rawalpindi, Pakistan</h4>
                        <span className="duration text-muted">Aug 2023 – Present</span>

                        <ul className="job-description">
                            <li>Developed and maintained 5+ production-level Android applications using Kotlin and Java.</li>
                            <li>Designed responsive and intuitive UI using XML layouts and Material Design, improving user engagement.</li>
                            <li>Integrated RESTful APIs and implemented local data persistence using SQLite & Room.</li>
                            <li>Implemented Google AdMob ads (Banner, Interstitial, Native) across multiple apps.</li>
                            <li>Optimized ad placement to balance user experience and revenue generation while ensuring AdMob policy compliance.</li>
                            <li>Optimized memory usage, background tasks, and app startup performance.</li>
                            <li>Collaborated with designers, backend engineers, and QA teams in an Agile/Scrum environment.</li>
                            <li>Followed clean coding standards, performed code reviews, and ensured scalable architecture.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
