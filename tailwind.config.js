/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2a8d4b",
        "background-light": "#f6f8f7",
        "background-dark": "#131f17",
        "status-green": "#198754",
        "status-blue": "#0D6EFD",
        "status-gray": "#6C757D",
        "status-yellow": "#FFC107",
        "neutral-white": "#FFFFFF",
        "neutral-gray-light": "#F8F9FA",
        "neutral-gray-medium": "#ADB5BD",
        "neutral-gray-dark": "#6C757D",
        "text-light": "#FFFFFF",
        "text-dark": "#121714",
        "text-secondary": "#6C757D",
        "text-light-title": "#1A202C",
        "text-dark-title": "#E2E8F0",
        "text-light-body": "#4A5568",
        "text-dark-body": "#A0AEC0",
        "border-light": "#E2E8F0",
        "border-dark": "#2D3748"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "heading": ["Poppins", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}

