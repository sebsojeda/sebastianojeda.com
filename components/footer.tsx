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
    <footer className="border-t border-t-accent-2 py-12 bg-accent-1">
      <Container>
        <RecentlyPlayed />
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2">
          <div>
            <h5>Pages</h5>
            <ul>
              <li>
                <Link href="/" passHref>
                  <a className="text-accent-5 my-3 inline-block hover:text-foreground">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog" passHref>
                  <a className="text-accent-5 my-3 inline-block hover:text-foreground">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about" passHref>
                  <a className="text-accent-5 my-3 inline-block hover:text-foreground">
                    About
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Extras</h5>
            <ul>
              <li>
                <Link href="/snippets" passHref>
                  <a className="text-accent-5 my-3 inline-block hover:text-foreground">
                    Snippets
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-4 gap-4 sm:flex-row sm:justify-between">
          <h4>Sebastian Ojeda</h4>
          <div className="flex items-center justify-center gap-4 text-accent-5">
            <a
              href="https://github.com/sebsojeda"
              className="hover:text-foreground"
            >
              <GitHub />
            </a>
            <a
              href="https://twitter.com/sebsojeda"
              className="hover:text-foreground"
            >
              <Twitter />
            </a>
            <a
              href="https://linkedin.com/in/sebastian-ojeda"
              className="hover:text-foreground"
            >
              <LinkedIn />
            </a>
            <a href="/rss.xml" className="hover:text-foreground">
              <Rss />
            </a>
          </div>
          <ThemeToggle />
        </div>
        <div className="border-t border-accent-2 text-xs pt-4">
          Copyright &copy; 2021-Present Sebastian Ojeda. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}
