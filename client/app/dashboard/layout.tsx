import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* TODO: Add Sidebar */}
      <main className="flex-1 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
