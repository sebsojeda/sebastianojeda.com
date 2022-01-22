import Link from "next/link";
import Code from "./code";

const pre = (props: any) => <Code {...props} />;

const a = (props: any) => {
  const href = props.href;
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link href={href}>
        <a
          {...props}
          className="not-prose relative text-success hover:text-success-dark underline underline-offset-1"
        >
          {props.children}
        </a>
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className="not-prose relative text-success hover:text-success-dark underline underline-offset-1"
    />
  );
};

const code = (props: any) => (
  <code
    {...props}
    className="border border-accent-2 text-foreground p-1 rounded-lg font-mono not-prose"
  />
);

const Mdx = {
  pre,
  a,
  code,
};

export default Mdx;
