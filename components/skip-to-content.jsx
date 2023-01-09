export default function SkipToContent() {
  return (
    <a
      className="z-50 absolute text-blue-500 border border-blue-500 rounded-lg p-2 mt-2 ml-2 dark:bg-neutral-900 bg-neutral-50 clip-path-inset-100 focus:clip-path-none"
      href="#skip-to-content"
      tabIndex={1}
    >
      Skip to content
    </a>
  );
}
