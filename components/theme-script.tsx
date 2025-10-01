/**
 * Theme detection script to prevent flash of unstyled content (FOUC)
 */
export function ThemeScript() {
	return (
		<script
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for FOUC prevention
			dangerouslySetInnerHTML={{
				__html: `
					const theme = localStorage.getItem('theme');
					const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					const shouldBeDark = theme === 'dark' || (!theme && systemDark) || (theme === 'system' && systemDark);
					
					if (shouldBeDark) {
						document.documentElement.classList.add('dark');
					}
				`,
			}}
		/>
	);
}
