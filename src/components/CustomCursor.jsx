import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [cursorText, setCursorText] = useState('');
    const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'text', 'hidden'
    const [isVisible, setIsVisible] = useState(false);

    // Mouse coordinates using Framer Motion values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring configuration for the outer ring trail
    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const trailX = useSpring(cursorX, springConfig);
    const trailY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Define hover listeners for various interactive elements
        const addListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, .social-icon, .theme-toggle, .nav-link'
            );
            
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', () => setCursorType('pointer'));
                el.addEventListener('mouseleave', () => {
                    setCursorType('default');
                    setCursorText('');
                });
            });

            // Project cards or custom text hovers
            const textHoverElements = document.querySelectorAll('[data-cursor-text]');
            textHoverElements.forEach((el) => {
                el.addEventListener('mouseenter', () => {
                    setCursorType('text');
                    setCursorText(el.getAttribute('data-cursor-text') || '');
                });
                el.addEventListener('mouseleave', () => {
                    setCursorType('default');
                    setCursorText('');
                });
            });

            // Magnetic element effects (adds subtle offset to cursor)
            const magneticElements = document.querySelectorAll('.magnetic-btn');
            magneticElements.forEach((el) => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    const distanceX = e.clientX - x;
                    const distanceY = e.clientY - y;

                    // Pull the element slightly in the direction of the mouse
                    el.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
                });
                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'translate(0px, 0px)';
                });
            });
        };

        // Run once, and run periodically to capture dynamically added elements
        addListeners();
        const interval = setInterval(addListeners, 2000);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearInterval(interval);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    // Framer motion variants for the outer ring based on cursor state
    const ringVariants = {
        default: {
            width: 32,
            height: 32,
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            border: '2px solid var(--accent-primary)',
        },
        pointer: {
            width: 50,
            height: 50,
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            border: '2px solid var(--accent-secondary)',
            scale: 1.2,
        },
        text: {
            width: 80,
            height: 80,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px dashed var(--accent-primary)',
            scale: 1,
        }
    };

    return (
        <div className="custom-cursor-container">
            {/* Smooth Outer Ring Trail */}
            <motion.div
                className="custom-cursor-ring"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={cursorType}
                variants={ringVariants}
                transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.6 }}
            >
                {cursorType === 'text' && (
                    <span className="cursor-text">{cursorText}</span>
                )}
            </motion.div>

            {/* Instant Inner Dot */}
            <motion.div
                className="custom-cursor-dot"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: cursorType === 'pointer' ? 0.5 : cursorType === 'text' ? 0 : 1,
                    backgroundColor: cursorType === 'pointer' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                }}
            />
        </div>
    );
};

export default CustomCursor;
