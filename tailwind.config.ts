import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                surface: "var(--color-surface)",
                "surface-brighter": "var(--color-surface-brighter)",
                border: "var(--color-brand-border)",
                muted: "var(--color-brand-muted)",
                project: {
                    50: "var(--color-50)",
                    100: "var(--color-100)",
                    200: "var(--color-200)",
                    300: "var(--color-300)",
                    400: "var(--color-400)",
                    500: "var(--color-500)",
                    600: "var(--color-600)",
                    700: "var(--color-700)",
                    800: "var(--color-800)",
                    900: "var(--color-900)",
                    950: "var(--color-950)",
                },
            },
            spacing: {
                "carbon-01": "var(--spacing-01)",
                "carbon-02": "var(--spacing-02)",
                "carbon-03": "var(--spacing-03)",
                "carbon-04": "var(--spacing-04)",
                "carbon-05": "var(--spacing-05)",
                "carbon-06": "var(--spacing-06)",
                "carbon-07": "var(--spacing-07)",
                "carbon-08": "var(--spacing-08)",
                "carbon-09": "var(--spacing-09)",
                "carbon-10": "var(--spacing-10)",
                "carbon-11": "var(--spacing-11)",
                "carbon-12": "var(--spacing-12)",
                "carbon-13": "var(--spacing-13)",
            },
        },
        fontFamily: {
            sans: ["var(--font-ibm-plex-sans)", "ui-sans-serif", "system-ui"],
            mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "SFMono-Regular"],
        },
    },
    plugins: [],
} satisfies Config;
