import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

const projectsData = [
    {
        id: 1,
        title: 'Shopping Assistant (FYP)',
        category: 'Full-Stack & Mobile',
        tags: ['Kotlin', 'Android SDK', 'FastAPI', 'MySQL', 'Room DB'],
        github: 'https://github.com/ozairmehmood',
        demo: '#',
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
        github: 'https://github.com/ozairmehmood',
        demo: '#',
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
        title: 'Object Detection REST API',
        category: 'AI & Computer Vision',
        tags: ['Python', 'FastAPI', 'YOLOv8', 'OpenCV', 'Docker'],
        github: 'https://github.com/ozairmehmood',
        demo: '#',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Offloads complex image inference tasks from battery-constrained mobile systems to high-performance servers, avoiding large app packages.'
            },
            {
                title: 'Key Achievements',
                content: 'Deployed a FastAPI REST service wrapping YOLOv8 models. Optimized model weights to process video frames in under 180ms.'
            },
            {
                title: 'Architecture & Design',
                content: 'Dockerized microservice environment with endpoint token validation, logging middleware, and clean Swagger/OpenAPI docs.'
            }
        ]
    },
    {
        id: 4,
        title: 'Period Calendar & Cycle Tracker',
        category: 'Mobile Health App',
        tags: ['Kotlin', 'Android SDK', 'Room DB', 'MVVM'],
        github: 'https://github.com/ozairmehmood',
        demo: '#',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Ensures absolute medical data privacy by avoiding cloud services. Tracks women’s health entirely offline, local-only.'
            },
            {
                title: 'Key Achievements',
                content: 'Implemented local mathematical prediction algorithms for cycle tracking. Created interactive calendar visualizations.'
            },
            {
                title: 'Architecture & Design',
                content: 'Built using Room local database, MVVM architectural state patterns, Flow, and clean repository layers.'
            }
        ]
    },
    {
        id: 5,
        title: 'GPS Map Camera',
        category: 'Utility Camera App',
        tags: ['Kotlin', 'Camera2 API', 'Google Maps API', 'Location Services'],
        github: 'https://github.com/ozairmehmood',
        demo: '#',
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
        id: 6,
        title: 'Islamic Dua & Quran App',
        category: 'Mobile Utility App',
        tags: ['Java', 'Android SDK', 'SQLite', 'Location Services'],
        github: 'https://github.com/ozairmehmood',
        demo: '#',
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
    },
    {
        id: 7,
        title: 'Medical Dictionary (Offline)',
        category: 'Mobile Reference App',
        tags: ['Kotlin', 'Room DB', 'FTS Search', 'Android Speech'],
        github: 'https://github.com/ozairmehmood',
        demo: '#',
        slides: [
            {
                title: 'Problem Solved',
                content: 'Enables healthcare workers to instantly check over 1000+ medical terms and pronunciations in locations with poor internet.'
            },
            {
                title: 'Key Achievements',
                content: 'Implemented SQLite Full-Text Search (FTS4) for instant lookup suggestions. Integrated text-to-speech engine.'
            },
            {
                title: 'Architecture & Design',
                content: 'High-speed index tables, clean database architecture, and background database loading tasks for quick UI startup.'
            }
        ]
    }
];

// Interactive Card with 3D Tilt Effect and Carousel
const ProjectCard = ({ project }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    // Mouse movement hooks for Framer Motion 3D Tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-200, 200], [10, -10]);
    const rotateY = useTransform(x, [-200, 200], [-10, 10]);

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            data-cursor-text="Swipe Slide"
        >
            <div className="project-card glass-card">
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

                {/* Project Links Footer */}
                <div className="project-footer">
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link-btn" aria-label="Github Code">
                        <FaGithub size={16} /> Code
                    </a>
                    <a href={project.demo} className="project-link-btn primary-btn" aria-label="Live Demo">
                        <FaExternalLinkAlt size={14} /> Live Demo
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
                <h2 className="section-title gradient-text">Featured Projects</h2>
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
