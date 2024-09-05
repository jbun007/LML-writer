import Dashboard from "@/components/dashboard-03";
import TestBtn from "@/components/test-btn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <Dashboard />
      </div>
      {/* <TestBtn /> */}
    </main>
  );
}
