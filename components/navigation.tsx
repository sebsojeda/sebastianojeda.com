import Link from "next/link";
import ToggleTheme from "./toggle-theme";

export default function Navigation() {
  return (
    <div className="grid grid-cols-2 py-4">
      <div className="grid grid-cols-2">
        <Link href="/">
          <a className="text-xl font-bold">Sebastian Ojeda</a>
        </Link>
        <nav>
          <ul className="grid grid-cols-2 font-semibold">
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
      <div className="grid grid-cols-2">
        <ToggleTheme />
      </div>
    </div>
  );
}
