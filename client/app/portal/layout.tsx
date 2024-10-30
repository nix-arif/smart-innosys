import DashboardWrapper from "./dashboardWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
}
