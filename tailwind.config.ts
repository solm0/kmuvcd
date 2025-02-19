import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      width: {
        '224': '56rem', // 224 * 0.25rem (1rem = 16px)
      },
    },
  },
  plugins: [],
} satisfies Config;
