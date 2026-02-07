/**
 * Navigation System - Minimalist & Elegant
 * Handles hamburger menu toggle and navigation overlay
 */

(function() {
    'use strict';

    // Cache DOM elements
    let hamburger, navOverlay, navClose, navLinks, hamburgerInput;

    // Initialize DOM elements once
    function initElements() {
        if (!hamburger) {
            hamburger = document.querySelector('.hamburger input');
            navOverlay = document.getElementById('nav-overlay');
            navClose = document.querySelector('.nav-close');
            navLinks = document.querySelectorAll('.nav-link');
            hamburgerInput = hamburger;
        }
    }

    // Open navigation overlay
    function openNav() {
        if (navOverlay) {
            navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close navigation overlay
    function closeNav() {
        if (navOverlay) {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
            // Reset hamburger checkbox
            if (hamburgerInput) {
                hamburgerInput.checked = false;
            }
        }
    }

    // Toggle navigation
    function toggleNav() {
        if (navOverlay && navOverlay.classList.contains('active')) {
            closeNav();
        } else {
            openNav();
        }
    }

    // Handle navigation link clicks
    function handleNavClick(e) {
        e.preventDefault();
        const target = e.currentTarget.getAttribute('href');

        // Close navigation
        closeNav();

        // Smooth scroll to section if it exists
        setTimeout(() => {
            const targetElement = document.querySelector(target);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 400); // Wait for nav close animation
    }

    // Initialize event listeners
    function initEventListeners() {
        initElements();

        // Hamburger menu toggle
        if (hamburgerInput) {
            hamburgerInput.addEventListener('change', function() {
                if (this.checked) {
                    openNav();
                } else {
                    closeNav();
                }
            });
        }

        // Close button
        if (navClose) {
            navClose.addEventListener('click', closeNav, { passive: true });
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick, { passive: false });
        });

        // Close on overlay click (outside content)
        if (navOverlay) {
            navOverlay.addEventListener('click', function(e) {
                if (e.target === navOverlay) {
                    closeNav();
                }
            }, { passive: true });
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('active')) {
                closeNav();
            }
        }, { passive: true });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEventListeners, { passive: true, once: true });
    } else {
        initEventListeners();
    }

    // Cleanup function for page transitions
    window.addEventListener('beforeunload', function() {
        if (navOverlay && navOverlay.classList.contains('active')) {
            closeNav();
        }
    }, { passive: true });

})();
