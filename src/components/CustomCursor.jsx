import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

// Particle definition for hover energy bursts
class CursorParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0;
        this.decay = Math.random() * 0.04 + 0.02;
        // Cyan and Purple gradient range
        this.color = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6';
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98; // Friction
        this.vy *= 0.98;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const textRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // 1. Mobile & Touch Screen Detection
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 
                              'ontouchstart' in window || 
                              navigator.maxTouchPoints > 0;

        if (isTouchDevice) {
            document.body.classList.remove('hide-default-cursor');
            return;
        }

        // Hide browser default pointer
        document.body.classList.add('hide-default-cursor');

        // Refs to keep track of mouse and element coordinates
        const mouse = { x: -100, y: -100 };
        const dot = { x: -100, y: -100 };
        const ring = { x: -100, y: -100 };
        const particles = [];

        // Cache canvas size and references
        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext('2d') : null;

        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Update mouse position on mousemove
        const onMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        // GSAP quickSetters for instant hardware-accelerated transforms
        const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px');
        const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px');
        
        const setRingX = gsap.quickSetter(ringRef.current, 'x', 'px');
        const setRingY = gsap.quickSetter(ringRef.current, 'y', 'px');
        const setRingScaleX = gsap.quickSetter(ringRef.current, 'scaleX');
        const setRingScaleY = gsap.quickSetter(ringRef.current, 'scaleY');
        const setRingRotation = gsap.quickSetter(ringRef.current, 'rotation', 'deg');

        // Particle trigger function
        const triggerBurst = (x, y) => {
            for (let i = 0; i < 15; i++) {
                particles.push(new CursorParticle(x, y));
            }
        };

        // Event delegation to capture hovered states (extremely efficient, no dynamic re-renders)
        const onMouseOver = (e) => {
            const target = e.target;
            if (!target) return;

            // Check parent tree elements to catch nesting
            const interactive = target.closest('a, button, [role="button"], input, textarea, select, .social-icon, .theme-toggle');
            const projectCard = target.closest('[data-cursor-text]');
            const skillItem = target.closest('.skill-item, .skill-tag');
            const magneticBtn = target.closest('.magnetic-btn');

            if (interactive) {
                ringRef.current?.classList.add('hover-pointer');
                dotRef.current?.classList.add('hover-pointer');
            }
            if (projectCard) {
                ringRef.current?.classList.add('hover-project');
                if (textRef.current) {
                    textRef.current.innerText = projectCard.getAttribute('data-cursor-text') || 'View Project';
                }
            }
            if (skillItem) {
                ringRef.current?.classList.add('hover-skill');
                // Trigger initial particle burst on enter
                triggerBurst(mouse.x, mouse.y);
            }

            // Magnetic snap effect calculations
            if (magneticBtn) {
                const onMagneticMove = (event) => {
                    const rect = magneticBtn.getBoundingClientRect();
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    const distanceX = event.clientX - x;
                    const distanceY = event.clientY - y;
                    
                    // Smooth snap animation toward cursor
                    gsap.to(magneticBtn, {
                        x: distanceX * 0.35,
                        y: distanceY * 0.35,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                };

                const onMagneticLeave = () => {
                    gsap.to(magneticBtn, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.3)'
                    });
                    magneticBtn.removeEventListener('mousemove', onMagneticMove);
                    magneticBtn.removeEventListener('mouseleave', onMagneticLeave);
                };

                magneticBtn.addEventListener('mousemove', onMagneticMove);
                magneticBtn.addEventListener('mouseleave', onMagneticLeave);
            }
        };

        const onMouseOut = (e) => {
            const target = e.target;
            if (!target) return;

            const interactive = target.closest('a, button, [role="button"], input, textarea, select, .social-icon, .theme-toggle');
            const projectCard = target.closest('[data-cursor-text]');
            const skillItem = target.closest('.skill-item, .skill-tag');

            if (interactive) {
                ringRef.current?.classList.remove('hover-pointer');
                dotRef.current?.classList.remove('hover-pointer');
            }
            if (projectCard) {
                ringRef.current?.classList.remove('hover-project');
                if (textRef.current) textRef.current.innerText = '';
            }
            if (skillItem) {
                ringRef.current?.classList.remove('hover-skill');
            }
        };

        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        // Core high-performance animation loop
        let animationFrameId;
        const tick = () => {
            // 2. Ultra-smooth lerping with faster follow speed (0.28 follow speed)
            dot.x += (mouse.x - dot.x) * 0.75;
            dot.y += (mouse.y - dot.y) * 0.75;

            ring.x += (mouse.x - ring.x) * 0.28;
            ring.y += (mouse.y - ring.y) * 0.28;

            // 3. Motion blur calculations (stretch and squash based on movement velocity)
            const vx = mouse.x - ring.x;
            const vy = mouse.y - ring.y;
            const velocity = Math.sqrt(vx * vx + vy * vy);
            
            // Transform scaling parameters: limit scale to maintain design boundaries
            const stretch = Math.min(velocity * 0.0035, 0.45);
            const scaleX = 1 + stretch;
            const scaleY = 1 - stretch * 0.5;
            const rotation = Math.atan2(vy, vx) * (180 / Math.PI);

            // Apply style updates
            setDotX(dot.x);
            setDotY(dot.y);
            
            setRingX(ring.x);
            setRingY(ring.y);
            setRingScaleX(scaleX);
            setRingScaleY(scaleY);
            setRingRotation(rotation);

            // 4. Update and draw canvas particles
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.update();
                    p.draw(ctx);
                    if (p.life <= 0) {
                        particles.splice(i, 1);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(tick);
        };
        tick();

        // Cleanup resources
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
            cancelAnimationFrame(animationFrameId);
            document.body.classList.remove('hide-default-cursor');
        };
    }, []);

    // Detect mobile touch devices in rendering phase (renders empty container to skip DOM nodes)
    const isTouchDevice = typeof window !== 'undefined' && 
                          (window.matchMedia('(pointer: coarse)').matches || 
                           'ontouchstart' in window);
    
    if (isTouchDevice) return null;

    return (
        <div className="custom-cursor-container">
            {/* Canvas for technical skill particle bursts */}
            <canvas ref={canvasRef} className="cursor-canvas" />

            {/* Glowing inner dot */}
            <div ref={dotRef} className="cursor-dot-glow" />

            {/* Trailing outer ring */}
            <div ref={ringRef} className="cursor-ring-trail">
                <span ref={textRef} className="cursor-ring-text" />
            </div>
        </div>
    );
};

export default CustomCursor;
