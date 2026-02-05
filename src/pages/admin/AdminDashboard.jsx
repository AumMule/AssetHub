import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, FileCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { getStats, getItems, getClaims } from '../../utils/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentItems, setRecentItems] = useState([]);
    const [pendingClaims, setPendingClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [statsData, itemsData, claimsData] = await Promise.all([
                getStats(),
                getItems('all'),
                getClaims('pending')
            ]);
            setStats(statsData);
            setRecentItems(itemsData.slice(0, 5));
            setPendingClaims(claimsData);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 text-sm">Accessing admin systems...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Assets', value: stats?.totalItems || 0, icon: Package, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
        { label: 'Lost Reports', value: stats?.lostItems || 0, icon: AlertTriangle, color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100' },
        { label: 'Pending Claims', value: stats?.pendingClaims || 0, icon: FileCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
        { label: 'Overdue Cycles', value: stats?.overdueItems || 0, icon: TrendingUp, color: 'text-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-100' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                            <LayoutDashboard className="text-indigo-600" size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
                            <p className="text-sm text-gray-600">Real-time metrics for AssetHub system</p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card hoverable={false} className={`border ${stat.borderColor} ${stat.bgColor}/50`}>
                                    <div className="relative">
                                        <div className={`w-10 h-10 ${stat.bgColor} border ${stat.borderColor} rounded-lg flex items-center justify-center mb-4`}>
                                            <Icon className={stat.color} size={20} />
                                        </div>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Items */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-tight">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentItems.map((item) => (
                                <Card key={item.id} hoverable={false}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900 truncate text-sm">{item.name}</h3>
                                                <Badge status={item.status} className="scale-75 origin-left" />
                                            </div>
                                            <p className="text-xs text-gray-500 truncate lowercase tracking-tight">📍 {item.location}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pending Claims */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold text-[#2B1B60] mb-6">Pending Claims</h2>
                        <div className="space-y-4">
                            {pendingClaims.length === 0 ? (
                                <Card hoverable={false} className="text-center py-8">
                                    <p className="text-gray-500">No pending claims</p>
                                </Card>
                            ) : (
                                pendingClaims.map((claim) => (
                                    <Card key={claim.id} hoverable={true}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900 mb-1 text-sm">{claim.itemName}</h3>
                                                <p className="text-xs text-gray-600 mb-2">Claimant: {claim.userName}</p>
                                                <Badge status="pending" className="scale-75 origin-left" />
                                            </div>
                                            <FileCheck className="text-amber-500" size={20} />
                                        </div>
                                    </Card>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
