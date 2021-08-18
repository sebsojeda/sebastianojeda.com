module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'none',
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      tertiary: 'var(--color-tertiary)',
      accent: 'var(--color-accent)',
      homepage: 'var(--color-homepage)',
      header: 'var(--color-header)'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
