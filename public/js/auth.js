// Form handling and Google OAuth functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const googleButton = document.getElementById('google-login');

    // Handle form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = signupForm.querySelector('input[name="email"]').value;

            // Basic validation
            if (!email) {
                alert('Please enter your email');
                return;
            }

            // Here you would typically send this to your backend
            console.log('Email signup:', email);

            // Show success message
            alert('Thanks for signing up! You\'ll receive updates at: ' + email);
            signupForm.reset();
        });
    }

    // Google OAuth button click
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // Initiate Google OAuth flow
            initiateGoogleOAuth();
        });
    }
});

// Google OAuth implementation
function initiateGoogleOAuth() {
    // For development/testing - show the OAuth flow
    console.log('Initiating Google OAuth...');

    // Google OAuth URL for your application
    const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // You'll need to add this
    const redirectUri = window.location.origin + '/auth/google/callback';
    const scope = 'email profile';

    const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;

    // For now, show instructions
    showOAuthInstructions();
}

function showOAuthInstructions() {
    const instructions = `
Google OAuth Setup Required:

1. Create a Google Cloud Project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add your domain to authorized origins
5. Set up environment variables in Vercel

For immediate testing, the email signup form is fully functional.

Would you like to set up Google OAuth now?
    `;

    if (confirm(instructions + '\n\nClick OK to see detailed setup steps or Cancel to use email signup only.')) {
        window.open('https://console.cloud.google.com/apis/credentials', '_blank');
    }
}

// Backend OAuth callback handler (for future implementation)
// This would be called when Google redirects back to your app
function handleGoogleCallback(code) {
    // Send the code to your backend to exchange for tokens
    fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Google OAuth successful:', data);
        // Handle successful authentication
    })
    .catch(error => {
        console.error('Google OAuth error:', error);
    });
}

