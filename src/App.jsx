import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './components/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import ContactForm from './components/ContactForm';
import { ArrowUp } from 'lucide-react';
import './index.css';

function AppContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // 1. Initialize Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1.0,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Track scroll to show/hide back-to-top button
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            lenis.destroy();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Custom Cursor System */}
            <CustomCursor />

            {/* Intro Loading Sequence */}
            {isLoading ? (
                <Loader onComplete={() => setIsLoading(false)} />
            ) : (
                <div className="portfolio-app-root">
                    {/* Sticky Navbar */}
                    <Navbar />

                    {/* Main Sections */}
                    <main>
                        <Profile />
                        <Skills />
                        <Experience />
                        <Projects />
                        <Education />
                        <ContactForm />
                    </main>

                    {/* Back-To-Top Trigger Button */}
                    {showBackToTop && (
                        <a
                            href="#profile"
                            onClick={scrollToTop}
                            className="back-to-top-btn"
                            aria-label="Back to top"
                        >
                            <ArrowUp size={20} />
                        </a>
                    )}
                </div>
            )}
        </>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

export default App;
