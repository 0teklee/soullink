import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  safelist: [
    "text-primary",
    "text-upbeat",
    "text-chill",
    "text-relaxed",
    "text-melancholic",
    "hover:text-primary",
    "hover:text-upbeat",
    "hover:text-chill",
    "hover:text-relaxed",
    "hover:text-melancholic",
    "bg-primary",
    "bg-upbeat",
    "bg-chill",
    "bg-relaxed",
    "bg-melancholic",
    "hover:bg-primary",
    "hover:bg-upbeat",
    "hover:bg-chill",
    "hover:bg-relaxed",
    "hover:bg-melancholic",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontSize: {
        xxs: "10px",
        xs: "13px",
      },
      screens: {
        desktop: { min: "1900px" },
        "3xl": { max: "1890px" },
        "2xl": { max: "1535px" },
        xl: { min: "1279px" },
        xs: { min: "0px" },
      },
      colors: {
        primary: "#000",
        dark: "#000000",
        upbeat: "#ff6f00",
        chill: "#7bffb4",
        relaxed: "#1a63fe",
        melancholic: "#6e00d0",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
