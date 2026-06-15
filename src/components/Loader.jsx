import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animating progress counter from 0 to 100
            const progressVal = { val: 0 };
            gsap.to(progressVal, {
                val: 100,
                duration: 2,
                ease: 'power4.out',
                onUpdate: () => {
                    setProgress(Math.floor(progressVal.val));
                },
                onComplete: () => {
                    // Start intro exit animation
                    const tl = gsap.timeline({
                        onComplete: onComplete
                    });

                    tl.to('.loader-percentage, .loader-brand', {
                        opacity: 0,
                        y: -50,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.in'
                    })
                    .to('.loader-container', {
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                        duration: 0.8,
                        ease: 'power4.inOut'
                    });
                }
            });

            // Tagline reveal animation
            gsap.fromTo('.loader-brand h1', 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
            );

            gsap.fromTo('.loader-sub',
                { opacity: 0 },
                { opacity: 0.6, duration: 1, delay: 0.6 }
            );
        });

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div className="loader-container">
            <div className="loader-content">
                <div className="loader-brand">
                    <h1 className="gradient-text">Ozair Mehmood</h1>
                    <p className="loader-sub">Android & Backend Developer</p>
                </div>
                <div className="loader-progress-wrapper">
                    <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <div className="loader-percentage">{progress}%</div>
            </div>
        </div>
    );
};

export default Loader;
