import Dashboard from "@/components/dashboard-03";
import TestBtn from "@/components/test-btn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Dashboard />
      </div>
      <TestBtn />
    </main>
  );
}
