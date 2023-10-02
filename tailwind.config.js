/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#5CBCF2",
            },
            fontFamily: {
                heading: "var(--font-suez-one)",
                body: "var(--font-source-code-pro)",
                suezOne: "var(--font-suez-one)",
                sourceCodePro: "var(--font-source-code-pro)",
            },
        },
    },
};
