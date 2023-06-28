"use client";

import Sidebar from "@/components/Sidebar";
import withAuth from "@/utils/withAuth";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}

export default withAuth(DashboardLayout);
