import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Eye } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { getItems } from '../utils/api';

const WarehouseItems = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadItems();
    }, [filter]);

    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await getItems(filter);
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const filters = [
        { value: 'all', label: 'All Items' },
        { value: 'lost', label: 'Lost' },
        { value: 'found', label: 'Found' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'borrowable', label: 'Borrowable' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="w-20 h-20 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <Package className="text-white" size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-4">
                        Warehouse Items
                    </h1>
                    <p className="text-lg text-gray-600">
                        Browse all items in our system
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {filters.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${filter === f.value
                                ? 'bg-[#7C5DFA] text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </motion.div>

                {/* Items Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading items...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">No items found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="h-full flex flex-col">
                                    {/* Image */}
                                    <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="mb-3">
                                            <Badge status={item.status} />
                                        </div>

                                        <h3 className="text-lg font-bold text-[#2B1B60] mb-2">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <p className="text-xs text-gray-500 mb-4">
                                            📍 {item.location}
                                        </p>

                                        <div className="mt-auto">
                                            <Button
                                                variant="outline"
                                                icon={Eye}
                                                className="w-full text-sm py-2"
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WarehouseItems;
