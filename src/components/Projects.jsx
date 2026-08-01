import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

const projectsData = [
    {
        id: 1,
        title: 'Shopping Assistant (FYP)',
        category: 'Full-Stack & Mobile',
        featured: true,
        tags: ['Kotlin', 'Android SDK', 'FastAPI', 'MySQL', 'Room DB'],
        github: 'https://github.com/OzairMehmood/Ecom_Shopping_Assistant',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Eliminates manual store visits and tedious price comparison by providing automated real-time availability checks and price comparisons across multiple local outlets.'
            },
            {
                title: 'Key Achievements',
                content: 'Developed a high-speed item-matching and geocoded location-routing system. Achieved sub-150ms response times for FastAPI queries.'
            },
            {
                title: 'Architecture & Design',
                content: 'Clean architecture implementation using MVVM, repository patterns, and background syncing jobs for offline-first operation.'
            }
        ]
    },
    {
        id: 2,
        title: 'Custom Android Launcher',
        category: 'Mobile System App',
        tags: ['Kotlin', 'Android SDK', 'SQLite', 'Material Design'],
        github: 'https://github.com/OzairMehmood/My_Iphone_Launcher',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Replaces stock Android home screens that lack customization and gestures with a performance-optimized launcher engine.'
            },
            {
                title: 'Key Achievements',
                content: 'Programmed custom gesture recognition systems and dynamic user widget grids. Reduced RAM usage by 40% compared to typical launchers.'
            },
            {
                title: 'Architecture & Design',
                content: 'Highly responsive custom views, animation triggers, and low-latency local SQLite configuration.'
            }
        ]
    },
    {
        id: 3,
        title: 'GPS Map Camera',
        category: 'Utility Camera App',
        tags: ['Kotlin', 'Camera2 API', 'Google Maps API', 'Location Services'],
        github: 'https://github.com/OzairMehmood/Gps-Map-Camera',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Allows survey professionals and engineers to take photos with auto-stamped geographical positions, map embeds, and timestamps.'
            },
            {
                title: 'Key Achievements',
                content: 'Managed complex hardware integrations via Google Camera2 API. Embedded real-time EXIF location metadata directly on JPEG captures.'
            },
            {
                title: 'Architecture & Design',
                content: 'Asynchronous camera captures, background thread image stamping, and robust Location Provider wrappers.'
            }
        ]
    },
    {
        id: 4,
        title: 'Ramadaan Companion',
        category: 'Mobile Utility App',
        tags: ['Java', 'Android SDK', 'SQLite', 'Location Services'],
        github: 'https://github.com/OzairMehmood/RamadaanCompanion',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Aggregates religious texts, translated Quran recitations, and precise local prayer time calculations in a zero-network app.'
            },
            {
                title: 'Key Achievements',
                content: 'Programmed offline astronomical prayer calculations. Integrated sound reciters with native Media Playback services.'
            },
            {
                title: 'Architecture & Design',
                content: 'Built in Java with optimized local database indexing for high-speed searches across large books of text.'
            }
        ]
    }
];

// Interactive Card with 3D Tilt Effect and Carousel
const ProjectCard = ({ project }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = (e) => {
        e.stopPropagation();
        setActiveSlide((prev) => (prev + 1) % project.slides.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setActiveSlide((prev) => (prev - 1 + project.slides.length) % project.slides.length);
    };

    return (
        <motion.div
            className="project-card-wrapper"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            data-cursor-text="Swipe Slide"
        >
            <div className="project-card glass-card">
                {project.featured && <span className="featured-ribbon">Featured</span>}

                {/* Project Header Info */}
                <div className="project-header">
                    <span className="project-category">{project.category}</span>
                    <h3 className="project-title">{project.title}</h3>
                </div>

                {/* Simulated Image Carousel / Achievements Showcase */}
                <div className="project-carousel-container">
                    <div className="project-carousel-slide">
                        <span className="slide-label">{project.slides[activeSlide].title}</span>
                        <p className="slide-content">{project.slides[activeSlide].content}</p>
                    </div>

                    {/* Carousel Nav Controls */}
                    <div className="carousel-controls">
                        <button onClick={prevSlide} className="carousel-btn" aria-label="Previous Slide">
                            <FaChevronLeft size={12} />
                        </button>
                        <div className="carousel-indicators">
                            {project.slides.map((_, i) => (
                                <span 
                                    key={i} 
                                    className={`indicator ${activeSlide === i ? 'active' : ''}`} 
                                    onClick={(e) => { e.stopPropagation(); setActiveSlide(i); }}
                                />
                            ))}
                        </div>
                        <button onClick={nextSlide} className="carousel-btn" aria-label="Next Slide">
                            <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>

                {/* Technology Badges */}
                <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                    ))}
                </div>

                {/* Project Link Footer */}
                <div className="project-footer">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="project-link-btn primary-btn"
                        aria-label={`View ${project.title} source code on GitHub`}
                    >
                        <FaGithub size={18} /> View Source Code
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section className="projects-section container" id="projects">
            <div className="section-header">
                <h2 className="section-title">Featured Projects</h2>
                <p className="section-subtitle text-muted">
                    Explore a curated list of my technical work, highlighting problem-solving, architectural design, and stack integrations.
                </p>
            </div>

            <div className="projects-grid">
                {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
