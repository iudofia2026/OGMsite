module.exports = {
    env: {
        node: true,
        es2021: true,
        browser: true
    },
    extends: [
        'eslint:recommended'
    ],
    globals: {
        'gsap': 'readonly',
        'ScrollTrigger': 'readonly'
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        // Production-ready rules based on professional standards
        'no-console': 'warn', // Warn about console logs in production
        'no-unused-vars': 'error', // Error on unused variables
        'no-undef': 'error', // Error on undefined variables
        'prefer-const': 'error', // Prefer const over let when variable is not reassigned
        'no-var': 'error', // No var declarations
        'eqeqeq': 'error', // Require strict equality
        'curly': 'error', // Require curly braces
        'no-trailing-spaces': 'error', // No trailing spaces
        'indent': ['error', 4], // 4-space indentation
        'quotes': ['error', 'single'], // Single quotes
        'semi': ['error', 'always'], // Require semicolons
        'comma-dangle': ['error', 'never'], // No trailing commas
        'brace-style': ['error', '1tbs'], // One true brace style
        'keyword-spacing': 'error', // Space around keywords
        'space-before-blocks': 'error', // Space before blocks
        'object-curly-spacing': ['error', 'always'], // Spaces in objects
        'array-bracket-spacing': ['error', 'never'], // No spaces in arrays
        'no-multiple-empty-lines': ['error', { 'max': 2 }], // Max 2 empty lines
        'max-len': ['error', { 'code': 100, 'ignoreUrls': true }] // Max line length
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        'build/',
        'public/js/vendor/',
        '*.min.js'
    ]
};