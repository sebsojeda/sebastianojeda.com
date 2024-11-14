<script lang="ts">
	import { browser } from '$app/environment';
	import * as config from '$lib/config';

	let theme = browser ? localStorage.getItem('theme') ?? 'system' : null;
	let prefersDark = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;

	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (theme === 'system') {
				document.documentElement.classList.toggle('dark', e.matches);
			}
			prefersDark = e.matches;
		});
	}

	function toggleTheme() {
		const options = prefersDark ? ['system', 'light', 'dark'] : ['system', 'dark', 'light'];
		const next = options[(options.indexOf(theme!) + 1) % options.length];

		if (next === 'system') {
			localStorage.removeItem('theme');
			document.documentElement.classList.toggle('dark', prefersDark);
		} else {
			localStorage.setItem('theme', next);
			document.documentElement.classList.toggle('dark', next === 'dark');
		}

		theme = next;
	}
</script>

<nav class="flex items-center justify-between pt-2 pb-6 md:pt-3 md:pb-8">
	<a class="p-2 -ml-2 rounded-md md:text-lg" href="/">
		<b>{config.title}</b>
	</a>

	<div class="relative flex items-center gap-1 font-mono text-sm md:gap-2">
		{#if theme}
			<button
				class={`${
					theme !== 'system'
						? 'bg-zinc-100 dark:bg-zinc-800'
						: 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
				} p-2 rounded-sm peer`}
				type="button"
				aria-label="Toggle theme"
				on:click={toggleTheme}
			>
				{#if theme === 'light'}
					<svg
						fill="none"
						height="16"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="16"
					>
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v2" />
						<path d="M12 21v2" />
						<path d="M4.22 4.22l1.42 1.42" />
						<path d="M18.36 18.36l1.42 1.42" />
						<path d="M1 12h2" />
						<path d="M21 12h2" />
						<path d="M4.22 19.78l1.42-1.42" />
						<path d="M18.36 5.64l1.42-1.42" />
					</svg>
				{:else if theme === 'dark'}
					<svg
						fill="none"
						height="16"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="16"
					>
						<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
					</svg>
				{:else}
					<svg
						fill="none"
						height="16"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						width="16"
					>
						<path
							d="M2 13.381h20M8.66 19.05V22m6.84-2.95V22m-8.955 0h10.932M4 19.05h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v13.05a2 2 0 002 2z"
						/>
					</svg>
				{/if}
			</button>
			<span
				class={`absolute ${
					theme !== 'system' ? '' : 'invisible'
				} w-12 text-xs text-right capitalize md:inline -left-14 peer-hover:visible text-zinc-500`}
				>{theme}</span
			>
		{/if}
		<ul class="flex items-center gap-1">
			<li>
				<a class="p-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800" href="/about">About</a>
			</li>
			<li>
				<a
					class="flex items-center gap-1 p-2 -mr-2 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
					href={`https://bsky.app/profile/${config.bluesky}`}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 600 530">
						<path
							d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"
							fill="currentColor"
						/>
					</svg>
					<span>Follow</span>
				</a>
			</li>
		</ul>
	</div>
</nav>
