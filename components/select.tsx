import { ChangeEventHandler, ReactNode } from "react";

type SelectProps = {
  value: string;
  children: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export default function Select(props: SelectProps) {
  return (
    <div className="w-28 box-border p-2 relative bg-accent-1 border border-accent-2 flex items-center justify-between rounded-lg text-xs group hover:border-foreground focus-within:border-foreground">
      {props.prefix && (
        <span className="text-accent-5 group-focus-within:text-foreground group-hover:text-foreground">
          {props.prefix}
        </span>
      )}
      <select
        value={props.value}
        onChange={props.onChange}
        className="absolute px-7 left-0 top-0 bg-transparent border-none outline-none appearance-none w-full h-full hover:cursor-pointer"
      >
        {props.children}
      </select>
      {props.suffix && (
        <span className="text-accent-5 group-focus-within:text-foreground group-hover:text-foreground">
          {props.suffix}
        </span>
      )}
    </div>
  );
}
