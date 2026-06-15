import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import './Navbar.css';

const navLinks = [
    { name: 'Home', id: 'profile' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' },
];

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('profile');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Track scroll progress and navbar background state
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(progress);
            }
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Section highlighting using Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main viewport area
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navLinks.forEach((link) => {
            const el = document.getElementById(link.id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            // Check if Lenis is initialized globally or scroll manually with smooth behavior
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
            {/* Top scroll progress bar */}
            <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

            <div className="navbar-container container">
                <a href="#profile" className="logo gradient-text" onClick={(e) => handleNavClick(e, 'profile')}>
                    OM<span className="logo-dot">.</span>
                </a>

                {/* Desktop Menu */}
                <nav className="desktop-nav">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle magnetic-btn"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </nav>

                {/* Mobile Controls */}
                <div className="mobile-controls">
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle magnetic-btn"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button
                        onClick={toggleMenu}
                        className="hamburger-menu"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
