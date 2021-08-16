import { ReactNode } from "react";

export interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {children}
    </div>
  );
}
