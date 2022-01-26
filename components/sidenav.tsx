import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { signOut } from "next-auth/react";

export default function SideNav() {
  return (
    <div className="bg-accent-1 flex flex-col justify-between p-4 border-r border-accent-2">
      <div>
        <Link href="/">
          <a className="font-bold">Sebastian Ojeda</a>
        </Link>
      </div>
      <div>
        <ThemeToggle />
        <button type="button" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
