const plugin = require("tailwindcss/plugin")

module.exports = {
    purge: ["src/**/*.ts", "src/**/*.js", "src/**/*.jsx", "src/**/*.tsx", "public/**/*.html"],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        plugin(function ({ addVariant, e }) {
            addVariant("disabled", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`disabled${separator}${className}`)}:disabled`
                })
            })
        }),
    ],
}
