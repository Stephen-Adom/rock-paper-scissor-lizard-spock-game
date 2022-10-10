/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseColor:
          "linear-gradient(180deg, hsl(214, 47%, 23%), hsl(237, 49%, 15%))",
        textColor: "hsl(229, 25%, 31%)",
        scoreText: "hsl(229, 64%, 46%)",
        headerOutline: "hsl(217, 16%, 45%)",
        scrissorGradient:
          "linear-gradient(180deg, hsl(39, 89%, 49%), hsl(40, 84%, 53%))",
        paperGradient:
          "linear-gradient(180deg, hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
        rockGradient:
          "linear-gradient(180deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%))",
        lizardGradient:
          "linear-gradient(180deg, hsl(261, 73%, 60%), hsl(261, 72%, 63%))",
        spockGradient:
          "linear-gradient(180deg, hsl(189, 59%, 53%), hsl(189, 58%, 57%))",
        deepBlue: "hsl(237, 49%, 15%)",
      },
      fontFamily: {
        barlow: ['"Barlow Semi Condensed"'],
      },
      boxShadow: {
        "shadow-inner-custom": "inset 0 2px 10px 0 rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [],
};
