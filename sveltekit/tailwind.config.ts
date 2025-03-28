import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      boxShadow:{
        "3xl": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "4xl": "0px 2px 8px 0px rgba(0, 0, 0, 0.25)",
        "5xl": "-2px 1px 4px 0px rgba(0, 0, 0, 0.30)",
        inset: "inset 4px 0px 0px 0px #374151",
      },
    }
  },

  plugins: []
} satisfies Config;
