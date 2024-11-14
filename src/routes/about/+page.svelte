<script lang="ts">
	import profile from '$lib/assets/profile.png';
	import * as config from '$lib/config';
</script>

<svelte:head>
	<title>About {config.title}</title>
	<meta name="description" content={config.description} />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content={`About ${config.title}`} />
	<meta property="og:description" content={config.description} />
	<meta property="og:url" content={`${config.url}/about`} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Sebastian Ojeda" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={`${config.url}/og?title=About ${config.title}`} />
	<link rel="canonical" href={`${config.url}/about`} />
</svelte:head>

<article class="prose prose-zinc dark:prose-invert">
	<img class="float-right ml-4 mb-2 mt-1 h-[150px] rounded-full" src={profile} alt="Profile" />
	<h2 class="mt-0">About Me</h2>
	<p>
		I'm passionate about science and technology, both the advancement and practical applications of
		them. I believe software has the ability to improve the lives of people and the world we live
		in.
	</p>
	<h3>What I Do</h3>
	<p>
		I'm a software engineer at <a href="https://schwab.com">Charles Schwab</a>
		where I work on developer pipelines and build internal tools &mdash; I like to think of developers
		as my customers. Previously, I was a software engineer at
		<a href="https://www.cognitosoftware.com">Cognito</a>. I'm also currently a graduate student at
		<a href="https://www.utexas.edu">The University of Texas at Austin</a> where I'm pursuing a Master's
		degree in Computer Science with a focus on Artifical Intelligence.
	</p>
	<h3>Technical Contributions</h3>
	<ul>
		<li>
			<a href="https://www.betterwallpapers.app">Better Wallpapers</a> &mdash; A wallpaper app for macOS
			written in Swift. Available on the Mac App Store, it allows you to schedule, download, and favorite
			wallpapers from a curated collection of 200+ high-resolution images.
		</li>
		<li>
			<a href="https://workly.fly.dev">Workly</a> &mdash; An applicant tracking system (ATS) written
			using Python's FastAPI framework. It's a RESTful API that allows users to perform CRUD operations
			on job applications and candidates.
		</li>
		<li>
			<a href="https://github.com/sebsojeda/vscode-apple-music">VS Code Apple Music</a> &mdash; A Visual
			Studio Code extension with over 500 downloads that allows you to control Apple Music directly from
			the editor. Written in TypeScript.
		</li>
		<li>
			<a href="https://github.com/sebsojeda/gatsby-theme-purist">Gatsby Theme Purist</a> &mdash; A clean,
			full-featured, Gatsby-powered blog theme with built-in dark mode and social sharing.
		</li>
	</ul>
	<h3>Let's Connect</h3>
	<p>
		I love connecting with like-minded individuals and exploring new opportunities. Feel free to
		connect with me on
		<a href={`https://www.linkedin.com/in/${config.linkedin}`}>LinkedIn</a>,
		<a href={`https://bsky.app/profile/${config.bluesky}`}>Bluesky</a>, or
		<a href={`mailto:${config.email}`}>email</a>. I'm excited to hear from you, collaborate, or
		simply engage in inspiring conversations.
	</p>
</article>
