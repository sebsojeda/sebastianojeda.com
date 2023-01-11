import Title from "../components/Title";

/**
 * The `/about` page.
 */
export default function AboutPage() {
  return (
    <>
      <Title text="About Me" gradient="yellow" />
      <div className="pt-5 text-neutral-900 dark:text-neutral-50 mb-16">
        <p>
          Hey, I&apos;m Sebastian. I&apos;m a developer, writer, and creative
          coder. I currently work at{" "}
          <a href="https://schwab.com">Charles Schwab</a> as a DevOps Engineer.
          Previously, I worked as a full stack software developer for a{" "}
          <a href="https://cognitosoftware.com">startup</a>.
        </p>
        <p>
          I was born in Chile off the western coast of South America but grew up
          in a small town in North Carolina. I went to school at Appalachian
          State University, where I graduated with a degree in Physics and I am
          currently pursuing a degree in Computer Science at the University of
          Colorado Boulder.
        </p>
        <p>
          When I&apos;m not coding, I spend my free time playing music, rock
          climbing, and hanging out with friends and family in Dever, CO.
        </p>
      </div>
    </>
  );
}
