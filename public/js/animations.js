gsap.registerPlugin(ScrollTrigger);

console.log('🚀 GSAP animations.js loaded');
console.log('🚀 Window width:', window.innerWidth, 'height:', window.innerHeight);

const leftSections = gsap.utils.toArray(".left-side-col > div");
const rightSections = gsap.utils.toArray(".right-side-col > div");
const rightContainer = document.querySelector(".right-side-col");
const sectionCount = leftSections.length;

console.log('🚀 Found sections:', {
    leftSections: leftSections.length,
    rightSections: rightSections.length,
    sectionCount: sectionCount,
    rightContainer: !!rightContainer
});

const mm = gsap.matchMedia();

// Development mode detection
const isDevelopment = () => {
    return window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1' ||
           window.location.search.includes('debug=true');
};

function setupScrollAnimations() {
    // DESKTOP + TABLET (vertical behaviour)
    mm.add("(min-width: 768px)", () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        const getSectionSize = () => window.innerHeight;
        const getScrollLength = () => getSectionSize() * sectionCount;

        gsap.set(rightContainer, {
            x: 0,
            y: () => -getSectionSize() * (sectionCount - 1)
        });

        // left column moves vertically
        gsap.to(leftSections, {
            yPercent: -100 * (sectionCount - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: () => "+=" + getScrollLength(),
                scrub: 1, // Smoother scrubbing with slight delay
                pin: ".sticky-container",
                invalidateOnRefresh: true,
                markers: false, // Disable debug markers
                onUpdate: self => {
                    // Throttle updates using requestAnimationFrame
                    if (!self._rafId) {
                        self._rafId = requestAnimationFrame(() => {
                            self._rafId = null;
                        });
                    }
                }
            }
        });

        // right column moves back to 0 on scroll
        gsap.to(rightContainer, {
            y: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: () => "+=" + getScrollLength(),
                scrub: 1, // Smoother scrubbing
                invalidateOnRefresh: true,
                markers: false // Disable debug markers
            }
        });
    });

    // MOBILE (horizontal behaviour)
    mm.add("(max-width: 767.98px)", () => {
        console.log('📱 Mobile GSAP breakpoint triggered!');
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        const getSectionSize = () => window.innerWidth;
        const getScrollLength = () => getSectionSize() * sectionCount;

        console.log('📱 Mobile section size:', getSectionSize(), 'Scroll length:', getScrollLength());

        // right column starts shifted to the left
        gsap.set(rightContainer, {
            y: 0,
            x: () => -getSectionSize() * (sectionCount - 1)
        });

        console.log('📱 Right container shifted to:', -getSectionSize() * (sectionCount - 1));

        // left column slides horizontally
        gsap.to(leftSections, {
            xPercent: -100 * (sectionCount - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: () => "+=" + getScrollLength(),
                scrub: 1, // Smoother scrubbing
                pin: ".sticky-container",
                invalidateOnRefresh: true,
                markers: false // Disable debug markers
            }
        });

        // right column slides back to x: 0
        gsap.to(rightContainer, {
            x: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll-container",
                start: "top top",
                end: () => "+=" + getScrollLength(),
                scrub: 1, // Smoother scrubbing
                invalidateOnRefresh: true,
                markers: false // Disable debug markers
            }
        });

        console.log('📱 Mobile GSAP animations set up complete');
    });
}

setupScrollAnimations();

// BOTTLE ENTER / LEAVE ANIMATIONS - OPTIMIZED
const bottleSections = document.querySelectorAll(
    ".section-1-l, .section-2-l, .section-3-l, .section-1-r, .section-2-r, .section-3-r"
);

// Use IntersectionObserver instead of constant animations
const bottleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        const bottle = section.querySelector(".bottle");
        const bottleBack = section.querySelector(".bottle-back");

        if (!bottle || !bottleBack) return;

        if (entry.isIntersecting) {
            // Simplified entrance animation
            gsap.to(bottle, {
                x: 0,
                y: 0,
                autoAlpha: 0.75,
                duration: 0.6,
                ease: "power2.out",
                force3D: true // GPU acceleration
            });
        }
    });
}, {
    threshold: 0.5,
    rootMargin: "0px"
});

