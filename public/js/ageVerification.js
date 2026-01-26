/**
 * Age Verification Modal
 * Checks if user is 21 or older and stores the answer in localStorage
 */

(function() {
    'use strict';

    const AGE_VERIFICATION_KEY = 'ogm_age_verified';
    const AGE_VERIFICATION_ANSWER_KEY = 'ogm_age_answer';
    
    const modal = document.getElementById('age-verification-modal');
    const mainContent = document.getElementById('main-content');
    const yesBtn = document.getElementById('age-yes-btn');
    const noBtn = document.getElementById('age-no-btn');

    // Check if user has already verified their age
    function checkAgeVerification() {
        const verified = localStorage.getItem(AGE_VERIFICATION_KEY);
        const answer = localStorage.getItem(AGE_VERIFICATION_ANSWER_KEY);

        if (verified === 'true' && answer === 'yes') {
            // User has verified and is of age
            hideModal();
            showContent();
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
        localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
        localStorage.setItem(AGE_VERIFICATION_ANSWER_KEY, 'yes');
        hideModal();
        showContent();
    }

    function handleNo() {
        localStorage.setItem(AGE_VERIFICATION_KEY, 'true');
        localStorage.setItem(AGE_VERIFICATION_ANSWER_KEY, 'no');
        showUnderageMessage();
    }

    // Event listeners
    if (yesBtn) {
        yesBtn.addEventListener('click', handleYes);
    }

    if (noBtn) {
        noBtn.addEventListener('click', handleNo);
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAgeVerification);
    } else {
        checkAgeVerification();
    }

})();
