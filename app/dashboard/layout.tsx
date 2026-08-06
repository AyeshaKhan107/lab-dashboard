
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex">
  <Sidebar />

  <main className="ml-64 flex-1 p-6">
    {children}
  </main>
</div>
  );
}