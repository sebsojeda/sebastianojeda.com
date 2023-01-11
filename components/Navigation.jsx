import ActiveLink from "./ActiveLink";
import Container from "./Container";
import Dropdown from "./Dropdown";

/**
 * Global navigation.
 */
export default function Navigation() {
  return (
    <Container>
      <nav className="pb-16 pt-7">
        <ul className="flex items-center gap-6">
          <li>
            <ActiveLink href="/" text="Home" />
          </li>
          <li>
            <ActiveLink href="/blog" text="Blog" />
          </li>
          <li>
            <ActiveLink href="/about" text="About" />
          </li>
          <li>
            <Dropdown label="Extras" />
          </li>
        </ul>
      </nav>
    </Container>
  );
}
