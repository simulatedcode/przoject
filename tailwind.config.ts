import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#F0F5F2",
                    100: "#D5E2DA",
                    200: "#BACFC2",
                    300: "#9FBCAA",
                    400: "#84A992",
                    500: "#69967A",
                    600: "#567B64",
                    700: "#43604E",
                    800: "#304538",
                    900: "#1D2A22",
                    950: "#0A0F0C",
                },
            },
        },
    },
    plugins: [],
};

export default config;