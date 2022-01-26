import { ReactNode } from "react";
import SideNav from "../components/sidenav";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <SideNav />
      <main className="grid auto-cols-[15rem] auto-rows-[10rem] p-20 gap-4">
        {props.children}
      </main>
    </div>
  );
}
