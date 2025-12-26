import { useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from 'recharts';

export default function AdminOverview() {
    const [dealersData] = useState([
        {
            id: 1,
            name: 'Sri Lakshmi Traders',
            location: 'Hyderabad',
            totalAmount: 145600,
            totalProducts: 120,
            status: 'Active',
            deliveries: {
                'NitroBase': 40,
                'PhosphoBase': 30,
                'PotashBase': 50,
                'MicroNutrient Mix': 0,
                'Organic Booster': 0,
                'Growth Enhancer': 0,
            },
        },
        {
            id: 2,
            name: 'Green Valley Farms',
            location: 'Bangalore',
            totalAmount: 98400,
            totalProducts: 85,
            status: 'Active',
            deliveries: {
                'NitroBase': 25,
                'PhosphoBase': 0,
                'PotashBase': 0,
                'MicroNutrient Mix': 35,
                'Organic Booster': 0,
                'Growth Enhancer': 25,
            },
        },
        {
            id: 3,
            name: 'Sunrise Agriculture',
            location: 'Chennai',
            totalAmount: 127800,
            totalProducts: 95,
            status: 'Active',
            deliveries: {
                'NitroBase': 0,
                'PhosphoBase': 45,
                'PotashBase': 30,
                'MicroNutrient Mix': 0,
                'Organic Booster': 20,
                'Growth Enhancer': 0,
            },
        },
        {
            id: 4,
            name: 'Golden Harvest Co.',
            location: 'Pune',
            totalAmount: 156200,
            totalProducts: 110,
            status: 'Active',
            deliveries: {
                'NitroBase': 50,
                'PhosphoBase': 0,
                'PotashBase': 0,
                'MicroNutrient Mix': 50,
                'Organic Booster': 0,
                'Growth Enhancer': 40,
            },
        },
        {
            id: 5,
            name: 'Fresh Fields Ltd.',
            location: 'Mumbai',
            totalAmount: 89500,
            totalProducts: 72,
            status: 'Inactive',
            deliveries: {
                'NitroBase': 0,
                'PhosphoBase': 32,
                'PotashBase': 15,
                'MicroNutrient Mix': 0,
                'Organic Booster': 25,
                'Growth Enhancer': 0,
            },
        },
    ]);

    const products = ['NitroBase', 'PhosphoBase', 'PotashBase', 'MicroNutrient Mix', 'Organic Booster', 'Growth Enhancer'];

    // Calculate totals
    const productTotals = products.map((product) => ({
        name: product,
        value: dealersData.reduce((sum, dealer) => sum + dealer.deliveries[product], 0),
    }));

    const totalRevenue = dealersData.reduce((sum, dealer) => sum + dealer.totalAmount, 0);
    const totalDealers = dealersData.length;
    const activeDealers = dealersData.filter((d) => d.status === 'Active').length;
    const totalProducts = dealersData.reduce((sum, dealer) => sum + dealer.totalProducts, 0);

    // Colors for Pie Chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 p-2 rounded shadow text-gray-900">
                    <p className="text-sm font-bold">{payload[0].name}</p>
                    <p className="text-sm">{payload[0].value} units</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8 max-w-[100vw] overflow-x-hidden">
            {/* Header */}
            <div className="animate-fadeInUp">
                <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-2">
                    Admin Overview
                </h1>
                <p className="text-base md:text-lg text-white/70">Complete overview of all dealers and their product deliveries</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fadeInUp delay-100">
                <div className="glass-card gradient-border rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Total Revenue</p>
                        <p className="text-2xl md:text-4xl font-bold text-white">₹{(totalRevenue / 100000).toFixed(2)}L</p>
                    </div>
                </div>

                <div className="glass-card gradient-border rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Total Dealers</p>
                        <p className="text-2xl md:text-4xl font-bold text-white">{totalDealers}</p>
                    </div>
                </div>

                <div className="glass-card gradient-border rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Active Dealers</p>
                        <p className="text-2xl md:text-4xl font-bold text-white">{activeDealers}</p>
                    </div>
                </div>

                <div className="glass-card gradient-border rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs md:text-sm text-white/60 uppercase tracking-wide">Total Delivered</p>
                        <p className="text-2xl md:text-4xl font-bold text-white">{totalProducts}</p>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp delay-200">
                {/* Pie Chart */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Product Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={productTotals}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {productTotals.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart (kept for variety/trend) */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Sales Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={[
                            { name: 'Mon', value: 4000 },
                            { name: 'Tue', value: 3000 },
                            { name: 'Wed', value: 2000 },
                            { name: 'Thu', value: 2780 },
                            { name: 'Fri', value: 1890 },
                            { name: 'Sat', value: 2390 },
                            { name: 'Sun', value: 3490 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="name" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Plain Table */}
            <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-300">
                <h3 className="text-2xl font-bold text-white mb-6">Delivery Details</h3>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-sm text-white/80">
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="py-3 px-4 font-semibold text-white">Dealer Name</th>
                                <th className="py-3 px-4 font-semibold text-white">Location</th>
                                {products.map(p => (
                                    <th key={p} className="py-3 px-4 font-semibold text-white text-center">{p.split(' ')[0]}</th>
                                ))}
                                <th className="py-3 px-4 font-semibold text-white text-right">Total</th>
                                <th className="py-3 px-4 font-semibold text-white text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {dealersData.map((dealer) => {
                                const totalDelivered = Object.values(dealer.deliveries).reduce((sum, qty) => sum + qty, 0);
                                return (
                                    <tr key={dealer.id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-4 font-medium text-white">{dealer.name}</td>
                                        <td className="py-3 px-4">{dealer.location}</td>
                                        {products.map(p => (
                                            <td key={p} className="py-3 px-4 text-center">
                                                {dealer.deliveries[p] > 0 ? dealer.deliveries[p] : <span className="text-white/20">-</span>}
                                            </td>
                                        ))}
                                        <td className="py-3 px-4 text-right font-bold">{totalDelivered}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${dealer.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                                }`}>
                                                {dealer.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
