export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-card">
          <h2 className="text-lg font-semibold mb-2">Total Calls</h2>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <h2 className="text-lg font-semibold mb-2">Average Duration</h2>
          <p className="text-3xl font-bold">5m 30s</p>
        </div>
        <div className="p-4 rounded-lg border bg-card">
          <h2 className="text-lg font-semibold mb-2">Success Rate</h2>
          <p className="text-3xl font-bold">95%</p>
        </div>
      </div>
    </div>
  );
}
