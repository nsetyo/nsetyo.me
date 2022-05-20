const path = [
    __dirname + '/themes/sty/assets/css/',
    __dirname + '/themes/sty/node_modules/'
]

module.exports = {
    plugins: {
        'autoprefixer': {},
        'postcss-import': {
            path
        },
        'tailwindcss': {},
    }
}
