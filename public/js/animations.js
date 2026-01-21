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
                scrub: true,
                pin: ".sticky-container",
                invalidateOnRefresh: true,
                markers: isDevelopment() // Only show markers in development
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
                scrub: true,
                invalidateOnRefresh: true,
                markers: isDevelopment() // Only show markers in development
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
                scrub: true,
                pin: ".sticky-container",
                invalidateOnRefresh: true,
                markers: isDevelopment() // Only show markers in development
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
                scrub: true,
                invalidateOnRefresh: true,
                markers: isDevelopment() // Only show markers in development
            }
        });

        console.log('📱 Mobile GSAP animations set up complete');
    });
}

setupScrollAnimations();

// BOTTLE ENTER / LEAVE ANIMATIONS
document
    .querySelectorAll(
        ".section-1-l, .section-2-l, .section-3-l, .section-1-r, .section-2-r, .section-3-r"
    )
    .forEach((section) => {
        const bottle = section.querySelector(".bottle");
        const bottleBack = section.querySelector(".bottle-back");

        if (!bottle || !bottleBack) return;

        gsap.set(bottle, { y: 0, x: 100, autoAlpha: 0 });
        gsap.set(bottleBack, { y: 0, x: 100, autoAlpha: 0 });

        gsap.to(bottle, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.to(bottleBack, {
            x: 0,
            y: 100
        });

        section.addEventListener("mouseenter", () => {
            gsap.killTweensOf([bottle, bottleBack]);

            const tl = gsap.timeline();

            tl.to(bottle, {
                y: 120,
                x: 20,
                rotationZ: 8,
                autoAlpha: 0,
                duration: 0.8,
                ease: "power3.inOut"
            });

            tl.fromTo(
                bottleBack,
                {
                    y: 80,
                    scale: 0.95,
                    rotationZ: -6,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    scale: 1,
                    rotationZ: 0,
                    autoAlpha: 1,
                    duration: 0.9,
                    ease: "elastic.out(1, 0.6)"
                },
                "<+0.2"
            );
        });

        section.addEventListener("mouseleave", () => {
            gsap.killTweensOf([bottle, bottleBack]);

            const tl = gsap.timeline();

            tl.to(bottleBack, {
                y: 80,
                scale: 0.95,
                rotationZ: -8,
                autoAlpha: 0,
                duration: 0.6,
                ease: "power2.inOut"
            });

            tl.to(
                bottle,
                {
                    y: 0,
                    x: 0,
                    rotationZ: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power3.out"
                },
                "<+0.1"
            );
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
    const heroBtn = document.querySelector('.hero-btn');
    const scrollArrow = document.querySelector('.scroll-arrow');

    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#collection');
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
            const target = document.querySelector('#collection');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});