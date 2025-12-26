import { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

export default function TVDisplay() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeSlide, setActiveSlide] = useState(0);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-rotate slides every 8 seconds
    useEffect(() => {
        const slideTimer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % 3);
        }, 8000);
        return () => clearInterval(slideTimer);
    }, []);

    const productsData = [
        {
            name: 'NitroBase Premium',
            totalPurchases: 155,
            demand: 'High',
            demandPercent: 92,
            buyers: 45,
            revenue: 386100,
            trend: '+15%',
            color: '#667eea',
        },
        {
            name: 'PhosphoBase Pro',
            totalPurchases: 107,
            demand: 'High',
            demandPercent: 85,
            buyers: 38,
            revenue: 235273,
            trend: '+12%',
            color: '#4facfe',
        },
        {
            name: 'PotashBase Elite',
            totalPurchases: 145,
            demand: 'Very High',
            demandPercent: 98,
            buyers: 52,
            revenue: 405855,
            trend: '+22%',
            color: '#f093fb',
        },
        {
            name: 'MicroNutrient Mix',
            totalPurchases: 89,
            demand: 'Medium',
            demandPercent: 68,
            buyers: 28,
            revenue: 142311,
            trend: '+8%',
            color: '#feca57',
        },
        {
            name: 'Organic Booster',
            totalPurchases: 72,
            demand: 'Medium',
            demandPercent: 65,
            buyers: 22,
            revenue: 136728,
            trend: '+5%',
            color: '#48dbfb',
        },
        {
            name: 'Growth Enhancer',
            totalPurchases: 115,
            demand: 'High',
            demandPercent: 88,
            buyers: 41,
            revenue: 264485,
            trend: '+18%',
            color: '#ff6b6b',
        },
    ];

    const chartData = productsData.map((p) => ({
        name: p.name.split(' ')[0],
        purchases: p.totalPurchases,
        buyers: p.buyers,
    }));

    const demandData = productsData.map((p) => ({
        name: p.name.split(' ')[0],
        value: p.demandPercent,
    }));

    const COLORS = ['#667eea', '#4facfe', '#f093fb', '#feca57', '#48dbfb', '#ff6b6b'];

    const getDemandColor = (demand) => {
        switch (demand) {
            case 'Very High':
                return 'from-green-500 to-emerald-600';
            case 'High':
                return 'from-blue-500 to-cyan-600';
            case 'Medium':
                return 'from-yellow-500 to-orange-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getDemandIcon = (demand) => {
        if (demand === 'Very High' || demand === 'High') {
            return '🔥';
        }
        return '📊';
    };

    const totalPurchases = productsData.reduce((sum, p) => sum + p.totalPurchases, 0);
    const totalBuyers = productsData.reduce((sum, p) => sum + p.buyers, 0);
    const totalRevenue = productsData.reduce((sum, p) => sum + p.revenue, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 overflow-hidden">
            {/* Header */}
            <div className="mb-8 animate-fadeInUp">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-7xl font-bold gradient-text mb-2">
                            🌱 Biofactor Products
                        </h1>
                        <p className="text-3xl text-white/80">Live Product Performance Dashboard</p>
                    </div>
                    <div className="text-right">
                        <p className="text-5xl font-bold text-white">
                            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-2xl text-white/70">
                            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-3 gap-8 mb-8 animate-fadeInUp delay-100">
                <div className="glass-card rounded-3xl p-8 text-center transform hover:scale-105 transition-transform">
                    <div className="text-8xl mb-4">📦</div>
                    <p className="text-3xl text-white/70 mb-2">Total Purchases</p>
                    <p className="text-7xl font-bold text-white animate-pulse-glow">{totalPurchases}</p>
                    <p className="text-2xl text-green-400 mt-2">+14% This Month</p>
                </div>

                <div className="glass-card rounded-3xl p-8 text-center transform hover:scale-105 transition-transform">
                    <div className="text-8xl mb-4">👥</div>
                    <p className="text-3xl text-white/70 mb-2">Active Buyers</p>
                    <p className="text-7xl font-bold text-white animate-pulse-glow">{totalBuyers}</p>
                    <p className="text-2xl text-blue-400 mt-2">Across All Products</p>
                </div>

                <div className="glass-card rounded-3xl p-8 text-center transform hover:scale-105 transition-transform">
                    <div className="text-8xl mb-4">💰</div>
                    <p className="text-3xl text-white/70 mb-2">Total Revenue</p>
                    <p className="text-7xl font-bold text-white animate-pulse-glow">
                        ₹{(totalRevenue / 100000).toFixed(1)}L
                    </p>
                    <p className="text-2xl text-purple-400 mt-2">This Quarter</p>
                </div>
            </div>

            {/* Rotating Content */}
            <div className="relative h-[600px]">
                {/* Slide 1: Product Cards */}
                {activeSlide === 0 && (
                    <div className="absolute inset-0 grid grid-cols-3 gap-6 animate-fadeInUp">
                        {productsData.map((product, index) => (
                            <div
                                key={product.name}
                                className="glass-card gradient-border rounded-2xl p-6 transform hover:scale-105 transition-all"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{getDemandIcon(product.demand)}</div>
                                    <div
                                        className={`px-4 py-2 rounded-full text-xl font-bold text-white bg-gradient-to-r ${getDemandColor(
                                            product.demand
                                        )}`}
                                    >
                                        {product.demand}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4">{product.name}</h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl text-white/70">Purchases</span>
                                        <span className="text-3xl font-bold text-white">{product.totalPurchases}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-xl text-white/70">Buyers</span>
                                        <span className="text-3xl font-bold text-white">{product.buyers}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-xl text-white/70">Revenue</span>
                                        <span className="text-3xl font-bold text-white">₹{(product.revenue / 1000).toFixed(0)}K</span>
                                    </div>

                                    <div className="pt-3 border-t border-white/20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl text-white/70">Trend</span>
                                            <span className="text-3xl font-bold text-green-400">{product.trend}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Demand Bar */}
                                <div className="mt-4">
                                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${product.demandPercent}%` }}
                                        />
                                    </div>
                                    <p className="text-right text-lg text-white/60 mt-1">{product.demandPercent}% Demand</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Slide 2: Charts */}
                {activeSlide === 1 && (
                    <div className="absolute inset-0 grid grid-cols-2 gap-8 animate-fadeInUp">
                        <div className="glass-card rounded-3xl p-8">
                            <h3 className="text-4xl font-bold text-white mb-6">📊 Purchases & Buyers</h3>
                            <ResponsiveContainer width="100%" height={450}>
                                <BarChart data={chartData}>
                                    <defs>
                                        <linearGradient id="purchasesGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#667eea" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#764ba2" stopOpacity={0.8} />
                                        </linearGradient>
                                        <linearGradient id="buyersGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#00f2fe" stopOpacity={0.8} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#fff" style={{ fontSize: '18px', fontWeight: 'bold' }} />
                                    <YAxis stroke="#fff" style={{ fontSize: '18px', fontWeight: 'bold' }} />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                        }}
                                    />
                                    <Bar dataKey="purchases" fill="url(#purchasesGradient)" radius={[12, 12, 0, 0]} />
                                    <Bar dataKey="buyers" fill="url(#buyersGradient)" radius={[12, 12, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="glass-card rounded-3xl p-8">
                            <h3 className="text-4xl font-bold text-white mb-6">🔥 Demand Distribution</h3>
                            <ResponsiveContainer width="100%" height={450}>
                                <PieChart>
                                    <Pie
                                        data={demandData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        label={({ name, value }) => `${name} ${value}%`}
                                        labelStyle={{ fontSize: '18px', fontWeight: 'bold', fill: '#fff' }}
                                    >
                                        {demandData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#fff" strokeWidth={3} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '16px',
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Slide 3: Top Products */}
                {activeSlide === 2 && (
                    <div className="absolute inset-0 animate-fadeInUp">
                        <div className="glass-card rounded-3xl p-12 h-full">
                            <h3 className="text-5xl font-bold text-white mb-8 text-center">🏆 Top Performing Products</h3>
                            <div className="space-y-6">
                                {productsData
                                    .sort((a, b) => b.totalPurchases - a.totalPurchases)
                                    .slice(0, 5)
                                    .map((product, index) => (
                                        <div
                                            key={product.name}
                                            className="glass-card rounded-2xl p-6 flex items-center justify-between transform hover:scale-105 transition-all"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="text-6xl font-bold text-white/30">#{index + 1}</div>
                                                <div className="text-5xl">{getDemandIcon(product.demand)}</div>
                                                <div>
                                                    <h4 className="text-4xl font-bold text-white">{product.name}</h4>
                                                    <p className="text-2xl text-white/60">{product.buyers} Buyers • {product.demand} Demand</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-5xl font-bold text-white">{product.totalPurchases}</p>
                                                <p className="text-2xl text-white/60">Purchases</p>
                                                <p className="text-3xl font-bold text-green-400 mt-2">{product.trend}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-4 mt-8">
                {[0, 1, 2].map((index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-4 h-4 rounded-full transition-all ${activeSlide === index ? 'bg-white w-12' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-3xl text-white/60">
                    🌟 Choose Quality. Choose Biofactor. 🌟
                </p>
            </div>
        </div>
    );
}
