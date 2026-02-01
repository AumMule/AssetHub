import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import { getBorrowRecords } from '../../utils/api';

const BorrowRecords = () => {
    const [records, setRecords] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecords();
    }, [filter]);

    const loadRecords = async () => {
        setLoading(true);
        try {
            const data = await getBorrowRecords(filter);
            setRecords(data);
        } catch (error) {
            console.error('Error loading records:', error);
        } finally {
            setLoading(false);
        }
    };

    const filters = [
        { value: 'all', label: 'All Records' },
        { value: 'active', label: 'Active' },
        { value: 'overdue', label: 'Overdue' },
        { value: 'returned', label: 'Returned' }
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
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#7C5DFA] to-[#6a4de0] rounded-3xl flex items-center justify-center shadow-xl">
                            <ShoppingBag className="text-white" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-[#2B1B60]">Borrow Records</h1>
                            <p className="text-gray-600">Track all borrowed items and overdue returns</p>
                        </div>
                    </div>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-3 mb-8"
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

                {/* Records Table */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#7C5DFA] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading records...</p>
                    </div>
                ) : records.length === 0 ? (
                    <Card hoverable={false} className="text-center py-20">
                        <p className="text-xl text-gray-600">No borrow records found</p>
                    </Card>
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
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Borrower</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Borrow Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Due Date</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#2B1B60]">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {records.map((record) => (
                                            <tr
                                                key={record.id}
                                                className={`hover:bg-gray-50 transition-colors ${record.status === 'overdue' ? 'bg-red-50' : ''
                                                    }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <span className="font-medium text-[#2B1B60]">{record.itemName}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {record.userName}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {record.borrowDate}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    <span className={record.status === 'overdue' ? 'text-red-600 font-semibold' : ''}>
                                                        {record.dueDate}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge status={record.status} />
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
        </div>
    );
};

export default BorrowRecords;
