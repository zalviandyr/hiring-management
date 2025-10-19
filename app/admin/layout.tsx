import React from "react";
import { AdminHeader } from "./_components/AdminHeader";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative bg-neutral-20 min-h-screen">
      <AdminHeader />

      <div className="px-32 py-8">{children}</div>
    </div>
  );
};

export default MainLayout;
