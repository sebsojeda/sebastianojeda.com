type TitleProps = {
  text: string;
  gradient?: "pink" | "cyan" | "yellow";
};

export default function Title({ text, gradient }: TitleProps) {
  let transition;
  if (gradient === "pink")
    transition = "from-violet to-highlight-pink via-highlight-purple";
  if (gradient === "cyan")
    transition = "from-success-dark to-cyan via-success-light";
  if (gradient === "yellow")
    transition = "from-error-light to-highlight-yellow via-warning-light";
  return (
    <div>
      <span
        className={`text-3xl md:text-5xl font-bold ${
          gradient &&
          `bg-clip-text text-transparent bg-gradient-to-r ${transition}`
        }`}
      >
        {text}
      </span>
    </div>
  );
}
