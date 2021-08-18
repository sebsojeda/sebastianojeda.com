import { ReactNode } from "react";

export interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-primary text-secondary">{children}</div>
  );
}
