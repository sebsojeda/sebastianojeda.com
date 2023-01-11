/**
 * Props for the `Title` component.
 *
 * @typedef {object} TitleProps
 * @property {string} text - Title text.
 * @property {string} [gradient] - Gradient effect for the title.
 */

/**
 * A fancy title.
 *
 * @param {TitleProps} props - {@link TitleProps}
 */
export default function Title({ text, gradient }) {
  let transition;
  if (gradient === "pink")
    transition = "from-indigo-500 to-pink-500 via-purple-500";
  if (gradient === "cyan")
    transition = "from-blue-700 to-cyan-500 via-blue-500";
  if (gradient === "yellow")
    transition = "from-red-500 to-yellow-500 via-orange-500";
  if (gradient === "green")
    transition = "from-teal-500 to-emerald-500 via-green-500";
  return (
    <div>
      <span
        className={`text-3xl md:text-5xl font-bold ${
          gradient &&
          `bg-clip-text text-transparent bg-gradient-to-br ${transition}`
        }`}
      >
        {text}
      </span>
    </div>
  );
}
