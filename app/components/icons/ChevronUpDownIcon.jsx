/**
 * ChevronUpDownIcon.
 *
 * @param {import("../../../typedefs").IconProps} props
 */
export default function ChevronUpDownIcon({ size }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size ?? 24}
      height={size ?? 24}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M17 8.517L12 3 7 8.517M7 15.48l5 5.517 5-5.517" />
    </svg>
  );
}
