import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { getBorrowableItems, borrowItem } from '../utils/api';

const BorrowableItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await getBorrowableItems();
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBorrow = async (item) => {
        try {
            const result = await borrowItem(item.id, 'user1');
            if (result.success) {
                setShowSuccess(true);
                setSelectedItem(null);
            }
        } catch (error) {
            console.error('Error borrowing item:', error);
        }
    };

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
                        <ShoppingBag className="text-white" size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-4">
                        Borrowable Items
                    </h1>
                    <p className="text-lg text-gray-600">
                        Items available for temporary borrowing
                    </p>
                </motion.div>

                {/* Items Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading items...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-600">No borrowable items available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        <div className="mb-3 flex items-center gap-2">
                                            <Badge status="borrowable" />
                                            {item.available ? (
                                                <Badge status="active">Available</Badge>
                                            ) : (
                                                <Badge status="overdue">Borrowed</Badge>
                                            )}
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
                                                variant="primary"
                                                icon={ArrowRight}
                                                className="w-full text-sm py-2"
                                                onClick={() => setSelectedItem(item)}
                                                disabled={!item.available}
                                            >
                                                {item.available ? 'Borrow Item' : 'Not Available'}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Borrow Confirmation Modal */}
            <Modal
                isOpen={selectedItem !== null}
                onClose={() => setSelectedItem(null)}
                title="Confirm Borrow"
            >
                {selectedItem && (
                    <div className="py-4">
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to borrow <strong>{selectedItem.name}</strong>?
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedItem(null)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => handleBorrow(selectedItem)}
                                className="flex-1"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Success!"
            >
                <div className="text-center py-4">
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-lg text-gray-600 mb-4">
                        Item borrowed successfully!
                    </p>
                    <p className="text-sm text-gray-500">
                        Please return it within 14 days.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default BorrowableItems;
