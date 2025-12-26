import { useState, useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

export default function OverviewAnalytics() {
    // Unified Source of Truth
    const [transactions] = useState([
        { id: '#ORD-7829', dealer: 'Sri Lakshmi Traders', product: 'NitroBase', date: 'Oct 24, 2023', day: 'Mon', amount: 12400, status: 'Completed' },
        { id: '#ORD-7830', dealer: 'Green Valley Farms', product: 'PhosphoBase', date: 'Oct 24, 2023', day: 'Mon', amount: 8200, status: 'Processing' },
        { id: '#ORD-7831', dealer: 'Golden Harvest Co.', product: 'PotashBase', date: 'Oct 25, 2023', day: 'Tue', amount: 15600, status: 'Completed' },
        { id: '#ORD-7832', dealer: 'Sunrise Agriculture', product: 'MicroNutrient', date: 'Oct 25, 2023', day: 'Tue', amount: 5400, status: 'Pending' },
        { id: '#ORD-7833', dealer: 'Fresh Fields Ltd.', product: 'Organic Booster', date: 'Oct 26, 2023', day: 'Wed', amount: 9800, status: 'Completed' },
        { id: '#ORD-7834', dealer: 'Sri Lakshmi Traders', product: 'NitroBase', date: 'Oct 26, 2023', day: 'Wed', amount: 11200, status: 'Completed' },
        { id: '#ORD-7835', dealer: 'Nature Best', product: 'Growth Enhancer', date: 'Oct 27, 2023', day: 'Thu', amount: 7500, status: 'Processing' },
        { id: '#ORD-7836', dealer: 'Green Valley Farms', product: 'PotashBase', date: 'Oct 27, 2023', day: 'Thu', amount: 14300, status: 'Completed' },
        { id: '#ORD-7837', dealer: 'Golden Harvest Co.', product: 'PhosphoBase', date: 'Oct 28, 2023', day: 'Fri', amount: 9100, status: 'Completed' },
        { id: '#ORD-7838', dealer: 'Sunrise Agriculture', product: 'NitroBase', date: 'Oct 29, 2023', day: 'Sat', amount: 13500, status: 'Pending' },
        { id: '#ORD-7839', dealer: 'Fresh Fields Ltd.', product: 'MicroNutrient', date: 'Oct 30, 2023', day: 'Sun', amount: 6200, status: 'Completed' },
    ]);

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

    // Derive Revenue Trend Data (AreaChart)
    const revenueData = useMemo(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const dailyStats = days.reduce((acc, day) => {
            acc[day] = { name: day, revenue: 0, orders: 0 };
            return acc;
        }, {});

        transactions.forEach(t => {
            if (dailyStats[t.day]) {
                dailyStats[t.day].revenue += t.amount;
                dailyStats[t.day].orders += 1;
            }
        });

        return Object.values(dailyStats);
    }, [transactions]);

    // Derive Sales Distribution Data (PieChart)
    const salesDistribution = useMemo(() => {
        const distribution = {};
        transactions.forEach(t => {
            if (!distribution[t.product]) {
                distribution[t.product] = 0;
            }
            distribution[t.product] += t.amount; // Aggregating by Amount (Value)
        });

        return Object.keys(distribution).map(product => ({
            name: product,
            value: distribution[product]
        }));
    }, [transactions]);

    // Calculate Total Revenue for Display
    const totalRevenue = useMemo(() => {
        return transactions.reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);

    return (
        <div className="min-h-screen p-8 space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                    <p className="text-white/60">High-level metrics and performance trends</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">Daily</button>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Weekly</button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">Monthly</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: `₹${(totalRevenue / 100000).toFixed(2)}L`, change: '+12%', color: 'from-indigo-500 to-blue-600' },
                    { label: 'Active Dealers', value: '142', change: '+5%', color: 'from-purple-500 to-pink-600' },
                    { label: 'Pending Orders', value: transactions.filter(t => t.status === 'Pending').length, change: '-2%', color: 'from-orange-500 to-red-600' },
                    { label: 'Avg. Delivery Time', value: '2.4 Days', change: '-10%', color: 'from-emerald-500 to-teal-600' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full group-hover:scale-110 transition-transform`} />
                        <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {stat.change} vs last week
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Trend */}
                <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Revenue Trend</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} prefix="₹" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Product Distribution */}
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Sales Distribution</h3>
                    <div className="h-[300px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={salesDistribution}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {salesDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-white/40 text-sm">Total</p>
                            <p className="text-white font-bold text-xl">₹{(totalRevenue / 1000).toFixed(1)}k</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {salesDistribution.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-sm text-white/70">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                    <button className="text-sm text-indigo-300 hover:text-indigo-200">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-white/70">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="pb-3 font-semibold text-white">Order ID</th>
                                <th className="pb-3 font-semibold text-white">Dealer</th>
                                <th className="pb-3 font-semibold text-white">Product</th>
                                <th className="pb-3 font-semibold text-white">Date</th>
                                <th className="pb-3 font-semibold text-white text-right">Amount</th>
                                <th className="pb-3 font-semibold text-white text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.map((row, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 font-medium text-white">{row.id}</td>
                                    <td className="py-3">{row.dealer}</td>
                                    <td className="py-3">{row.product}</td>
                                    <td className="py-3">{row.date}</td>
                                    <td className="py-3 text-right font-bold text-white">₹{row.amount.toLocaleString()}</td>
                                    <td className="py-3 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                                                row.status === 'Processing' ? 'bg-blue-500/20 text-blue-300' :
                                                    'bg-orange-500/20 text-orange-300'
                                            }`}>
                                            {row.status}
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
