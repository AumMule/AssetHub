import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, ShoppingBag, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { getMyItems } from '../utils/api';

const MyItems = () => {
    const [myItems, setMyItems] = useState({ lost: [], found: [], borrowed: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMyItems();
    }, []);

    const loadMyItems = async () => {
        setLoading(true);
        try {
            const data = await getMyItems('user1');
            setMyItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const ItemCard = ({ item, type }) => (
        <Card hoverable={false} className="mb-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                        src={item.image || item.itemImage}
                        alt={item.name || item.itemName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                            {item.name || item.itemName}
                        </h3>
                        <Badge status={item.status} />
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                        {item.description || `Borrowed on ${item.borrowDate}`}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>📍 {item.location}</span>
                        <span>📅 {item.date || item.borrowDate}</span>
                        {item.dueDate && (
                            <span className={item.status === 'overdue' ? 'text-red-500 font-semibold' : ''}>
                                Due: {item.dueDate}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 text-sm">Synchronizing your assets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <User className="text-indigo-600" size={24} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        My Asset Dashboard
                    </h1>
                    <p className="text-lg text-gray-600">
                        Manage your lost, found, and borrowed items
                    </p>
                </motion.div>

                {/* My Lost Items */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <AlertCircle className="text-rose-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Reported Lost</h2>
                        <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg text-xs font-bold">
                            {myItems.lost.length}
                        </span>
                    </div>

                    {myItems.lost.length === 0 ? (
                        <Card hoverable={false} className="text-center py-8">
                            <p className="text-gray-500">No lost items reported</p>
                        </Card>
                    ) : (
                        <div>
                            {myItems.lost.map(item => (
                                <ItemCard key={item.id} item={item} type="lost" />
                            ))}
                        </div>
                    )}
                </motion.section>

                {/* My Found Items */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Package className="text-emerald-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Reported Found</h2>
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold">
                            {myItems.found.length}
                        </span>
                    </div>

                    {myItems.found.length === 0 ? (
                        <Card hoverable={false} className="text-center py-8">
                            <p className="text-gray-500">No found items reported</p>
                        </Card>
                    ) : (
                        <div>
                            {myItems.found.map(item => (
                                <ItemCard key={item.id} item={item} type="found" />
                            ))}
                        </div>
                    )}
                </motion.section>

                {/* My Borrowed Items */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <ShoppingBag className="text-indigo-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-tight">Active Borrows</h2>
                        <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-bold">
                            {myItems.borrowed.length}
                        </span>
                    </div>

                    {myItems.borrowed.length === 0 ? (
                        <Card hoverable={false} className="text-center py-8">
                            <p className="text-gray-500">No borrowed items</p>
                        </Card>
                    ) : (
                        <div>
                            {myItems.borrowed.map(item => (
                                <ItemCard key={item.id} item={item} type="borrowed" />
                            ))}
                        </div>
                    )}
                </motion.section>
            </div>
        </div>
    );
};

export default MyItems;
