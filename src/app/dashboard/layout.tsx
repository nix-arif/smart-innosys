import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardProps) => {
  return <div className="bg-slate-200 h-screen">{children}</div>;
};

export default DashboardLayout;
