import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";

type ActiveLinkProps = {
  href: string;
  text: string;
};

const Styles = {
  link: (isActive: boolean) => css`
    color: ${isActive ? "var(--color-foreground)" : "var(--color-accent-5)"};
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: var(--color-foreground);
    }
  `,
};

export default function ActiveLink({ href, text }: ActiveLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href} passHref>
      <a css={Styles.link(isActive)}>{text}</a>
    </Link>
  );
}
