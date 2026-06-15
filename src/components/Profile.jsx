import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAndroid, FaNodeJs, FaJava, FaPython, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiKotlin, SiFastapi, SiOpencv } from 'react-icons/si';
import { Mail, Smartphone, ArrowDown } from 'lucide-react';
import './Profile.css';

const roles = [
    'Android Developer',
    'Backend Developer',
    'Kotlin Expert',
    'FastAPI Developer',
    'Node.js Developer',
    'Computer Vision Engineer'
];

const stats = [
    { title: '2+ Years', desc: 'Experience', detail: 'ZeeSign Tech & Native Android Dev' },
    { title: '5+ Apps', desc: 'Play Store Apps', detail: 'Production-ready Native Releases' },
    { title: 'Kotlin', desc: 'Specialist', detail: 'Modern Mobile Development' },
    { title: 'Node.js', desc: 'Backend Developer', detail: 'Express.js & RESTful APIs' },
    { title: 'FastAPI', desc: 'Developer', detail: 'High Performance Python APIs' },
    { title: 'CV / AI', desc: 'Computer Vision', detail: 'YOLOv8 & OpenCV Detections' },
    { title: 'AdMob', desc: 'Monetization', detail: 'Banner, Interstitial, Native Ads' },
    { title: 'Clean Architecture', desc: 'MVVM Pattern', detail: 'Robust, Scalable Architecture' }
];

class Particle {
    constructor(width, height) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update(width, height) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const Profile = () => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const canvasRef = useRef(null);

    // Typing loop for roles
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Canvas Particles Background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 45;

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="profile-section" id="profile">
            {/* Particle Canvas Background */}
            <canvas ref={canvasRef} className="particles-canvas" />

            {/* Float gradient glow spots */}
            <div className="glow-spot glow-1" />
            <div className="glow-spot glow-2" />

            <div className="hero-content-wrapper container">
                <div className="hero-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="greeting">Hello, I'm</h2>
                        <h1 className="name gradient-text">Ozair Mehmood</h1>
                        
                        <div className="role-typing-container">
                            <span className="role-prefix">Professional </span>
                            <div className="typing-wrapper">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentRoleIndex}
                                        className="role-text gradient-text"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {roles[currentRoleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        <p className="bio text-muted">
                            Highly motivated Android Application Developer & Backend Engineer with 2+ years of hands-on experience
                            designing, developing, and deploying scalable applications. Specialized in Kotlin Native development,
                            MVVM & Clean Architecture, SQLite/Room, and high-performance Python/Node.js backend APIs. Experienced
                            in AI/Computer Vision integration (OpenCV, YOLOv8) and AdMob monetization setups.
                        </p>

                        <div className="social-links">
                            <a href="#contact" className="social-btn primary magnetic-btn">
                                <Mail size={18} /> Contact Me
                            </a>
                            <a href="https://github.com/ozairmehmood" className="social-icon magnetic-btn" target="_blank" rel="noreferrer" aria-label="GitHub">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/ozair-mehmood-188294301" className="social-icon magnetic-btn" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="tel:+923169493425" className="social-icon magnetic-btn" aria-label="Phone">
                                <Smartphone size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="hero-right">
                    <motion.div
                        className="image-wrapper glow-effect"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                    >
                        <div className="animated-border"></div>
                        <div className="avatar-placeholder">
                            <img
                                src="/profile.jpeg"
                                alt="Ozair Mehmood"
                                className="profile-img-element"
                            />
                        </div>

                        {/* Floating Tech Badges */}
                        <motion.div className="tech-badge badge-kotlin" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                            <SiKotlin size={24} color="#7F52FF" />
                        </motion.div>
                        <motion.div className="tech-badge badge-android" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
                            <FaAndroid size={24} color="#3DDC84" />
                        </motion.div>
                        <motion.div className="tech-badge badge-node" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
                            <FaNodeJs size={24} color="#339933" />
                        </motion.div>
                        <motion.div className="tech-badge badge-fastapi" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
                            <SiFastapi size={24} color="#009688" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* About / Stats Upgrade */}
            <div className="about-stats-container container">
                <motion.div 
                    className="stats-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index} 
                            className="stat-card glass-card"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
                            }}
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.25)', borderColor: 'var(--accent-secondary)' }}
                        >
                            <h3 className="stat-value gradient-text">{stat.title}</h3>
                            <h4 className="stat-title">{stat.desc}</h4>
                            <p className="stat-detail text-muted">{stat.detail}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator-wrapper">
                <a href="#skills" aria-label="Scroll Down">
                    <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="scroll-arrow"
                    >
                        <ArrowDown size={20} />
                    </motion.div>
                </a>
            </div>
        </section>
    );
};

export default Profile;
