gsap.registerPlugin(ScrollTrigger);

const leftSections = gsap.utils.toArray(".left-side-col > div");
const rightSections = gsap.utils.toArray(".right-side-col > div");
const rightContainer = document.querySelector(".right-side-col");
const sectionCount = leftSections.length;

const mm = gsap.matchMedia();

// Development mode detection
const isDevelopment = () => {
    return window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1' ||
           window.location.search.includes('debug=true');
};

// Helper function to create ScrollTrigger config
const createScrollTriggerConfig = (config, showMarkers = false) => {
    return {
        trigger: config.trigger || ".scroll-container",
        start: config.start || "top top",
        end: config.end,
        scrub: config.scrub !== undefined ? config.scrub : true,
        pin: config.pin,
        invalidateOnRefresh: config.invalidateOnRefresh !== undefined ? config.invalidateOnRefresh : true,
        markers: showMarkers && isDevelopment(), // Only show markers in development
        ...config
    };
};

function setupScrollAnimations() {
    // DESKTOP + TABLET (vertical behaviour)
    mm.add("(min-width: 768px)", () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        // gsap.killTweensOf([leftSections, rightContainer]);
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
            scrollTrigger: createScrollTriggerConfig({
                end: () => "+=" + getScrollLength(),
                pin: ".sticky-container"
            })
        });

        // right column moves back to 0 on scroll
        gsap.to(rightContainer, {
            y: 0,
            ease: "none",
            scrollTrigger: createScrollTriggerConfig({
                end: () => "+=" + getScrollLength()
            })
        });
    });

    // MOBILE (horizontal behaviour)
    mm.add("(max-width: 767.98px)", () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        // gsap.killTweensOf([leftSections, rightContainer]);
        const getSectionSize = () => window.innerWidth;
        const getScrollLength = () => getSectionSize() * sectionCount;

        // right column starts shifted to the left
        gsap.set(rightContainer, {
            y: 0,
            x: () => -getSectionSize() * (sectionCount - 1)
        });

        // left column slides horizontally
        gsap.to(leftSections, {
            xPercent: -100 * (sectionCount - 1),
            ease: "none",
            scrollTrigger: createScrollTriggerConfig({
                end: () => "+=" + getScrollLength(),
                pin: ".sticky-container"
            })
        });

        // right column slides back to x: 0
        gsap.to(rightContainer, {
            x: 0,
            ease: "none",
            scrollTrigger: createScrollTriggerConfig({
                end: () => "+=" + getScrollLength()
            })
        });
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

        // Force reset any existing transforms
        gsap.set([bottle, bottleBack], { clearProps: "all" });

        // Set initial positions
        gsap.set(bottle, { y: 0, x: 100, autoAlpha: 0 });
        gsap.set(bottleBack, { y: 80, x: 0, scale: 0.95, rotation: -8, autoAlpha: 0 });

        gsap.to(bottle, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out"
        });

        // Back bottle is positioned below and ready for hover animation

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
// To enable debug markers, add ?debug=true to the URL or run these commands in the console:
//
// Enable markers for all animations:
// window.enableGSAPMarkers = () => {
//     ScrollTrigger.getAll().forEach(trigger => {
//         trigger.vars.markers = true;
//         trigger.refresh();
//     });
// };
//
// Disable markers for all animations:
// window.disableGSAPMarkers = () => {
//     ScrollTrigger.getAll().forEach(trigger => {
//         trigger.vars.markers = false;
//         trigger.refresh();
//     });
// };

// Auto-enable markers in development with debug parameter
if (isDevelopment() && window.location.search.includes('debug=true')) {
    console.log('🎯 Debug mode enabled - GSAP markers will be visible');
}