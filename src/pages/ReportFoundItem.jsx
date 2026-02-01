import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import Input from '../components/Input';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { reportFoundItem } from '../utils/api';

const ReportFoundItem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: '',
        date: '',
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await reportFoundItem(formData);
            setShowSuccess(true);
            setTimeout(() => {
                navigate('/my-items');
            }, 2000);
        } catch (error) {
            console.error('Error reporting item:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFD233]/20 via-white to-white py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#FFD233] to-[#ffc700] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Search className="text-[#2B1B60]" size={40} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B60] mb-4">
                            Report Found Item
                        </h1>
                        <p className="text-lg text-gray-600">
                            Help reunite this item with its owner
                        </p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border-2 border-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Item Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., iPhone 15 Pro"
                                required
                            />

                            <Input
                                label="Description"
                                name="description"
                                type="textarea"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Provide detailed description of the item..."
                                rows={4}
                                required
                            />

                            <Input
                                label="Location Found"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Cafeteria"
                                required
                            />

                            <Input
                                label="Date Found"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                            <FileUpload
                                label="Upload Image (Optional)"
                                name="image"
                                onChange={handleChange}
                            />

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    icon={ArrowRight}
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? 'Submitting...' : 'Submit Report'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                title="Success!"
            >
                <div className="text-center py-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <p className="text-lg text-gray-600 mb-4">
                        Thank you for reporting this found item!
                    </p>
                    <p className="text-sm text-gray-500">
                        The owner will be notified if they've reported it missing.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default ReportFoundItem;
