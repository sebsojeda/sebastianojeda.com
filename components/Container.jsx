/**
 * Props for the `Container` component.
 *
 * @typedef {object} ContainerProps
 * @property {import("react").ReactNode} children - The element to wrap in the container.
 */

/**
 * A reasonable container to comfortably read content.
 *
 * @param {ContainerProps} props - {@link ContainerProps}
 */
export default function Container({ children }) {
  return <div className="max-w-3xl px-6 mx-auto">{children}</div>;
}
