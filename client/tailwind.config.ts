import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    backgroundColor: {
      colors: {
        gray: {
          1: "#FCFCFC",
          2: "#F9F9F9",
        },
      },
    },
    colors: {
      gray: {
        1: "#FCFCFC",
        2: "#F9F9F9",
        3: "#F0F0F0",
        4: "#E8E8E8",
        5: "#E0E0E0",
        6: "#D9D9D9",
        7: "#CECECE",
        8: "#BBBBBB",
        9: "#8D8D8D",
        10: "#838383",
        11: "#646464",
        12: "#202020",
      },
    },
    extend: {
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "1.875rem"],
        "2xl": ["1.5rem", "2rem"],
        "3xl": ["1.875rem", "2.25rem"],
        "4xl": ["2.25rem", "2.5rem"],
        "5xl": ["3rem", "3rem"],
        "6xl": ["3.75rem", "3.75rem"],
        "7xl": ["4.5rem", "4.5rem"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
export default config;
