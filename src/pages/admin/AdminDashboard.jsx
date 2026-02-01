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
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        { label: 'Total Items', value: stats?.totalItems || 0, icon: Package, color: 'from-blue-500 to-blue-600' },
        { label: 'Lost Items', value: stats?.lostItems || 0, icon: AlertTriangle, color: 'from-red-500 to-red-600' },
        { label: 'Pending Claims', value: stats?.pendingClaims || 0, icon: FileCheck, color: 'from-yellow-500 to-yellow-600' },
        { label: 'Overdue Borrows', value: stats?.overdueItems || 0, icon: TrendingUp, color: 'from-purple-500 to-purple-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center shadow-xl">
                            <LayoutDashboard className="text-white" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#2B1B60]">Admin Dashboard</h1>
                            <p className="text-gray-600">Overview of AssetHub system</p>
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
                                <Card hoverable={false} className="relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-8 -mt-8`}></div>
                                    <div className="relative">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                                            <Icon className="text-white" size={24} />
                                        </div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold text-[#2B1B60]">{stat.value}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Items */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold text-[#2B1B60] mb-6">Recent Items</h2>
                        <div className="space-y-4">
                            {recentItems.map((item) => (
                                <Card key={item.id} hoverable={false}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-[#2B1B60] truncate">{item.name}</h3>
                                                <Badge status={item.status} />
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">{item.location}</p>
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
                                    <Card key={claim.id} hoverable={false}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-[#2B1B60] mb-1">{claim.itemName}</h3>
                                                <p className="text-sm text-gray-600 mb-2">Claimed by: {claim.userName}</p>
                                                <Badge status="pending" />
                                            </div>
                                            <FileCheck className="text-[#FFD233]" size={24} />
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
