import React from "react";
import { Header } from "./_components/Header";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative bg-neutral-20 min-h-screen">
      <Header />

      <div className="px-24 py-8">{children}</div>
    </div>
  );
};

export default MainLayout;
