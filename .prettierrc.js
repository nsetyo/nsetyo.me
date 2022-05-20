const GoTemplatePlugin = require('prettier-plugin-go-template')
const OrganizeAttributePlugin = require('prettier-plugin-organize-attributes')

module.exports = {
    attributeSort: "ASC",
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
    plugins: [GoTemplatePlugin, OrganizeAttributePlugin],
    overrides: [
        {
            files: ['*.html'],
            options: {
                parser: 'go-template',
            },
        },
    ],
}
