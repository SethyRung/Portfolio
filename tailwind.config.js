import { setupInspiraUI } from "@inspira-ui/plugins";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector"],
  safelist: ["dark"],
  prefix: "",

  theme: {
    extend: {
      fontFamily: {
        "public-sans": ["Public_Sans", "sans-serif"],
      },

      screens: {
        tablet: "441px",
        computer: "1024px",
      },

      keyframes: {
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
      },

      animation: {
        gradient: "gradient 8s linear infinite",
      },
    },
  },
  plugins: [animate, setupInspiraUI],
};
