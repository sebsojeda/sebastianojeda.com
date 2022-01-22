import { ChangeEventHandler, useEffect, useRef } from "react";
import MagnifyingGlass from "./icons/magnifying-glass";

type SearchProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export default function Search(props: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef?.current?.focus();
      }
    });

    return () => document.removeEventListener("keypress", () => {});
  }, []);

  return (
    <div className="my-16 flex">
      <div className="group flex border border-accent-2 rounded-lg focus-within:border-foreground">
        <div className="flex items-center justify-center text-accent-2 m-1 group-focus-within:text-foreground">
          <MagnifyingGlass />
        </div>
        <input
          type="text"
          placeholder="Search..."
          onChange={props.onChange}
          value={props.value}
          ref={inputRef}
          className="bg-transparent outline-none"
        />
        <div className="bg-accent-1 py-1 px-2 m-1 rounded-lg text-accent-2 border border-accent-2">
          &#47;
        </div>
      </div>
    </div>
  );
}
