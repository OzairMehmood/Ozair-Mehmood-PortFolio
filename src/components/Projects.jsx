import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Period Calendar & Cycle Tracker App',
            description: 'A women’s health period tracking and cycle prediction app with a clean, intuitive UI. Features offline-first data storage and calendar-based visualization for cycle history.',
            tags: ['Kotlin', 'Android SDK', 'Room DB', 'MVVM'],
            link: '#',
            github: '#'
        },
        {
            id: 2,
            title: 'Custom Android Launcher',
            description: 'A feature-rich Android launcher with customizable home screens, gestures, and themes. Includes advanced widget management and a theme engine.',
            tags: ['Kotlin', 'Android SDK', 'SQLite', 'Material Design'],
            link: '#',
            github: '#'
        },
        {
            id: 3,
            title: 'Islamic Dua & Quran App',
            description: 'A complete Islamic app featuring Quran, duas, dhikr, and prayer timings with multiple calculation methods and Qibla direction.',
            tags: ['Java', 'Android SDK', 'SQLite', 'Location APIs'],
            link: '#',
            github: '#'
        },
        {
            id: 4,
            title: 'GPS Map Camera',
            description: 'An advanced camera app embedding real-time GPS coordinates and addresses on photos using Google Maps API and reverse geocoding.',
            tags: ['Kotlin', 'Camera2 API', 'Location Services'],
            link: '#',
            github: '#'
        },
        {
            id: 5,
            title: 'Medical Dictionary (Offline)',
            description: 'An offline medical dictionary with 1000+ terms, fast full-text search, voice search, and text-to-speech support.',
            tags: ['Kotlin', 'Room DB', 'FTS'],
            link: '#',
            github: '#'
        },
        {
            id: 6,
            title: 'Learn Ethical Hacking App',
            description: 'A cybersecurity learning application with modular learning paths, progress tracking, achievements, and secure data storage.',
            tags: ['Kotlin', 'Android SDK', 'SQLite'],
            link: '#',
            github: '#'
        }
    ];

    return (
        <section className="projects-section container" id="projects">
            <h2 className="section-title gradient-text">Technical Projects</h2>

            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card glass-card">
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc text-muted">{project.description}</p>

                            <div className="project-tags">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="project-links">
                            <a href={project.github} className="icon-link" aria-label="GitHub Repository">
                                <Github size={20} />
                            </a>
                            <a href={project.link} className="icon-link" aria-label="Live Demo">
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
