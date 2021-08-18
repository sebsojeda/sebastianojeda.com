import Link from "next/link";
import ToggleTheme from "./toggle-theme";

export default function Navigation() {
  return (
    <div className="flex justify-between py-4">
      <div className="flex space-x-10 items-center">
        <Link href="/">
          <a className="text-2xl font-medium text-tertiary">Sebastian Ojeda</a>
        </Link>
        <nav>
          <ul className="flex space-x-6 font-semibold">
            <li>
              <Link href="/posts">
                <a>Posts</a>
              </Link>
            </li>
            <li>
              <Link href="/snippets">
                <a>Snippets</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <ToggleTheme />
    </div>
  );
}
