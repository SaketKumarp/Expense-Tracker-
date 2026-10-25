 
import { Sidebar } from "@/components/dashboard/dashboard-sidebar";
import type { ReactNode } from "react";
 

type HomeLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="dark min-h-screen bg-[#0b0f14] font-sans text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] p-5 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
