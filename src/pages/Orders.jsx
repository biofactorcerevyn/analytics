import { useState } from 'react';

export default function Orders() {
    const [orders] = useState([
        {
            id: 'ORD-001',
            customer: 'Green Valley Farms',
            date: '2024-11-20',
            total: 45600,
            status: 'Delivered',
            items: 3,
        },
        {
            id: 'ORD-002',
            customer: 'Sunrise Agriculture',
            date: '2024-11-22',
            total: 32400,
            status: 'Shipped',
            items: 2,
        },
        {
            id: 'ORD-003',
            customer: 'Golden Harvest Co.',
            date: '2024-11-23',
            total: 28900,
            status: 'Processing',
            items: 4,
        },
        {
            id: 'ORD-004',
            customer: 'Fresh Fields Ltd.',
            date: '2024-11-24',
            total: 51200,
            status: 'Pending',
            items: 5,
        },
        {
            id: 'ORD-005',
            customer: 'Nature\'s Best',
            date: '2024-11-25',
            total: 19800,
            status: 'Delivered',
            items: 2,
        },
    ]);

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Delivered':
                return {
                    color: 'from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ),
                };
            case 'Shipped':
                return {
                    color: 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    ),
                };
            case 'Processing':
                return {
                    color: 'from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30',
                    icon: (
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    ),
                };
            case 'Pending':
                return {
                    color: 'from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                };
            default:
                return {
                    color: 'from-gray-500/20 to-gray-500/20 text-gray-300 border-gray-500/30',
                    icon: null,
                };
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="animate-fadeInUp">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    Orders
                </h1>
                <p className="text-lg text-white/70">Track and manage your orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeInUp delay-100">
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase">Total Orders</p>
                    <p className="text-3xl font-bold text-white mt-1">{orders.length}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase">Delivered</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">
                        {orders.filter((o) => o.status === 'Delivered').length}
                    </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase">In Transit</p>
                    <p className="text-3xl font-bold text-blue-400 mt-1">
                        {orders.filter((o) => o.status === 'Shipped').length}
                    </p>
                </div>
                <div className="glass-card rounded-xl p-4">
                    <p className="text-sm text-white/60 uppercase">Pending</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-1">
                        {orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length}
                    </p>
                </div>
            </div>

            {/* Orders List */}
            <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-200">
                <h3 className="text-2xl font-bold text-white mb-6">Recent Orders</h3>
                <div className="space-y-4">
                    {orders.map((order, index) => {
                        const statusConfig = getStatusConfig(order.status);
                        return (
                            <div
                                key={order.id}
                                className="glass-card rounded-xl p-5 hover:bg-white/10 transition-all cursor-pointer group"
                                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                                                {order.id}
                                            </h4>
                                            <span
                                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${statusConfig.color} border`}
                                            >
                                                {statusConfig.icon}
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-white/70">{order.customer}</p>
                                        <p className="text-sm text-white/50 mt-1">{order.items} items • {order.date}</p>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-white/60">Total Amount</p>
                                            <p className="text-2xl font-bold text-white">₹{order.total.toLocaleString()}</p>
                                        </div>
                                        <button className="glass-card px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
