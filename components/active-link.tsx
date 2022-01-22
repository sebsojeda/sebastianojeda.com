import Link from "next/link";
import { useRouter } from "next/router";

type ActiveLinkProps = {
  href: string;
  text: string;
  [key: string]: any;
};

export default function ActiveLink({ href, text, ...rest }: ActiveLinkProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href} passHref>
      <a
        className={
          isActive ? "text-foreground" : "text-accent-5 hover:text-foreground"
        }
        {...rest}
      >
        {text}
      </a>
    </Link>
  );
}
