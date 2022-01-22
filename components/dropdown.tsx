import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import ActiveLink from "./active-link";

type DropdownProps = {
  label: string;
};

export default function Dropdown(props: DropdownProps) {
  return (
    <Menu as="div" className="relative">
      <div className="text-accent-5 hover:text-foreground">
        <Menu.Button>{props.label}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-lg ring-1 ring-accent-2 p-2">
          <Menu.Item>
            {({ active }) => (
              <ActiveLink
                href="/snippets"
                text="Snippets"
                className={
                  active
                    ? "text-foreground"
                    : "text-accent-5 hover:text-foreground"
                }
              />
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
