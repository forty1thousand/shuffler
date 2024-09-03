import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: "ui-monospace, SF Mono, SFMono-Regular, Roboto Mono, Menlo, monospace",
        sans: "-apple-system, ui-sans-serif, system-ui, BlinkMacSystemFont, helvetica, sans-serif",
        display: "var(--display)",
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        ring: "var(--tw-ring-color)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        destructive: "rgb(250 60 41 / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
