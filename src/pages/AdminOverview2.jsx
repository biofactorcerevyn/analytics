import { useState } from 'react';
import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

export default function AdminOverview2() {
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
                'MicroNutrient Mix': 20,
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

    // Calculate totals for Radial Bar Chart
    const productTotals = products.map((product, index) => {
        const total = dealersData.reduce((sum, dealer) => sum + dealer.deliveries[product], 0);
        const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];
        return {
            name: product,
            uv: total,
            fill: colors[index]
        };
    });

    return (
        <div className="min-h-screen p-8 space-y-8 bg-[#0f172a]">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Admin Overview V2</h1>
                    <p className="text-white/60">Alternative layout with radial visualization</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white/5 px-4 py-2 rounded-lg text-center">
                        <p className="text-xs text-white/40 uppercase">Total Orders</p>
                        <p className="text-xl font-bold text-white">482</p>
                    </div>
                    <div className="bg-white/5 px-4 py-2 rounded-lg text-center">
                        <p className="text-xs text-white/40 uppercase">Pending</p>
                        <p className="text-xl font-bold text-orange-400">24</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Radial Chart */}
                <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-white mb-4 w-full text-left">Product Distribution</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={productTotals}>
                                <RadialBar
                                    minAngle={15}
                                    label={{ position: 'insideStart', fill: '#fff' }}
                                    background
                                    clockWise
                                    dataKey="uv"
                                />
                                <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: '50%', right: 0, transform: 'translate(0, -50%)', lineHeight: '24px' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none' }} itemStyle={{ color: '#fff' }} />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Compact List */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Dealer Performance</h3>
                    <div className="space-y-4">
                        {dealersData.map((dealer) => {
                            const totalDelivered = Object.values(dealer.deliveries).reduce((sum, qty) => sum + qty, 0);
                            const progress = (totalDelivered / dealer.totalProducts) * 100;

                            return (
                                <div key={dealer.id} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                        {dealer.name.charAt(0)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="font-bold text-white truncate">{dealer.name}</h4>
                                            <span className="text-sm font-semibold text-white">{progress.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" style={{ width: `${progress}%` }} />
                                        </div>
                                        <div className="flex justify-between mt-2 text-xs text-white/50">
                                            <span>{dealer.location}</span>
                                            <span>{totalDelivered} / {dealer.totalProducts} Units</span>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex gap-2">
                                        {products.slice(0, 3).map(p => (
                                            <div key={p} className="text-center px-2">
                                                <p className="text-[10px] text-white/40 mb-1">{p.split(' ')[0]}</p>
                                                <p className="font-bold text-white">{dealer.deliveries[p]}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Table Section */}
            <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Detailed Delivery Log</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-white/70">
                        <thead className="bg-white/5 text-white uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-4 rounded-l-lg">Dealer</th>
                                {products.map(p => <th key={p} className="p-4 text-center">{p.split(' ')[0]}</th>)}
                                <th className="p-4 rounded-r-lg text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {dealersData.map((dealer) => (
                                <tr key={dealer.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium text-white">{dealer.name}</td>
                                    {products.map(p => (
                                        <td key={p} className="p-4 text-center">
                                            {dealer.deliveries[p] > 0 ? (
                                                <span className="inline-block px-2 py-1 bg-white/10 rounded text-white font-bold">
                                                    {dealer.deliveries[p]}
                                                </span>
                                            ) : (
                                                <span className="text-white/20">-</span>
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-4 text-right font-bold text-emerald-400">
                                        {Object.values(dealer.deliveries).reduce((a, b) => a + b, 0)}
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