bottleSections.forEach(section => {
    const bottle = section.querySelector(".bottle");
    const bottleBack = section.querySelector(".bottle-back");

    if (!bottle || !bottleBack) return;

    // Initial state
    gsap.set(bottle, { y: 0, x: 50, autoAlpha: 0, force3D: true });
    gsap.set(bottleBack, { y: 80, autoAlpha: 0, force3D: true });

    // Add to observer
    bottleObserver.observe(section);

    // Simplified hover animations with debouncing
    let hoverTimer;
    section.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
            gsap.killTweensOf([bottle, bottleBack]);

            // Faster, simpler animation
            gsap.to(bottle, {
                y: 80,
                x: 15,
                rotationZ: 6,
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.out",
                force3D: true
            });

            gsap.to(bottleBack, {
                y: 0,
                rotationZ: 0,
                autoAlpha: 0.75,
                duration: 0.4,
                ease: "power2.out",
                force3D: true
            });
        }, 50); // Small delay to prevent rapid triggering
    });

    section.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimer);
        gsap.killTweensOf([bottle, bottleBack]);

        // Faster exit animation
        gsap.to(bottleBack, {
            y: 80,
            rotationZ: -6,
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
            force3D: true
        });

        gsap.to(bottle, {
            y: 0,
            x: 0,
            rotationZ: 0,
            autoAlpha: 0.75,
            duration: 0.3,
            ease: "power2.in",
            force3D: true
        });
    });
});

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        setupScrollAnimations();
    }, 150);
});

// Development utilities
// Auto-enable markers in development with debug parameter
if (isDevelopment() && window.location.search.includes('debug=true')) {
    console.log('🎯 Debug mode enabled - GSAP markers will be visible');
}

// Hero Section - Smooth Scroll to Collection
document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.querySelector('.button');
    const scrollArrow = document.querySelector('.scroll-arrow');

    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#products');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const target = document.querySelector('#products');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// About Header Animations
function setupAboutHeaderAnimations() {
    const aboutHeader = document.querySelector('.about-header');
    const aboutTitle = document.querySelector('.about-title');
    const aboutSubtitle = document.querySelector('.about-subtitle');

    if (!aboutHeader || !aboutTitle || !aboutSubtitle) return;

    // Set initial state
    gsap.set([aboutTitle, aboutSubtitle], {
        opacity: 0,
        y: 30
    });

    // Create ScrollTrigger for about-header
    ScrollTrigger.create({
        trigger: aboutHeader,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
            // Animate in when scrolling down into view
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            
            tl.to(aboutTitle, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                force3D: true
            })
            .to(aboutSubtitle, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                force3D: true
            }, '-=0.3');
        },
        onLeave: () => {
            // Reset when scrolling past
            gsap.set([aboutTitle, aboutSubtitle], {
                opacity: 0,
                y: 30
            });
        },
        onEnterBack: () => {
            // Animate back in when scrolling back up into view
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            
            tl.to(aboutTitle, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                force3D: true
            })
            .to(aboutSubtitle, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                force3D: true
            }, '-=0.3');
        },
        onLeaveBack: () => {
            // Reset when scrolling back up past it
            gsap.set([aboutTitle, aboutSubtitle], {
                opacity: 0,
                y: 30
            });
        }
    });
}

// About Section Animations - Minimalist & Elegant
function setupAboutSectionAnimations() {
    // Animation for bigger boxes (more prominent)
    const biggerBoxAnimation = (element) => {
        if (!element) return;
        
        gsap.set(element, {
            opacity: 0,
            y: 40,
            scale: 0.95
        });

        ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            },
            onLeave: () => {
                gsap.set(element, {
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                });
            },
            onEnterBack: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                gsap.set(element, {
                    opacity: 0,
                    y: 40,
                    scale: 0.95
                });
            }
        });
    };

    // Animation for smaller boxes (more subtle)
    const smallerBoxAnimation = (element) => {
        if (!element) return;
        
        gsap.set(element, {
            opacity: 0,
            x: -30
        });

        ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: 0.15
                });
            },
            onLeave: () => {
                gsap.set(element, {
                    opacity: 0,
                    x: -30
                });
            },
            onEnterBack: () => {
                gsap.to(element, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: 0.15
                });
            },
            onLeaveBack: () => {
                gsap.set(element, {
                    opacity: 0,
                    x: -30
                });
            }
        });
    };

    // Apply animations to all about sections
    const aboutSections = [
        { selector: '.about-1', leftBigger: true },
        { selector: '.about-2', leftBigger: false },
        { selector: '.about-3', leftBigger: true },
        { selector: '.about-4', leftBigger: false },
        { selector: '.about-5', leftBigger: true }
    ];

    aboutSections.forEach(({ selector, leftBigger }) => {
        const section = document.querySelector(selector);
        if (!section) return;

        const leftBox = section.querySelector('.about-left');
        const rightBox = section.querySelector('.about-right');

        if (leftBigger) {
            // Left is bigger, right is smaller
            biggerBoxAnimation(leftBox);
            smallerBoxAnimation(rightBox);
        } else {
            // Right is bigger, left is smaller
            smallerBoxAnimation(leftBox);
            biggerBoxAnimation(rightBox);
        }
    });
}

// Initialize about animations after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupAboutHeaderAnimations();
        setupAboutSectionAnimations();
    });
} else {
    setupAboutHeaderAnimations();
    setupAboutSectionAnimations();
}