import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DealersDashboard() {
  const [data] = useState({
    dealerName: "Sri Lakshmi Traders",
    purchased: 120,
    taken: 95,
    returned: 10,
    products: [
      { id: 1, name: "NitroBase", purchased: 10, taken: 35, returned: 2 },
      { id: 2, name: "PhosphoBase", purchased: 30, taken: 25, returned: 3 },
      { id: 3, name: "PotashBase", purchased: 50, taken: 35, returned: 5 },
    ],
  });

  const chartData = [
    { name: "Purchased", value: data.purchased },
    { name: "Taken", value: data.taken },
    { name: "Returned", value: data.returned },
  ];

  const COLORS = ["#667eea", "#4facfe", "#f093fb"];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card px-4 py-2 rounded-lg">
          <p className="text-sm font-semibold text-white">{payload[0].name}</p>
          <p className="text-lg font-bold text-white">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="animate-fadeInUp">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
          Dealer Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-white/90">
            {data.dealerName}
          </h2>
          <span className="glass-card px-3 py-1 rounded-full text-sm font-medium text-white/80">
            Active
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Purchased Card */}
        <div className="glass-card gradient-border rounded-2xl p-6 hover-glow hover:scale-105 cursor-pointer animate-fadeInUp">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-1">
                Total Purchased
              </p>
              <h3 className="text-5xl font-bold text-white">
                {data.purchased}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full animate-shimmer"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Taken Card */}
        <div className="glass-card gradient-border rounded-2xl p-6 hover-glow hover:scale-105 cursor-pointer animate-fadeInUp delay-100">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-1">
                Total Taken
              </p>
              <h3 className="text-5xl font-bold text-white">{data.taken}</h3>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-shimmer"
              style={{ width: `${(data.taken / data.purchased) * 100}%` }}
            />
          </div>
        </div>

        {/* Returned Card */}
        <div className="glass-card gradient-border rounded-2xl p-6 hover-glow hover:scale-105 cursor-pointer animate-fadeInUp delay-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-white/70 uppercase tracking-wide mb-1">
                Total Returned
              </p>
              <h3 className="text-5xl font-bold text-white">
                {data.returned}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
            </div>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-shimmer"
              style={{ width: `${(data.returned / data.purchased) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Product Summary</h3>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
                  <stop offset="100%" stopColor="#764ba2" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                stroke="#fff"
                style={{ fontSize: '14px', fontWeight: 500 }}
              />
              <YAxis
                stroke="#fff"
                style={{ fontSize: '14px', fontWeight: 500 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-400">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Distribution</h3>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#fff', strokeWidth: 1 }}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Products Detail</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/60">{data.products.length} Products</span>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Purchased
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Taken
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Returned
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p, index) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  style={{ animationDelay: `${(index + 5) * 100}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-2 text-white/90 font-medium">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      {p.purchased}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-2 text-white/90 font-medium">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      {p.taken}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-2 text-white/90 font-medium">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      {p.returned}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
