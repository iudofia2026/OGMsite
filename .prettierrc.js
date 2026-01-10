module.exports = {
    // Professional formatting standards based on optimization config
    semi: true, // Require semicolons
    singleQuote: true, // Use single quotes
    tabWidth: 4, // 4-space indentation
    useTabs: false, // Use spaces, not tabs
    trailingComma: 'none', // No trailing commas
    bracketSpacing: true, // Spaces in objects { foo: bar }
    bracketSameLine: false, // Put > on new line
    arrowParens: 'avoid', // Avoid parens when possible x => x
    printWidth: 100, // Max line length
    endOfLine: 'lf', // Unix line endings
    quoteProps: 'as-needed', // Only quote props when needed
    jsxSingleQuote: true, // Single quotes in JSX
    embeddedLanguageFormatting: 'auto', // Format embedded code

    // File-specific overrides
    overrides: [
        {
            files: ['*.json'],
            options: {
                tabWidth: 2
            }
        },
        {
            files: ['*.md'],
            options: {
                proseWrap: 'preserve'
            }
        },
        {
            files: ['*.css', '*.scss'],
            options: {
                tabWidth: 2,
                singleQuote: false
            }
        }
    ]
};