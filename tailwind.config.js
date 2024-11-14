import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['"Inter Variable"', 'sans-serif'],
			mono: ['"Roboto Mono Variable"', 'monospace']
		},
		extend: {}
	},
	plugins: [typography]
};
