/**
 * Authentication Controller
 * Handles Google OAuth and email signup
 */

const authController = {
    // Handle Google OAuth callback
    googleCallback: async (req, res) => {
        try {
            const { code } = req.query;

            if (!code) {
                return res.status(400).json({
                    success: false,
                    message: 'Authorization code is required'
                });
            }

            // Exchange authorization code for tokens
            const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: `${process.env.APP_URL || 'http://localhost:3000'}/auth/google/callback`,
                    grant_type: 'authorization_code'
                })
            });

            if (!tokenResponse.ok) {
                throw new Error('Failed to exchange authorization code for tokens');
            }

            const tokens = await tokenResponse.json();

            // Get user information from Google
            const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokens.access_token}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Failed to fetch user information');
            }

            const googleUser = await userResponse.json();

            // Here you would typically:
            // 1. Check if user exists in your database
            // 2. Create or update user record
            // 3. Create a session or JWT
            // 4. Return user data and authentication token

            // For now, return the user data
            res.json({
                success: true,
                user: {
                    id: googleUser.id,
                    email: googleUser.email,
                    name: googleUser.name,
                    givenName: googleUser.given_name,
                    familyName: googleUser.family_name,
                    picture: googleUser.picture,
                    verified: googleUser.verified_email
                },
                tokens: {
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    expires_in: tokens.expires_in
                }
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Google OAuth error:', error);
            res.status(500).json({
                success: false,
                message: 'Authentication failed',
                error: error.message
            });
        }
    },

    // Handle email signup
    emailSignup: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is required'
                });
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                });
            }

            // Here you would typically:
            // 1. Check if email already exists
            // 2. Save to database
            // 3. Send confirmation email
            // 4. Create a pending subscription record

            // eslint-disable-next-line no-console
            console.log('Email signup:', email);

            // For now, return success
            res.json({
                success: true,
                message: 'Successfully signed up for updates',
                email: email
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Email signup error:', error);
            res.status(500).json({
                success: false,
                message: 'Signup failed',
                error: error.message
            });
        }
    },

    // OAuth configuration endpoint
    getOAuthConfig: (req, res) => {
        res.json({
            google: {
                enabled: !!process.env.GOOGLE_CLIENT_ID,
                clientId: process.env.GOOGLE_CLIENT_ID
                    ? '****' + process.env.GOOGLE_CLIENT_ID.slice(-4)
                    : null
            }
        });
    }
};

module.exports = authController;
