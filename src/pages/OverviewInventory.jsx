import { useState } from 'react';

export default function OverviewInventory() {
    const [products] = useState([
        {
            id: 1,
            name: 'NitroBase',
            totalStock: 5000,
            delivered: 3200,
            pending: 1800,
            dealers: ['Sri Lakshmi Traders', 'Golden Harvest Co.', 'Green Valley Farms'],
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 2,
            name: 'PhosphoBase',
            totalStock: 4000,
            delivered: 2800,
            pending: 1200,
            dealers: ['Sunrise Agriculture', 'Fresh Fields Ltd.'],
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 3,
            name: 'PotashBase',
            totalStock: 3500,
            delivered: 3100,
            pending: 400,
            dealers: ['Sri Lakshmi Traders', 'Sunrise Agriculture'],
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 4,
            name: 'MicroNutrient Mix',
            totalStock: 2000,
            delivered: 1500,
            pending: 500,
            dealers: ['Green Valley Farms', 'Golden Harvest Co.'],
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 5,
            name: 'Organic Booster',
            totalStock: 1500,
            delivered: 800,
            pending: 700,
            dealers: ['Sunrise Agriculture', 'Fresh Fields Ltd.'],
            color: 'from-teal-500 to-cyan-500'
        },
        {
            id: 6,
            name: 'Growth Enhancer',
            totalStock: 1000,
            delivered: 950,
            pending: 50,
            dealers: ['Golden Harvest Co.', 'Green Valley Farms'],
            color: 'from-indigo-500 to-violet-500'
        },
    ]);

    return (
        <div className="min-h-screen p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Inventory Overview</h1>
                <p className="text-white/60">Product-centric view of deliveries and stock</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="glass-card rounded-2xl overflow-hidden group hover:bg-white/5 transition-colors">
                        {/* Header */}
                        <div className={`h-32 bg-gradient-to-br ${product.color} p-6 relative`}>
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                                    <p className="text-white/80 text-sm mt-1">ID: #PROD-{product.id}00</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white">
                                    {Math.round((product.delivered / product.totalStock) * 100)}% Del.
                                </div>
                            </div>

                            {/* Mini Stats in Header */}
                            <div className="absolute bottom-4 left-6 right-6 flex justify-between text-white/90 text-sm">
                                <span>Stock: {product.totalStock}</span>
                                <span>Pending: {product.pending}</span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-white/60 mb-2">
                                    <span>Delivery Progress</span>
                                    <span>{product.delivered} / {product.totalStock}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${product.color}`}
                                        style={{ width: `${(product.delivered / product.totalStock) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Active Dealers</h4>
                                <div className="space-y-2">
                                    {product.dealers.map((dealer, i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${product.color} flex items-center justify-center text-xs font-bold text-white`}>
                                                {dealer.charAt(0)}
                                            </div>
                                            <span className="text-sm text-white/80">{dealer}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-semibold transition-colors">
                                View Detailed Report
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
