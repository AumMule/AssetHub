import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { getItems, addWarehouseItem, deleteWarehouseItem } from '../../utils/api';

const ManageWarehouse = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await getItems('warehouse');
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (selectedItem) {
            await deleteWarehouseItem(selectedItem.id);
            setShowDeleteModal(false);
            setSelectedItem(null);
            loadItems();
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center shadow-xl">
                                <Package className="text-white" size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-[#2B1B60]">Manage Warehouse</h1>
                                <p className="text-gray-600">Add, edit, or remove warehouse items</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            icon={Plus}
                            onClick={() => setShowAddModal(true)}
                        >
                            Add Item
                        </Button>
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Input
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </motion.div>

                {/* Items Table */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading items...</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card hoverable={false} className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Item</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Location</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Status</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="font-medium text-[#2B1B60]">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                                    {item.description}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {item.location}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge status={item.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedItem(item);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </div>

            {/* Add Item Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add Warehouse Item"
            >
                <div className="py-4">
                    <p className="text-gray-600 mb-4">Add item form would go here</p>
                    <Button variant="primary" onClick={() => setShowAddModal(false)} className="w-full">
                        Add Item
                    </Button>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Item"
            >
                <div className="py-4">
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete <strong>{selectedItem?.name}</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleDelete}
                            className="flex-1 bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageWarehouse;
