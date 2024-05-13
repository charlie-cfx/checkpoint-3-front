const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans],
                accent: ["Bricolage Grotesque", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
