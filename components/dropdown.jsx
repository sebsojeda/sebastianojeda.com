"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ActiveLink from "./ActiveLink";

/**
 * Props for the `Dropdown` component.
 *
 * @typedef {object} DropDownProps
 * @property {string} label - The dropdown text label to display.
 */

/**
 * A simple dropdown menu.
 *
 * @param {DropDownProps} props - {@link DropDownProps}
 */
export default function Dropdown(props) {
  return (
    <Menu as="div" className="relative">
      <div className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50">
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
            {() => <ActiveLink href="/snippets" text="Snippets" />}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
