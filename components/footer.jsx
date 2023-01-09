import Link from "next/link";
import Container from "./container";
import GitHub from "./icons/github";
import LinkedIn from "./icons/linkedin";
import Rss from "./icons/rss";
import Twitter from "./icons/twitter";
import RecentlyPlayed from "./recently-played";
import ThemeToggle from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="border-t border-t-neutral-200 dark:border-t-neutral-700 py-12 bg-neutral-100 dark:bg-neutral-800">
      <Container>
        <RecentlyPlayed />
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2">
          <div>
            <h5>Pages</h5>
            <ul>
              <li>
                <Link
                  href="/"
                  className="text-neutral-500 dark:text-neutral-400 my-3 inline-block hover:text-neutral-900 dark:hover:text-neutral-50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-500 dark:text-neutral-400 my-3 inline-block hover:text-neutral-900 dark:hover:text-neutral-50"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-neutral-500 dark:text-neutral-400 my-3 inline-block hover:text-neutral-900 dark:hover:text-neutral-50"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Extras</h5>
            <ul>
              <li>
                <Link
                  href="/snippets"
                  className="text-neutral-500 dark:text-neutral-400 my-3 inline-block hover:text-neutral-900 dark:hover:text-neutral-50"
                >
                  Snippets
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-4 gap-4 sm:flex-row sm:justify-between">
          <h4>Sebastian Ojeda</h4>
          <div className="flex items-center justify-center gap-4 text-neutral-500 dark:text-neutral-400">
            <a
              href="https://github.com/sebsojeda"
              className="hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <GitHub size={14} />
            </a>
            <a
              href="https://twitter.com/sebsojeda"
              className="hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://linkedin.com/in/sebastian-ojeda"
              className="hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <LinkedIn size={18} />
            </a>
            <a
              href="/rss.xml"
              className="hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <Rss size={18} />
            </a>
          </div>
          <ThemeToggle />
        </div>
        <div className="border-t border-t-neutral-200 dark:border-t-neutral-700 text-xs pt-4 text-neutral-500">
          Copyright &copy; 2021-Present Sebastian Ojeda. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}
