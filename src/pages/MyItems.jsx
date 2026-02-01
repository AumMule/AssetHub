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
                        <h3 className="text-lg font-bold text-[#2B1B60]">
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
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading your items...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <User className="text-white" size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-4">
                        My Items
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
                        <AlertCircle className="text-[#7C5DFA]" size={28} />
                        <h2 className="text-2xl font-bold text-[#2B1B60]">My Lost Items</h2>
                        <span className="px-3 py-1 bg-[#7C5DFA] text-white rounded-full text-sm font-semibold">
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
                        <Package className="text-[#FFD233]" size={28} />
                        <h2 className="text-2xl font-bold text-[#2B1B60]">My Found Items</h2>
                        <span className="px-3 py-1 bg-[#FFD233] text-[#2B1B60] rounded-full text-sm font-semibold">
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
                        <ShoppingBag className="text-[#7C5DFA]" size={28} />
                        <h2 className="text-2xl font-bold text-[#2B1B60]">My Borrowed Items</h2>
                        <span className="px-3 py-1 bg-[#7C5DFA] text-white rounded-full text-sm font-semibold">
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
