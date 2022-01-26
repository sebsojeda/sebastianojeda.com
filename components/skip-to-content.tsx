export default function SkipToContent() {
  return (
    <a
      className="z-50 absolute text-success border border-success rounded-lg p-2 mt-2 ml-2 bg-background clip-path-inset-100 focus:clip-path-none"
      href="#skip-to-content"
      tabIndex={1}
    >
      Skip to content
    </a>
  );
}
