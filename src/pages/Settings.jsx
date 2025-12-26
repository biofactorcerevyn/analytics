import { useState } from 'react';

export default function Settings() {
    const [settings, setSettings] = useState({
        dealerName: 'Sri Lakshmi Traders',
        email: 'contact@srilakshmitrade.com',
        phone: '+91 98765 43210',
        address: '123 Market Street, Hyderabad',
        notifications: {
            email: true,
            sms: false,
            push: true,
        },
        theme: 'dark',
    });

    const handleToggle = (category, key) => {
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key],
            },
        }));
    };

    return (
        <div className="min-h-screen p-4 md:p-8 space-y-8">
            {/* Header */}
            <div className="animate-fadeInUp">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                    Settings
                </h1>
                <p className="text-lg text-white/70">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Account Information */}
                    <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-100">
                        <h3 className="text-2xl font-bold text-white mb-6">Account Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">
                                    Dealer Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.dealerName}
                                    onChange={(e) => setSettings({ ...settings, dealerName: e.target.value })}
                                    className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                    className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">
                                    Address
                                </label>
                                <textarea
                                    value={settings.address}
                                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                    rows={3}
                                    className="w-full glass-card px-4 py-3 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                                />
                            </div>

                            <button className="w-full glass-card gradient-border px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-transform">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-200">
                        <h3 className="text-2xl font-bold text-white mb-6">Notification Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                                <div>
                                    <p className="font-semibold text-white">Email Notifications</p>
                                    <p className="text-sm text-white/60">Receive updates via email</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('notifications', 'email')}
                                    className={`relative w-14 h-7 rounded-full transition-colors ${settings.notifications.email ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.notifications.email ? 'translate-x-7' : ''
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                                <div>
                                    <p className="font-semibold text-white">SMS Notifications</p>
                                    <p className="text-sm text-white/60">Receive updates via SMS</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('notifications', 'sms')}
                                    className={`relative w-14 h-7 rounded-full transition-colors ${settings.notifications.sms ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.notifications.sms ? 'translate-x-7' : ''
                                            }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                                <div>
                                    <p className="font-semibold text-white">Push Notifications</p>
                                    <p className="text-sm text-white/60">Receive browser notifications</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('notifications', 'push')}
                                    className={`relative w-14 h-7 rounded-full transition-colors ${settings.notifications.push ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.notifications.push ? 'translate-x-7' : ''
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-300">
                        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full glass-card px-4 py-3 rounded-xl text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                                Change Password
                            </button>

                            <button className="w-full glass-card px-4 py-3 rounded-xl text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Reports
                            </button>

                            <button className="w-full glass-card px-4 py-3 rounded-xl text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Help & Support
                            </button>

                            <button className="w-full glass-card px-4 py-3 rounded-xl text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 animate-fadeInUp delay-400">
                        <h3 className="text-xl font-bold text-white mb-4">Account Stats</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-white/60">Member Since</p>
                                <p className="text-lg font-bold text-white">January 2024</p>
                            </div>
                            <div>
                                <p className="text-sm text-white/60">Total Orders</p>
                                <p className="text-lg font-bold text-white">902</p>
                            </div>
                            <div>
                                <p className="text-sm text-white/60">Account Status</p>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
