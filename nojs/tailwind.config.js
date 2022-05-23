const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['content/**/*.md', 'themes/**/*.{html,svg}'],
    theme: {
        container: {
            padding: '1rem',
        },
        extend: {},
        fontFamily: (theme) => ({
            mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
            sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        }),
    },
    plugins: [require('@tailwindcss/typography')],
}
