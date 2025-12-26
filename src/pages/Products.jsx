import { useState } from 'react';

export default function Products() {
    const [products] = useState([
        {
            id: 1,
            name: 'NitroBase Premium',
            category: 'Fertilizer',
            price: 2499,
            stock: 145,
            status: 'In Stock',
            image: '🌱',
        },
        {
            id: 2,
            name: 'PhosphoBase Pro',
            category: 'Fertilizer',
            price: 2199,
            stock: 89,
            status: 'In Stock',
            image: '🌿',
        },
        {
            id: 3,
            name: 'PotashBase Elite',
            category: 'Fertilizer',
            price: 2799,
            stock: 12,
            status: 'Low Stock',
            image: '🍃',
        },
        {
            id: 4,
            name: 'MicroNutrient Mix',
            category: 'Supplement',
            price: 1599,
            stock: 234,
            status: 'In Stock',
            image: '💧',
        },
        {
            id: 5,
            name: 'Organic Booster',
            category: 'Supplement',
            price: 1899,
            stock: 0,
            status: 'Out of Stock',
            image: '🌾',
        },
        {
            id: 6,
            name: 'Growth Enhancer',
            category: 'Supplement',
            price: 2299,
            stock: 67,
            status: 'In Stock',
            image: '🌻',
        },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return 'from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30';
            case 'Low Stock':
                return 'from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30';
            case 'Out of Stock':
                return 'from-red-500/20 to-rose-500/20 text-red-300 border-red-500/30';
            default:
                return 'from-gray-500/20 to-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="animate-fadeInUp">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    Products
                </h1>
                <p className="text-lg text-white/70">Manage your product inventory</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeInUp delay-100">
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase tracking-wide">Total Products</p>
                    <p className="text-3xl font-bold text-white mt-1">{products.length}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase tracking-wide">In Stock</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">
                        {products.filter((p) => p.status === 'In Stock').length}
                    </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase tracking-wide">Low Stock</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-1">
                        {products.filter((p) => p.status === 'Low Stock').length}
                    </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase tracking-wide">Out of Stock</p>
                    <p className="text-3xl font-bold text-red-400 mt-1">
                        {products.filter((p) => p.status === 'Out of Stock').length}
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="glass-card gradient-border rounded-2xl p-6 hover-glow hover:scale-105 cursor-pointer animate-fadeInUp"
                        style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    >
                        {/* Product Image/Icon */}
                        <div className="w-full h-40 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-6xl mb-4">
                            {product.image}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-xl font-bold text-white">{product.name}</h3>
                                <p className="text-sm text-white/60">{product.category}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white/60">Price</p>
                                    <p className="text-2xl font-bold text-white">₹{product.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-white/60">Stock</p>
                                    <p className="text-2xl font-bold text-white">{product.stock}</p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="pt-3 border-t border-white/10">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(
                                        product.status
                                    )} border`}
                                >
                                    {product.status}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 glass-card px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
                                    Edit
                                </button>
                                <button className="flex-1 glass-card px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
