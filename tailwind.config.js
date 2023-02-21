// tailwind.config.js
const colors = require("tailwindcss/colors");
module.exports = {
  // safelict generated all tailwind classef for edit mode
  // safelist: [{ pattern: /./ }],
  mode: "jit",
  purge: [
    "./src/pages/**/*.tsx",
    "./src/pages/**/*.js",
    "./src/components/**/*.tsx",
    "./src/helpers/**/*.ts",
  ],
  theme: {
    extend: {
      self: {
        normal: "normal",
      },
      width: {
        "1/9": "12%",
      },
      minWidth: {
        "12": "3rem",
        "16": "4rem",
        "24": "6rem",
      },
      min: {
        "12": "3rem",
        "16": "4rem",
        "24": "6rem",
      },
      padding: {
        '1/2': '50%',
        full: '100%',
      },
      colors: {
        slate: colors.slate,
      },
    },
  },
  
  plugins: [],
};
