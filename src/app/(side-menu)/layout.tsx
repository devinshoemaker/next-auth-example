import React from "react";

import SideMenu from "@/components/side-menu";

export default function SideMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen md:flex w-full">
      <SideMenu />
      <div className="min-h-screen w-full">{children}</div>
    </div>
  );
}
