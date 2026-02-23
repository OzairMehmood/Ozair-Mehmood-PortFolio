import React from 'react';
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming Languages",
            skills: ["Kotlin", "Java", "Python", "C++", "JavaScript", "SQL"]
        },
        {
            title: "Android Development",
            skills: ["Android SDK", "Android Studio", "Gradle", "XML", "Material Design"]
        },
        {
            title: "Architecture & Patterns",
            skills: ["MVVM", "Clean Architecture", "Repository Pattern", "Dependency Injection"]
        },
        {
            title: "Libraries & Frameworks",
            skills: ["Retrofit", "Glide", "Coroutines", "ViewModel", "Dagger/Hilt"]
        },
        {
            title: "Databases & Backend",
            skills: ["SQLite", "Room Database", "Firebase"]
        },
        {
            title: "Monetization & Tools",
            skills: ["Google AdMob", "RESTful APIs", "GitHub", "Postman"]
        }
    ];

    return (
        <section className="skills-section container" id="skills">
            <h2 className="section-title gradient-text">Technical Skills</h2>

            <div className="skills-grid">
                {skillCategories.map((category, index) => (
                    <div key={index} className="skill-card glass-card">
                        <h3 className="skill-category-title">{category.title}</h3>
                        <div className="skill-tags">
                            {category.skills.map((skill, sIndex) => (
                                <span key={sIndex} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
