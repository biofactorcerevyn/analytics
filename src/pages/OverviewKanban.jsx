import { useState } from 'react';

export default function OverviewKanban() {
    const [columns] = useState([
        {
            id: 'pending',
            title: 'Pending Approval',
            color: 'bg-orange-500',
            items: [
                { id: 1, dealer: 'Fresh Fields Ltd.', items: 3, value: '₹89,500', time: '2h ago' },
                { id: 2, dealer: 'AgriTech Solutions', items: 5, value: '₹45,200', time: '5h ago' },
            ]
        },
        {
            id: 'processing',
            title: 'In Processing',
            color: 'bg-blue-500',
            items: [
                { id: 3, dealer: 'Green Valley Farms', items: 8, value: '₹98,400', time: '1d ago' },
                { id: 4, dealer: 'Golden Harvest Co.', items: 12, value: '₹1,56,200', time: '1d ago' },
                { id: 5, dealer: 'Nature Best', items: 4, value: '₹32,000', time: '2d ago' },
            ]
        },
        {
            id: 'completed',
            title: 'Completed',
            color: 'bg-green-500',
            items: [
                { id: 6, dealer: 'Sri Lakshmi Traders', items: 15, value: '₹1,45,600', time: '3d ago' },
                { id: 7, dealer: 'Sunrise Agriculture', items: 10, value: '₹1,27,800', time: '4d ago' },
            ]
        }
    ]);

    return (
        <div className="min-h-screen p-8 space-y-8 overflow-x-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Order Kanban</h1>
                    <p className="text-white/60">Track order status across stages</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    + New Order
                </button>
            </div>

            <div className="flex gap-6 min-w-[1000px] h-[calc(100vh-200px)]">
                {columns.map((column) => (
                    <div key={column.id} className="flex-1 glass-card rounded-2xl flex flex-col max-h-full">
                        {/* Column Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center sticky top-0 bg-inherit backdrop-blur-xl rounded-t-2xl z-10">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                                <h3 className="font-bold text-white">{column.title}</h3>
                                <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white/60">{column.items.length}</span>
                            </div>
                            <button className="text-white/40 hover:text-white">•••</button>
                        </div>

                        {/* Column Content */}
                        <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar flex-1">
                            {column.items.map((item) => (
                                <div key={item.id} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all hover:-translate-y-1 border border-white/5 hover:border-white/20 group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="bg-white/10 text-white/60 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">
                                            #ORD-{item.id}024
                                        </span>
                                        <span className="text-xs text-white/40">{item.time}</span>
                                    </div>
                                    <h4 className="font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{item.dealer}</h4>
                                    <div className="flex justify-between items-center text-sm mt-4 pt-3 border-t border-white/5">
                                        <span className="text-white/60">{item.items} Items</span>
                                        <span className="font-bold text-white">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-2 border-2 border-dashed border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/30 transition-all text-sm font-semibold">
                                + Add Card
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
