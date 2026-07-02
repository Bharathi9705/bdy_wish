/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#08040f",
        deep: "#120a22",
        mid: "#1c0f34",
        plum: "#6b3fa0",
        orchid: "#a663d1",
        lilac: "#c9a8e8",
        champagne: "#e8c880",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        script: ["'Playfair Display'", "serif"],
        body: ["'Quicksand'", "sans-serif"],
        tamil: ["'Noto Sans Tamil'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(166,99,209,0.35)",
        "glow-gold": "0 0 30px rgba(232,200,128,0.35)",
      },
    },
  },
  plugins: [],
};
