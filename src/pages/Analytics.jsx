import { useState } from 'react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

export default function Analytics() {
    const [revenueData] = useState([
        { month: 'Jan', revenue: 45000, orders: 120, profit: 12000 },
        { month: 'Feb', revenue: 52000, orders: 145, profit: 15000 },
        { month: 'Mar', revenue: 48000, orders: 132, profit: 13500 },
        { month: 'Apr', revenue: 61000, orders: 168, profit: 18000 },
        { month: 'May', revenue: 55000, orders: 152, profit: 16000 },
        { month: 'Jun', revenue: 67000, orders: 185, profit: 20000 },
    ]);

    const [categoryData] = useState([
        { category: 'Fertilizers', sales: 45000 },
        { category: 'Supplements', sales: 32000 },
        { category: 'Equipment', sales: 28000 },
        { category: 'Seeds', sales: 19000 },
    ]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card px-4 py-3 rounded-lg">
                    {payload.map((entry, index) => (
                        <div key={index} className="mb-1">
                            <p className="text-sm font-semibold text-white">{entry.name}</p>
                            <p className="text-lg font-bold" style={{ color: entry.color }}>
                                ₹{entry.value.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="animate-fadeInUp">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    Analytics
                </h1>
                <p className="text-lg text-white/70">Detailed insights and performance metrics</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeInUp delay-100">
                <div className="glass-card gradient-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-white/60 uppercase tracking-wide">Total Revenue</p>
                            <p className="text-4xl font-bold text-white mt-2">₹3.28L</p>
                            <p className="text-sm text-green-400 mt-1">+12.5% from last month</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="glass-card gradient-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-white/60 uppercase tracking-wide">Total Orders</p>
                            <p className="text-4xl font-bold text-white mt-2">902</p>
                            <p className="text-sm text-blue-400 mt-1">+8.2% from last month</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="glass-card gradient-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-white/60 uppercase tracking-wide">Avg Order Value</p>
                            <p className="text-4xl font-bold text-white mt-2">₹3,637</p>
                            <p className="text-sm text-purple-400 mt-1">+5.1% from last month</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="glass-card gradient-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-white/60 uppercase tracking-wide">Profit Margin</p>
                            <p className="text-4xl font-bold text-white mt-2">28.7%</p>
                            <p className="text-sm text-yellow-400 mt-1">+2.3% from last month</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend */}
                <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-200">
                    <h3 className="text-2xl font-bold text-white mb-6">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#667eea" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#764ba2" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="month" stroke="#fff" style={{ fontSize: '14px' }} />
                            <YAxis stroke="#fff" style={{ fontSize: '14px' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#667eea"
                                strokeWidth={3}
                                fill="url(#revenueGradient)"
                                animationDuration={1000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Trend */}
                <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-300">
                    <h3 className="text-2xl font-bold text-white mb-6">Orders & Profit</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="month" stroke="#fff" style={{ fontSize: '14px' }} />
                            <YAxis stroke="#fff" style={{ fontSize: '14px' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ color: '#fff' }} />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#4facfe"
                                strokeWidth={3}
                                dot={{ fill: '#4facfe', r: 5 }}
                                animationDuration={1000}
                            />
                            <Line
                                type="monotone"
                                dataKey="profit"
                                stroke="#f093fb"
                                strokeWidth={3}
                                dot={{ fill: '#f093fb', r: 5 }}
                                animationDuration={1000}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Sales by Category */}
                <div className="glass-card rounded-2xl p-6 lg:col-span-2 animate-fadeInUp delay-400">
                    <h3 className="text-2xl font-bold text-white mb-6">Sales by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <defs>
                                <linearGradient id="categoryGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#764ba2" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="category" stroke="#fff" style={{ fontSize: '14px' }} />
                            <YAxis stroke="#fff" style={{ fontSize: '14px' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="sales"
                                fill="url(#categoryGradient)"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
