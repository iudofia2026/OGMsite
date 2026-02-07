/**
 * Age Verification Modal - Performance Optimized
 * Checks if user is 21 or older and stores the answer in localStorage
 */

(function() {
    'use strict';

    const AGE_VERIFICATION_KEY = 'ogm_age_verified';
    const AGE_VERIFICATION_ANSWER_KEY = 'ogm_age_answer';

    // Cache DOM elements
    let modal, mainContent, yesBtn, noBtn;

    // Initialize DOM elements once
    function initElements() {
        if (!modal) {
            modal = document.getElementById('age-verification-modal');
            mainContent = document.getElementById('main-content');
            yesBtn = document.getElementById('age-yes-btn');
            noBtn = document.getElementById('age-no-btn');
        }
    }

    // Check if user has already verified their age
    function checkAgeVerification() {
        initElements();

        try {
            const verified = localStorage.getItem(AGE_VERIFICATION_KEY);
            const answer = localStorage.getItem(AGE_VERIFICATION_ANSWER_KEY);

            if (verified === 'true' && answer === 'yes') {
                // User has verified and is of age - skip modal completely
                if (modal) modal.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('main-content-hidden');
                    mainContent.classList.add('main-content-visible');
                }
                return true;
            } else if (verified === 'true' && answer === 'no') {
                // User has verified but is underage
                showUnderageMessage();
                return false;
            } else {
                // First visit - show modal
                showModal();
                return false;
            }
        } catch (e) {
            // localStorage might be disabled
            showModal();
            return false;
        }
    }

    function showModal() {
        if (modal) {
            modal.classList.remove('hidden');
            if (mainContent) {
                mainContent.classList.add('main-content-hidden');
            }
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    function hideModal() {
        if (modal) {
            modal.classList.add('hidden');
            // Re-enable body scroll
            document.body.style.overflow = '';
        }
    }

    function showContent() {
        if (mainContent) {
            mainContent.classList.remove('main-content-hidden');
            mainContent.classList.add('main-content-visible');
        }
    }

    function showUnderageMessage() {
        if (modal) {
            const content = modal.querySelector('.age-verification-content');
            if (content) {
                content.innerHTML = `
                    <h2 class="age-verification-title">Sorry, you must be 21 or older to access this website.</h2>
                    <p class="age-verification-question" style="margin-top: 2rem;">Thank you for your honesty.</p>
                `;
                modal.classList.remove('hidden');
            }
            if (mainContent) {
                mainContent.classList.add('main-content-hidden');
            }
            document.body.style.overflow = 'hidden';
        }
    }

    function handleYes() {
        try {
            localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
            localStorage.setItem(AGE_VERIFICATION_ANSWER_KEY, 'yes');
        } catch (e) {}
        hideModal();
        showContent();
    }

    function handleNo() {
        try {
            localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
            localStorage.setItem(AGE_VERIFICATION_ANSWER_KEY, 'no');
        } catch (e) {}
        showUnderageMessage();
    }

    // Event listeners with passive option for better scroll performance
    function initEventListeners() {
        initElements();
        if (yesBtn) {
            yesBtn.addEventListener('click', handleYes, { passive: true, once: true });
        }
        if (noBtn) {
            noBtn.addEventListener('click', handleNo, { passive: true, once: true });
        }
    }

    // Initialize immediately for faster perceived performance
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            checkAgeVerification();
            initEventListeners();
        }, { passive: true, once: true });
    } else {
        checkAgeVerification();
        initEventListeners();
    }

})();
