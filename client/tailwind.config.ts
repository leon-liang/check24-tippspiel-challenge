import type { Config } from "tailwindcss";

const colors = {
  white: {
    A1: "rgba(255, 255, 255, 0.05)",
    A2: "rgba(255, 255, 255, 0.1)",
    A3: "rgba(255, 255, 255, 0.15)",
    A4: "rgba(255, 255, 255, 0.2)",
    A5: "rgba(255, 255, 255, 0.3)",
    A6: "rgba(255, 255, 255, 0.4)",
    A7: "rgba(255, 255, 255, 0.5)",
    A8: "rgba(255, 255, 255, 0.6)",
    A9: "rgba(255, 255, 255, 0.7)",
    A10: "rgba(255, 255, 255, 0.8)",
    A11: "rgba(255, 255, 255, 0.9)",
    A12: "rgba(255, 255, 255, 0.95)",
  },
  black: {
    A1: "rgba(0, 0, 0, 0.05)",
    A2: "rgba(0, 0, 0, 0.1)",
    A3: "rgba(0, 0, 0, 0.15)",
    A4: "rgba(0, 0, 0, 0.2)",
    A5: "rgba(0, 0, 0, 0.3)",
    A6: "rgba(0, 0, 0, 0.4)",
    A7: "rgba(0, 0, 0, 0.5)",
    A8: "rgba(0, 0, 0, 0.6)",
    A9: "rgba(0, 0, 0, 0.7)",
    A10: "rgba(0, 0, 0, 0.8)",
    A11: "rgba(0, 0, 0, 0.9)",
    A12: "rgba(0, 0, 0, 0.95)",
  },
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
  indigo: {
    1: "#FDFDFE",
    2: "#F7F9FF",
    3: "#EDF2FE",
    4: "#E1E9FF",
    5: "#D2DEFF",
    6: "#C1D0FF",
    7: "#ABBDF9",
    8: "#8DA4EF",
    9: "#3E63DD",
    10: "#3358D4",
    11: "#3A5BC7",
    12: "#1F2D5C",
  },
  green: {
    1: "#FBFEFC",
    2: "#F4FBF6",
    3: "#E6F6EB",
    4: "#D6F1DF",
    5: "#C4E8D1",
    6: "#ADDDC0",
    7: "#8ECEAA",
    8: "#5BB98B",
    9: "#30A46C",
    10: "#2B9A66",
    11: "#218358",
    12: "#193B2D",
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    backgroundColor: {
      colors,
    },
    colors,
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
      keyframes: {
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))",
          },
          to: { transform: "translateX(0)" },
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
