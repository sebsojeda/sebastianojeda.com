/**
 * CheckIcon.
 *
 * @param {import("../../typedefs").IconProps} props
 */
export default function CheckIcon({ size }) {
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
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
