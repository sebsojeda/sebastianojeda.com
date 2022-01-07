import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";

type ActiveLinkProps = {
  href: string;
  text: string;
};

const Styles = {
  link: css`
    color: var(--color-accent-5);
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: var(--color-foreground);
    }
  `,
  active: css`
    color: var(--color-foreground);
    text-decoration: none;
    :hover {
      cursor: pointer;
    }
  `,
};

export default function ActiveLink({ href, text }: ActiveLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a css={isActive ? Styles.active : Styles.link}>{text}</a>
    </Link>
  );
}
