const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['content/**/*.md', 'themes/**/*.{html,svg}'],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        a: {
                            '&:hover': {
                                'color': theme('colors.indigo.500'),
                            },
                        },
                    // ...
                  },
                },
              }),
        },
        fontFamily: (theme) => ({
            mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
            sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        }),
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
