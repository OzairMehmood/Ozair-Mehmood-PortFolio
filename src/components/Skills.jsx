import React from 'react';
import { motion } from 'framer-motion';
import { FaAndroid, FaServer, FaDatabase, FaBrain, FaTools } from 'react-icons/fa';
import './Skills.css';

const skillCategories = [
    {
        title: "Android Development",
        icon: <FaAndroid size={22} className="category-icon android-color" />,
        skills: [
            { name: "Kotlin", level: 95 },
            { name: "Java", level: 85 },
            { name: "Android SDK", level: 90 },
            { name: "XML Layouts", level: 90 },
            { name: "Camera2 API", level: 80 },
            { name: "Room Database", level: 88 },
            { name: "Retrofit", level: 90 },
            { name: "Coroutines", level: 88 },
            { name: "MVVM Architecture", level: 92 },
            { name: "Hilt / Dependency Injection", level: 85 }
        ]
    },
    {
        title: "Backend Development",
        icon: <FaServer size={22} className="category-icon backend-color" />,
        skills: [
            { name: "Node.js", level: 85 },
            { name: "Express.js", level: 82 },
            { name: "FastAPI", level: 88 },
            { name: "REST APIs", level: 92 },
            { name: "JWT Authentication", level: 85 },
            { name: "Middleware Systems", level: 80 }
        ]
    },
    {
        title: "Database Systems",
        icon: <FaDatabase size={22} className="category-icon db-color" />,
        skills: [
            { name: "MySQL", level: 85 },
            { name: "SQLite", level: 88 },
            { name: "Firebase", level: 90 }
        ]
    },
    {
        title: "AI & Computer Vision",
        icon: <FaBrain size={22} className="category-icon ai-color" />,
        skills: [
            { name: "YOLOv8", level: 82 },
            { name: "OpenCV", level: 80 },
            { name: "Object Detection", level: 85 }
        ]
    },
    {
        title: "Tools & Environment",
        icon: <FaTools size={22} className="category-icon tools-color" />,
        skills: [
            { name: "Git", level: 88 },
            { name: "GitHub", level: 90 },
            { name: "Postman", level: 92 },
            { name: "Swagger / OpenAPI", level: 85 },
            { name: "Android Studio", level: 92 }
        ]
    }
];

const Skills = () => {
    // Animation container settings for scroll reveals
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 70,
                damping: 15
            }
        }
    };

    return (
        <section className="skills-section container" id="skills">
            <div className="section-header">
                <h2 className="section-title gradient-text">Technical Expertise</h2>
                <p className="section-subtitle text-muted">
                    Categorized breakdown of my core technical stack, frameworks, and engineering tools.
                </p>
            </div>

            <motion.div 
                className="skills-categories-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {skillCategories.map((category, index) => (
                    <motion.div 
                        key={index} 
                        className="skill-category-card glass-card"
                        variants={cardVariants}
                    >
                        <div className="category-title-wrapper">
                            {category.icon}
                            <h3 className="category-title">{category.title}</h3>
                        </div>

                        <div className="skills-list">
                            {category.skills.map((skill, sIndex) => (
                                <div key={sIndex} className="skill-item">
                                    <div className="skill-info">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-percentage">{skill.level}%</span>
                                    </div>
                                    <div className="skill-bar-bg">
                                        <motion.div 
                                            className="skill-bar-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Skills;
