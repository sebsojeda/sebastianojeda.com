import * as config from "@/lib/config";
import profile from "@/public/profile.png";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: `About ${config.title}`,
  description: config.description,
  robots: "index, follow",
  openGraph: {
    type: "article",
    title: `About ${config.title}`,
    description: config.description,
    url: `${config.url}/about`,
    locale: "en_US",
    siteName: config.title,
    images: [
      {
        url: `${config.url}/og?title=About ${config.title}`,
        alt: `About ${config.title}`,
      },
    ],
  },
};

export default function About() {
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <Image
        className="float-right rounded-full ml-4 mb-2 mt-1"
        src={profile}
        alt="Profile"
        height={150}
        width={150}
      />
      <h2 className="mt-0">About Me</h2>
      <p>
        I'm passionate about science and technology, both the advancement and
        practical applications of them. I believe software has the ability to
        improve the lives of people and the world we live in.
      </p>
      <h3>What I Do</h3>
      <p>
        I'm a software engineer at{" "}
        <a href="https://schwab.com">Charles Schwab</a> where I work on
        developer pipelines and build internal tools &mdash; I like to think of
        developers as my customers. Previously, I was a software engineer at{" "}
        <a href="https://www.cognitosoftware.com">Cognito</a>. I'm also
        currently a graduate student at{" "}
        <a href="https://www.utexas.edu">The University of Texas at Austin</a>{" "}
        where I'm pursuing a Master's degree in Computer Science with a focus on
        Artifical Intelligence.
      </p>
      <h3>Technical Contributions</h3>
      <ul>
        <li>
          <a href="https://www.betterwallpapers.app">Better Wallpapers</a>{" "}
          &mdash; A wallpaper app for macOS written in Swift. Available on the
          Mac App Store, it allows you to schedule, download, and favorite
          wallpapers from a curated collection of 200+ high-resolution images.
        </li>
        <li>
          <a href="https://workly.fly.dev">Workly</a> &mdash; An applicant
          tracking system (ATS) written using Python's FastAPI framework. It's a
          RESTful API that allows users to perform CRUD operations on job
          applications and candidates.
        </li>
        <li>
          <a href="https://github.com/sebsojeda/vscode-apple-music">
            VS Code Apple Music
          </a>{" "}
          &mdash; A Visual Studio Code extension with over 500 downloads that
          allows you to control Apple Music directly from the editor. Written in
          TypeScript.
        </li>
        <li>
          <a href="https://github.com/sebsojeda/gatsby-theme-purist">
            Gatsby Theme Purist
          </a>{" "}
          &mdash; A clean, full-featured, Gatsby-powered blog theme with
          built-in dark mode and social sharing.
        </li>
      </ul>
      <h3>Let's Connect</h3>
      <p>
        I love connecting with like-minded individuals and exploring new
        opportunities. Feel free to connect with me on{" "}
        <a href={`https://www.linkedin.com/in/${config.linkedin}`}>LinkedIn</a>,{" "}
        <a href={`https://bsky.app/profile/${config.bluesky}`}>Bluesky</a>, or{" "}
        <a href={`mailto:${config.email}`}>email</a>. I'm excited to hear from
        you, collaborate, or simply engage in inspiring conversations.
      </p>
    </article>
  );
}
