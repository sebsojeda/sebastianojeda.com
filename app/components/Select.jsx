/**
 * Props for the `Select` component.
 *
 * @typedef {object} SelectProps
 * @property {string} value
 * @property {import("react").ReactNode} children
 * @property {import("react").ReactNode?} prefix
 * @property {import("react").ReactNode?} suffix
 * @property {import("react").ChangeEventHandler<HTMLSelectElement>} onChange
 */

/**
 * A generic select component with some additional styles and options.
 *
 * @param {SelectProps} props - {@link SelectProps}
 */
export default function Select(props) {
  return (
    <div className="border-neutral-200 dark:border-neutral-700 w-28 box-border p-2 relative border flex items-center justify-between rounded-lg text-xs group hover:border-neutral-900 dark:hover:border-neutral-50 dark:focus-within:border-neutral-50 focus-within:border-neutral-900">
      {props.prefix && (
        <span className="text-neutral-500 dark:text-neutral-400 group-focus-within:text-neutral-900 group-hover:text-neutral-900 dark:group-focus-within:text-neutral-50 dark:group-hover:text-neutral-50">
          {props.prefix}
        </span>
      )}
      <select
        value={props.value}
        onChange={props.onChange}
        className="text-neutral-900 dark:text-neutral-50 absolute px-7 left-0 top-0 bg-transparent border-none outline-none appearance-none w-full h-full hover:cursor-pointer"
      >
        {props.children}
      </select>
      {props.suffix && (
        <span className="text-neutral-500 dark:text-neutral-400 group-focus-within:text-neutral-900 group-hover:text-neutral-900 dark:group-focus-within:text-neutral-50 dark:group-hover:text-neutral-50">
          {props.suffix}
        </span>
      )}
    </div>
  );
}
