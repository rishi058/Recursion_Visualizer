import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "outline": "#8c909f",
        "inverse-on-surface": "#2b303e",
        "secondary-fixed": "#d4e4fa",
        "primary-fixed": "#d8e2ff",
        "on-primary": "#002e6a",
        "secondary": "#b9c8de",
        "on-surface-variant": "#c2c6d6",
        "on-error-container": "#ffdad6",
        "surface-dim": "#0e1320",
        "on-secondary": "#233143",
        "on-surface": "#dee2f4",
        "surface-container-highest": "#303442",
        "surface-container-high": "#252a37",
        "on-primary-fixed-variant": "#004395",
        "outline-variant": "#424754",
        "background": "#0e1320",
        "on-secondary-fixed-variant": "#39485a",
        "tertiary-container": "#00a572",
        "error-container": "#93000a",
        "tertiary": "#4edea3",
        "surface-container-lowest": "#090e1a",
        "surface-container": "#1a1f2c",
        "secondary-container": "#39485a",
        "tertiary-fixed-dim": "#4edea3",
        "on-primary-container": "#00285d",
        "surface-bright": "#343947",
        "primary-fixed-dim": "#adc6ff",
        "primary": "#adc6ff",
        "inverse-surface": "#dee2f4",
        "on-primary-fixed": "#001a42",
        "on-secondary-container": "#a7b6cc",
        "on-tertiary-container": "#00311f",
        "on-tertiary-fixed": "#002113",
        "inverse-primary": "#005ac2",
        "on-tertiary": "#003824",
        "tertiary-fixed": "#6ffbbe",
        "secondary-fixed-dim": "#b9c8de",
        "surface": "#0e1320",
        "on-error": "#690005",
        "primary-container": "#4d8eff",
        "surface-variant": "#303442",
        "error": "#ffb4ab",
        "on-tertiary-fixed-variant": "#005236",
        "on-background": "#dee2f4",
        "surface-tint": "#adc6ff",
        "on-secondary-fixed": "#0d1c2d",
        "surface-container-low": "#161b28"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "9999px"
      },
      spacing: {
        "margin-desktop": "24px",
        "container-max": "1440px",
        "gutter": "16px",
        "unit": "4px",
        "margin-mobile": "16px"
      },
      fontFamily: {
        "headline-md": ["Geist"],
        "headline-lg": ["Geist"],
        "label-sm": ["JetBrains Mono"],
        "code-md": ["JetBrains Mono"],
        "body-md": ["Geist"],
        "body-lg": ["Geist"],
        "sans": ["Geist", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "headline-lg": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "code-md": ["14px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-md": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "body-lg": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
      }
    },
  },
  plugins: [],
};
export default config;
