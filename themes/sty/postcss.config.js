module.exports = {
    plugins: [
        require('postcss-import')({
            path: [
                __dirname + '/assets/css/',
                __dirname + '/node_modules/'
            ]
        }),
        require('tailwindcss')(__dirname + '/tailwind.config.js'),
        require('autoprefixer'),
    ]
}
